const router = require('express').Router()
const multer = require('multer')
const passport = require('passport')

//Config for multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/ktp');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

//Init multer with Disk Storage
const upload = multer({
    storage: storage
})

//Handler
const {
    RegisterHandler,
    LoginHandler
} = require('../controllers/authController')

//Register
router.post('/register', upload.single('IDcard'), RegisterHandler)

//Login
router.post('/login', 
    passport.authenticate("local", {
    failureRedirect: "/fail-login"
}), LoginHandler)

module.exports = router