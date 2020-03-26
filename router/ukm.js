const router = require('express').Router()
const { getHomepage, getLaporanPembelian, getLaporanPenjualan, getLaporanProduksi, postDataProduksi } = require('../controllers/ukmController')

//Get Homepage
router.get('/', getHomepage)

//Get Laporan
router.get('/laporan/pembelian', getLaporanPembelian)

router.get('/laporan/penjualan', getLaporanPenjualan)

router.get('/laporan/produksi', getLaporanProduksi)

//Post Data Produksi
router.post('/laporan', postDataProduksi)

module.exports = router