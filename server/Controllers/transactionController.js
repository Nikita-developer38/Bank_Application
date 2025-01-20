const Account = require("../Models/accountSchema");
const Transaction = require("../Models/transactionSchema");
const mongoose = require("mongoose");


exports.deposit = async (req, res) => {
    const { accountNumber, amount, setPin } = req.body;

    if (amount <= 0) return res.status(400).json({ error: 'Amount must be greater than zero' });

    try {
        const account = await Account.findOne({ _id: accountNumber });
        if (!account) { return res.status(400).json({ error: 'Account not found' }) };

        if (!account.approvedByAdmin) return res.status(403).json({ error: 'Account is not approved by admin' });

        if (account.setPin !== setPin) {
            return res.status(400).json({ error: 'Invalid PIN' });
        }


        const depositAmount = Number(amount); // Ensure amount is treated as a number

        // Correct way to update balance: Add the deposit amount to the current balance
        account.balance += depositAmount; // Increase the balance by the deposit amount

        // Save the updated account
        await account.save();


        const transaction = new Transaction({ accountNumber, type: 'deposit', amount: depositAmount });
        await transaction.save();

        res.status(200).json({ message: 'Deposit successful', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.withdraw = async (req, res) => {
    const { accountNumber, amount, setPin } = req.body;

    if (amount <= 0) return res.status(400).json({ error: 'Amount must be greater than zero' });

    try {
        const account = await Account.findOne({ _id: accountNumber });
        if (!account) return res.status(404).json({ error: 'Account not found' });


        if (!account.approvedByAdmin) return res.status(403).json({ error: 'Account is not approved by admin' });



        if (account.setPin !== setPin) {
            return res.status(400).json({ error: "Invalid Pin" })
        }
        if (account.balance < amount) return res.status(400).json({ error: 'Insufficient funds' });

        account.balance -= amount;
        await account.save();

        const transaction = new Transaction({ accountNumber, type: 'withdraw', amount });
        await transaction.save();

        res.status(200).json({ message: 'Withdrawal successful', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.transfer = async (req, res) => {
    const { fromAccountNumber, toAccountNumber, amount, setPin } = req.body;


    if (amount <= 0) {
        return res.status(400).json({ error: "Amount must be greater than zero" });
    }

    try {
        const fromAccount = await Account.findOne({ _id: fromAccountNumber });
        const toAccount = await Account.findOne({ _id: toAccountNumber });

        if (!fromAccount) {
            return res.status(404).json({ error: "from  accounts not found" });
        }
        if (!toAccount) {
            return res.status(404).json({ error: "to accounts not found" });
        }


        if (!fromAccount.approvedByAdmin) {
            return res.status(403).json({ error: "Sender account is not approved by admin" });
        }
        if (!toAccount.approvedByAdmin) {
            return res.status(403).json({ error: "Recipient account is not approved by admin" });
        }


        if (fromAccount.setPin !== setPin) {
            return res.status(400).json({ error: "Invalid pin" })
        }

        if (fromAccount.balance < amount) {
            return res.status(400).json({ error: "Insufficient Balance" });
        }


        fromAccount.balance -= amount;
        toAccount.balance += amount;


        await fromAccount.save();
        await toAccount.save();


        const transaction = new Transaction({
            accountNumber: fromAccount._id,
            amount: amount,
            type: "transfer",
            description: `Transferred to account ${toAccountNumber}`,
            transferTo: toAccountNumber,
        });

        await transaction.save();

        res.status(200).json({ message: "Transfer successful", transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




exports.getTransactionsForAccount = async (req, res) => {
    const { accountId } = req.query;

    if (!accountId) {
        return res.status(400).json({ message: "Account ID is required" });
    }

    try {
        const transactions = await Transaction.find({ accountNumber: accountId }).sort({ transaction_Date: -1 });
        res.json({ transactions });
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ message: "Server error" });
    }
};




exports.getTransactionSummary = async (req, res) => {
    const { accountId } = req.query; // Get accountId from query params

    if (!accountId) {
        return res.status(400).json({ message: "Account ID is required" });
    }

    try {
        // Ensure the accountId is an ObjectId
        const accountIdObjectId = new mongoose.Types.ObjectId(accountId);

        // Calculate total money in (deposit + received transfers)
        const moneyIn = await Transaction.aggregate([
            {
                $match: { accountNumber: accountIdObjectId }
            },
            {
                $group: {
                    _id: "$accountNumber",
                    moneyIn: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "deposit"] },
                                "$amount",  // For deposits, add amount
                                0
                            ]
                        }
                    },
                    receivedTransfers: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "transfer"] },
                                { $cond: [{ $eq: ["$transferTo", accountId] }, "$amount", 0] },
                                0
                            ]
                        }
                    }
                }
            }
        ]);

        // Calculate total money out (withdrawal + sent transfers)
        // Calculate total money out (withdrawal + sent transfers)
        const moneyOut = await Transaction.aggregate([
            {
                $match: { accountNumber: accountIdObjectId }
            },
            {
                $group: {
                    _id: "$accountNumber",
                    moneyOut: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "withdraw"] },
                                "$amount", // For withdrawals, subtract amount
                                0
                            ]
                        }
                    },
                    sentTransfers: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "transfer"] },
                                { $cond: [{ $eq: ["$accountNumber", accountId] }, 0, "$amount"] },
                                0
                            ]
                        }
                    }
                }
            }
        ]);

        const moneyInTransactions = await Transaction.countDocuments({
            accountNumber: accountIdObjectId,
            $or: [{ type: "deposit" }, { type: "transfer", transferTo: accountId }]
        });

        // Count the total number of money out transactions
        const moneyOutTransactions = await Transaction.countDocuments({
            accountNumber: accountIdObjectId,
            $or: [{ type: "withdraw" }, { type: "transfer", accountNumber: accountId }]
        });

        // Safely check for aggregation results and calculate totals
        const totalMoneyIn = (moneyIn && moneyIn[0]) ? moneyIn[0].moneyIn + moneyIn[0].receivedTransfers : 0;
        const totalMoneyOut = (moneyOut && moneyOut[0]) ? moneyOut[0].moneyOut + moneyOut[0].sentTransfers : 0;

        // Return the result
        res.json({
            totalMoneyIn,
            totalMoneyOut,
            moneyInTransactions,
            moneyOutTransactions

        });


    } catch (err) {
        console.error("Error fetching transaction summary:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.allTransaction = async (req, res) => {
    try {

        const transaction = await Transaction.find()
        res.status(200).json(transaction)

    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }
}