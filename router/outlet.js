const router = require('express').Router()
const { getHomepage, getLaporanPembelian, getLaporanPenjualan } = require('../controllers/outletController')

//Get Homepage
router.get('/',getHomepage);

//Get Laporan
router.get('/laporan/pembelian', getLaporanPembelian)

router.get('/laporan/penjualan', getLaporanPenjualan)

module.exports = router