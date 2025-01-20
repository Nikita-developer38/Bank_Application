const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connect = require("./config/db");
const userRouter = require("./Routes/userRoutes");
const adminRouter = require("./Routes/adminRoutes");
const accountRouter = require("./Routes/accountRoutes");
const TransactionRouter = require("./Routes/transactionRoutes");

const app = express()
const port = process.env.port

connect()
app.use(cors())
app.use(express.json())
app.use("/PaySa/User", userRouter)
app.use("/PaySa/Admin", adminRouter)
app.use("/PaySa/Account", accountRouter)
app.use("/PaySa/Transaction", TransactionRouter)


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})