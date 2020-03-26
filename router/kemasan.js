const router = require('express').Router()
const { getHomepage, getLaporanPenjualan, getLaporanStokKemasan, postStokKemasan } = require('../controllers/kemasanController')

//Get Homepage
router.get('/', getHomepage)

//Get Laporan
router.get('/laporan/penjualan', getLaporanPenjualan)

router.get('/laporan/stok-kemasan', getLaporanStokKemasan)

//Post Data Stok Kemasan
router.post('/laporan', postStokKemasan)

module.exports = router;