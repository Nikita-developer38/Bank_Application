const jwt = require("jsonwebtoken")

exports.auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        // console.log(token)
        if (!token) return res.status(400).json({ message: "token is not found" })
        const compare = jwt.verify(token, process.env.JWT_SECRET)
        if (!compare) return res.status(400).json({ message: "you are not authorized" })

        req.user = compare
        // console.log(req.user)
        next()
    } catch (error) {
        res.status(400).json({ message: "error in authentication" })
    }
}