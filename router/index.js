const router = require('express').Router();
const models = require('../models');
const kasirRoute = require('./kasir')
const authorization = require('./auth')
const petaniRoute = require('./petani')
const kemasanRoute = require('./kemasan')
const bahanTambahRoute = require('./bahanTambah')
const outletRoute = require('./outlet')
const UMKMRoute = require('./ukm')

const { isAuthenticated } = require('../middleware')

router.use('/auth', authorization)

router.use('/petani', isAuthenticated, petaniRoute)

router.use('/kemasan', isAuthenticated, kemasanRoute)

router.use('/bahan-tambahan', isAuthenticated, bahanTambahRoute)

router.use('/umkm', isAuthenticated, UMKMRoute)

router.use('/outlet', isAuthenticated, outletRoute)

router.use('/kasir', isAuthenticated, kasirRoute)

router.get('/test', async (req, res) => {
    res.json({ message: "Hello World" })
})

module.exports = router