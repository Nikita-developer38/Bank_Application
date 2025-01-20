const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        requires: true
    },
    password: {
        type: String,
        requires: true
    },
    phone: {
        type: Number,
        requires: true
    },
    address: {
        type: String,
        requires: true
    },
    bank_name: {
        type: String,
        requires: true
    },
    IFSC_code: {
        type: String,
        requires: true
    },
    notifications: [{
        message: { type: String }
    }]


})

const Admin = mongoose.model("admin", adminSchema)

module.exports = Admin