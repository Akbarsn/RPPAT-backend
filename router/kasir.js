const router = require('express').Router()
const { GetPage, PostTransaksi, Login } = require('../controllers/kasirController')
const { isAuthenticated } = require('../middleware')


router.get('/', isAuthenticated, GetPage)

router.post('/', isAuthenticated, PostTransaksi)

router.post('/login', Login)

module.exports = router