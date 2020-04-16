require('dotenv').config()
const jwt = require('jsonwebtoken')
const KEY = process.env.JWT_SECRET

module.exports = {
    isAuthenticated(req, res, next) {
        const token = req.session.token;
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
                console.log(err)
                const error = new Error("Terjadi kesalahan")
                next(error)
            }
        } else {
            res.status(403)
            const err = new Error("Silahkan Login terlebih dahulu")
            next(err)
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