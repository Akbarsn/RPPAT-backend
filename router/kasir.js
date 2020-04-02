const router = require('express').Router()
const { GetPage, PostTransaksi } = require('../controllers/kasirController')

router.get('/', GetPage)

router.post('/', PostTransaksi)