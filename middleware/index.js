require('dotenv').config()
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_KEY

module.exports = {
    isAuthenticated(req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            if (token) {
                try {
                    const payload = jwt.verify(token, KEY)
                    if (payload) {
                        req.user = payload
                        next()
                    } else {
                        res.status(403)
                        const err = new Error("Token salah")
                        next(err)
                    }
                } catch (err) {
                    console.log(err.message)
                    const error = new Error("Terjadi kesalahan")
                    next(error)
                }
            }
        } else {
            const error = new Error("Token tidak ditemukan")
            next(error)
        }
    },

    checkRoles(req, res, next, role) {
        if (req.user.role === role) {
            next()
        } else {
            res.status(406).json({
                message: "Page forbidden for your role"
            })
        }
    }
}