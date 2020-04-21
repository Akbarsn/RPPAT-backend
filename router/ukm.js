const router = require("express").Router();
const {
  getHomepage,
  getLaporanPembelian,
  getLaporanPenjualan,
  getLaporanProduksi,
  postDataProduksi,
  getLihatStokBahan,
  getLihatStokProduk,
  getRiwayat,
  getBeliBahanPetani,
  getBeliBahanKemasan,
  getBeliBahanTambah,
  getDetailToko,
  PesanBahan,
  KonfirmasiPembayaran,
  KonfirmasiPenerimaan,
  BayarTransaksi,
  PostEditStok,
  GetNotification,
} = require("../controllers/ukmController");
const multer = require("multer");

//Config for multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/bukti_pembayaran");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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

router.get("/laporan/produksi", getLaporanProduksi);

//Post Data Produksi
router.post("/laporan", postDataProduksi);

//Get Lihat Stok
router.get("/lihat-stok/bahan", getLihatStokBahan);

router.get("/lihat-stok/produk", getLihatStokProduk);

//Get Riwayat Transaksi
router.get("/riwayat-transaksi", getRiwayat);

//Get Beli Bahan
router.get("/beli-bahan/bahan-baku", getBeliBahanPetani);

router.get("/beli-bahan/kemasan", getBeliBahanKemasan);

router.get("/beli-bahan/bahan-tambahan", getBeliBahanTambah);

//Get Detail Toko
router.get("/detail-toko/:shopID", getDetailToko);

//Post Beli Bahan
router.post("/beli-bahan", PesanBahan);

router.post("/bayar-transaksi", upload.single("file"), BayarTransaksi);

//Konfirmasi Pembayaran
router.post("/konfirmasi-pembayaran", KonfirmasiPembayaran);

//Konfirmasi Penerimaan
router.post("/terima-barang", KonfirmasiPenerimaan);

router.post("/lihat-stok", PostEditStok);

router.get("/notifikasi", GetNotification);

module.exports = router;
