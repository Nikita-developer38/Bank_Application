const express = require("express")
const { userRegistration, otp, login, AllUser, logOut } = require("../Controllers/userControllers")
const { validateRegistration } = require("../Middleware/userMiddleware")

const userRouter = express.Router()

userRouter.post("/Registration", validateRegistration, userRegistration)

userRouter.post("/send-otp", otp)

userRouter.post("/Login", login)

userRouter.post('/logout', logOut)


userRouter.get("/allUser", AllUser)

module.exports = userRouter