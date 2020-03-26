const router = require('express').Router()
const { getHomepage, getLaporanPembelian, getLaporanPenjualan, postDataPembelian } = require('../controllers/bahanTambahController')

//Get Homepage
router.get('/', getHomepage)

//Get Laporan
router.get('/laporan/pembelian', getLaporanPembelian)

router.get('/laporan/penjualan', getLaporanPenjualan)

//Post data Pembelian
router.post('/laporan', postDataPembelian)

module.exports = router