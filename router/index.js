const router = require('express').Router();
const models = require('../models');
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

router.use('/bahan-tambah', isAuthenticated, bahanTambahRoute)

router.use('/ukm', isAuthenticated, UMKMRoute)

router.use('/outlet', isAuthenticated, outletRoute)

router.use('/kasir', isAuthenticated)

router.get('/fail-auth', (req, res) => {
    res.status(406).json({
        message: "Authentication Failed"
    })
})

router.get('/test', async (req, res) => {
    res.json({
        data: req.session
    })
})

module.exports = router