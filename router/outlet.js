const router = require('express').Router()
const { getHomepage, getLaporanPembelian,
    getLaporanPenjualan, getLihatStok, getRiwayat,
    getBeliProduk, getDetailToko,
    PesanProduk, BayarTransaksi, KonfirmasiPenerimaan,
    GetTambahKasir, TambahKasir
} = require('../controllers/outletController')

//Get Homepage
router.get('/', getHomepage);

//Get Laporan
router.get('/laporan/pembelian', getLaporanPembelian)

router.get('/laporan/penjualan', getLaporanPenjualan)

//Get Lihat Stok
router.get('/lihat-stok', getLihatStok)

//Get Riwayat Transaksi
router.get('/riwayat-transaksi', getRiwayat)

//Get Beli Produk
router.get('/beli-produk', getBeliProduk)

//Get Detail Toko
router.get('/detail-toko/:shopID', getDetailToko)

//Beli Produk
router.post('/beli-produk', PesanProduk)

//Pembayaran
router.post('/bayar-transaksi', BayarTransaksi)

//Konfirmasi Penerimaan
router.post('/konfirmasi-penerimaan', KonfirmasiPenerimaan)

router.get('/kasir', GetTambahKasir)

router.post('/kasir', TambahKasir)

module.exports = router