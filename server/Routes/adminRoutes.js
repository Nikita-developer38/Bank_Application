const express = require("express")
const { Admin, otp, login, getAdmin, logOutAdmin } = require("../Controllers/adminController")

const { auth } = require("../Middleware/auth")

const adminRouter = express.Router()

adminRouter.post("/Admin-Register", Admin)

adminRouter.post("/Admin-otp", otp)
adminRouter.post("/Admin-Login", login)
adminRouter.post("/admin_Logout", logOutAdmin)

adminRouter.get("/getAll", auth, getAdmin)

module.exports = adminRouter