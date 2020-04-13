const router = require('express').Router();
const models = require('../models');
const kasirRoute = require('./kasir')
const { Login } = require('../controllers/kasirController')
const authorization = require('./auth')
const petaniRoute = require('./petani')
const kemasanRoute = require('./kemasan')
const bahanTambahRoute = require('./bahanTambah')
const outletRoute = require('./outlet')
const UMKMRoute = require('./ukm')

const { isAuthenticated } = require('../middleware')

router.use('/auth', authorization)

router.post('/kasir/login', Login)

router.use('/petani', isAuthenticated, petaniRoute)

router.use('/kemasan', isAuthenticated, kemasanRoute)

router.use('/bahan-tambah', isAuthenticated, bahanTambahRoute)

router.use('/ukm', isAuthenticated, UMKMRoute)

router.use('/outlet', isAuthenticated, outletRoute)

router.use('/kasir', isAuthenticated, kasirRoute)

router.get('/test', async (req, res) => {
    res.send('<h2>Hello World</h2>')
    res.json({ message: "Hello World" })
})

module.exports = router