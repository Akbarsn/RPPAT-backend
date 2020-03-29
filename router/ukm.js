const router = require('express').Router()
const { getHomepage, getLaporanPembelian, getLaporanPenjualan,
    getLaporanProduksi, postDataProduksi, getLihatStokBahan, getLihatStokProduk, getRiwayat } = require('../controllers/ukmController')

//Get Homepage
router.get('/', getHomepage)

//Get Laporan
router.get('/laporan/pembelian', getLaporanPembelian)

router.get('/laporan/penjualan', getLaporanPenjualan)

router.get('/laporan/produksi', getLaporanProduksi)

//Post Data Produksi
router.post('/laporan', postDataProduksi)

//Get Lihat Stok
router.get('/lihat-stok/bahan', getLihatStokBahan)

router.get('/lihat-stok/produk', getLihatStokProduk)

//Get Riwayat Transaksi
router.get('/riwayat-transaksi', getRiwayat)

module.exports = router