const router = require('express').Router()
const { getHomepage, getLaporanPembelian, getLaporanPenjualan, postDataPembelian, getLihatStok, getRiwayat, KonfirmasiPembayaran } = require('../controllers/bahanTambahController')

router.get('/', getHomepage)

router.get('/laporan/pembelian', getLaporanPembelian)

router.get('/laporan/penjualan', getLaporanPenjualan)

router.post('/laporan', postDataPembelian)

router.get('/lihat-stok', getLihatStok)

router.get('/riwayat-transaksi', getRiwayat)

router.post('/konfirmasi-pembayaran', KonfirmasiPembayaran)

module.exports = router