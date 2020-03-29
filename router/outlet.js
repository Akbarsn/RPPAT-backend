const router = require('express').Router()
const { getHomepage, getLaporanPembelian, getLaporanPenjualan, getLihatStok, getRiwayat } = require('../controllers/outletController')

//Get Homepage
router.get('/', getHomepage);

//Get Laporan
router.get('/laporan/pembelian', getLaporanPembelian)

router.get('/laporan/penjualan', getLaporanPenjualan)

//Get Lihat Stok
router.get('/lihat-stok', getLihatStok)

//Get Riwayat Transaksi
router.get('/riwayat-transaksi', getRiwayat)

module.exports = router