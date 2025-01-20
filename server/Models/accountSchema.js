const mongoose = require("mongoose")

const accountSchema = ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    accountType: {
        type: String,

        default: "Saving"
    },
    balance: {
        type: Number,
        default: 0
    },
    approvedByAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    setPin: {
        type: Number,
        required: true
    }
})


const Account = mongoose.model("account", accountSchema)

module.exports = Account