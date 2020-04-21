const router = require("express").Router();
const {
    getHomepage,
    getLaporanPenjualan,
    getLaporanStokKemasan,
    postStokKemasan,
    getLihatStok,
    getRiwayat,
    KonfirmasiPembayaran,
    GetNotification,
    PostEditStok,
} = require("../controllers/kemasanController");

//Get Homepage
router.get("/", getHomepage);

//Get Laporan
router.get("/laporan/penjualan", getLaporanPenjualan);

router.get("/laporan/stok-kemasan", getLaporanStokKemasan);

//Post Data Stok Kemasan
router.post("/laporan", postStokKemasan);

//Get Lihat Stok
router.get("/lihat-stok", getLihatStok);

//Get Riwayat Transaksi
router.get("/riwayat-transaksi", getRiwayat);

//Konfirmasi Pembayaran
router.post("/konfirmasi-pembayaran", KonfirmasiPembayaran);

router.post("/lihat-stok", PostEditStok)

router.get("/notifikasi", GetNotification)

module.exports = router;
