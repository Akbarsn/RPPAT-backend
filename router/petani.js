const router = require("express").Router();
const {
  getHomepage,
  getLaporanPenjualan,
  getLaporanStokPanen,
  postStokPanen,
  getLihatStok,
  getRiwayat,
  KonfirmasiPembayaran,
  PostEditStok,
  GetNotification,
} = require("../controllers/petaniController");

//Get Homepage
router.get("/", getHomepage);

//Get Laporan
router.get("/laporan/penjualan", getLaporanPenjualan);

router.get("/laporan/stok-panen", getLaporanStokPanen);

//Post Stok Panen
router.post("/laporan", postStokPanen);

//Get Lihat Stok
router.get("/lihat-stok", getLihatStok);

//Get Riwayat Transaksi
router.get("/riwayat-transaksi", getRiwayat);

//Konfirmasi Pembayaran
router.post("/konfirmasi-pembayaran", KonfirmasiPembayaran);

router.post("/lihat-stok", PostEditStok)

router.get("/notifikasi", GetNotification)

module.exports = router;
