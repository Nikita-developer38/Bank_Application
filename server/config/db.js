const mongoose = require("mongoose")

const MongoDB_URL = process.env.MongoDB_URL
const connect = () => {
    mongoose.connect(MongoDB_URL).then(() => {
        console.log("Database has been connected")
    }).catch((error) => {
        console.log(error)
    })
}

module.exports = connect