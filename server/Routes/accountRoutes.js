const express = require("express")
const { auth } = require("../Middleware/auth")
const { createAccount, approveAccount, getAll, specificAcc } = require("../Controllers/accountController")
const accountRouter = express.Router()


accountRouter.post("/Create", auth, createAccount)

accountRouter.get("/getAll", getAll)

accountRouter.patch("/:accountId", approveAccount)

accountRouter.get("/getByUserId", specificAcc)

module.exports = accountRouter