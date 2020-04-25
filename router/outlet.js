const router = require("express").Router();
const {
  getHomepage,
  getLaporanPembelian,
  getLaporanPenjualan,
  getLihatStok,
  getRiwayat,
  getBeliProduk,
  getDetailToko,
  PesanProduk,
  BayarTransaksi,
  KonfirmasiPenerimaan,
  GetTambahKasir,
  TambahKasir,
  GetNotification,
  PostEditStok,
} = require("../controllers/outletController");
const multer = require("multer");

//Config for multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/bukti_pembayaran");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//Init multer with Disk Storage
const upload = multer({
  storage: storage,
});

//Get Homepage
router.get("/", getHomepage);

//Get Laporan
router.get("/laporan/pembelian", getLaporanPembelian);

router.get("/laporan/penjualan", getLaporanPenjualan);

//Get Lihat Stok
router.get("/lihat-stok", getLihatStok);

//Get Riwayat Transaksi
router.get("/riwayat-transaksi", getRiwayat);

//Get Beli Produk
router.get("/beli-produk", getBeliProduk);

//Get Detail Toko
router.get("/detail-toko/:shopID", getDetailToko);

//Beli Produk
router.post("/beli-produk", PesanProduk);

//Pembayaran
router.post("/bayar-transaksi", upload.single("file"), BayarTransaksi);

//Konfirmasi Penerimaan
router.post("/konfirmasi-penerimaan", KonfirmasiPenerimaan);

router.get("/kasir", GetTambahKasir);

router.post("/kasir", TambahKasir);

router.post("/lihat-stok", PostEditStok);

router.get("/notifikasi", GetNotification);

module.exports = router;
