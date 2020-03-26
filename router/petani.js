const router = require('express').Router()
const { getHomepage, getLaporanPenjualan, getLaporanStokPanen, postStokPanen } = require('../controllers/petaniController')

//Get Homepage
router.get('/', getHomepage)

//Get Laporan
router.get('/laporan/penjualan', getLaporanPenjualan)

router.get('/laporan/stok-panen', getLaporanStokPanen)

//Post Stok Panen
router.post('/laporan', postStokPanen)

module.exports = router;