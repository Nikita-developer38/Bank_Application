const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    accountNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account"
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["deposit", "withdraw", "transfer"]
    },
    transaction_Date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    transferTo: {
        type: String,
        required: function () {
            return this.type === "transfer"
        }
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction