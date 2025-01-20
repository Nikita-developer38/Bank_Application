const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/profile-default-avatar-icon-user-600nw-2463844171.jpg",
    }


})

const User = mongoose.model("user", userSchema)

module.exports = User