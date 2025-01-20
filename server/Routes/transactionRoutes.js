
const express = require("express")
const { deposit, withdraw, transfer, getTransactionsForAccount, getTransactionSummary, allTransaction } = require("../Controllers/transactionController")
const TransactionRouter = express.Router()

TransactionRouter.post('/deposit', deposit)
TransactionRouter.post('/withdraw', withdraw)
TransactionRouter.post("/transfer", transfer)
TransactionRouter.get("/getTransactionsForAccount", getTransactionsForAccount)
TransactionRouter.get("/getTransactionSummary", getTransactionSummary)

TransactionRouter.get("/allTransaction", allTransaction)

module.exports = TransactionRouter