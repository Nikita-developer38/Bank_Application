const Account = require("../Models/accountSchema");
const { sendNotificationToAdmin } = require("./adminController");

exports.createAccount = async (req, res) => {
    // console.log(req.user)
    const userId = req.user.userId;
    const { setPin } = req.body

    try {
        const account = await Account.create({ userId, setPin, balance: 0 });

        // Notify admin
        await sendNotificationToAdmin(`New account request by User ID: ${userId}`);

        res.status(201).json({
            message: 'Account created successfully. Awaiting admin approval.',
            account,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating account', error });
    }
};

exports.approveAccount = async (req, res) => {
    const { accountId } = req.params;

    try {
        const account = await Account.findByIdAndUpdate(
            accountId,
            { approvedByAdmin: true },
            { new: true }
        );

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Optionally notify the user about approval
        res.status(200).json({ message: 'Account approved successfully.', account });
    } catch (error) {
        res.status(500).json({ message: 'Error approving account', error });
    }
};

exports.getAll = async (req, res) => {
    try {

        const account = await Account.find()
        res.status(200).json({ message: 'Accounts', account });

    } catch (error) {
        res.status(500).json({ message: 'Error approving account', error });
    }
}

// Backend Route: Express.js Example
exports.specificAcc = async (req, res) => {
    const { userId } = req.query; // Accept userId as a query parameter

    try {
        const account = await Account.findOne({ userId }).populate('userId'); // Query database for the user's account
        if (account) {
            res.json(account); // Send the account data
        } else {
            res.status(404).json({ message: "Account not found for this user ID" });
        }
    } catch (error) {
        console.error("Error fetching account:", error);
        res.status(500).json({ message: "Server error" });
    }
};
