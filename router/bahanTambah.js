const router = require('express').Router()
const { getHomepage, getLaporanPembelian, getLaporanPenjualan, postDataPembelian, getLihatStok, getRiwayat, KonfirmasiPembayaran } = require('../controllers/bahanTambahController')

//Get Homepage
router.get('/', getHomepage)

//Get Laporan
router.get('/laporan/pembelian', getLaporanPembelian)

router.get('/laporan/penjualan', getLaporanPenjualan)

//Post data Pembelian
router.post('/laporan', postDataPembelian)

//Get Lihat Stok
router.get('/lihat-stok', getLihatStok)

//Get Riwayat Transaksi
router.get('/riwayat-transaksi', getRiwayat)

//Konfirmasi Pembayaran
router.post('/konfirmasi-pembayaran', KonfirmasiPembayaran)

module.exports = router