module.exports = {
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            next()
        } else {
            res.redirect("/fail-auth")
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