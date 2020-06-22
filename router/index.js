const router = require("express").Router();
const models = require("../models");
const kasirRoute = require("./kasir");
const authorization = require("./auth");
const petaniRoute = require("./petani");
const kemasanRoute = require("./kemasan");
const bahanTambahRoute = require("./bahanTambah");
const outletRoute = require("./outlet");
const UMKMRoute = require("./ukm");
const adminRoute = require('./admin')
const {
  GetGantiProfile,
  PostGantiProfile,
} = require("../controllers/authController");

const { isAuthenticated } = require("../middleware");
const multer = require("multer");

//Config for multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/ktp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//Init multer with Disk Storage
const upload = multer({
  storage: storage,
});

router.use("/auth", authorization);

router.get("/ganti-profile", isAuthenticated, GetGantiProfile);

router.post("/ganti-profile", isAuthenticated, PostGantiProfile);

router.use("/petani", isAuthenticated, petaniRoute);

router.use("/kemasan", isAuthenticated, kemasanRoute);

router.use("/bahan-tambahan", isAuthenticated, bahanTambahRoute);

router.use("/umkm", isAuthenticated, UMKMRoute);

router.use("/outlet", isAuthenticated, outletRoute);

router.use("/kasir", kasirRoute);

router.use('/admin', adminRoute)

router.get("/test", async (req, res) => {
  const hello = "Hello World!";
  res.json({
    data: hello,
  });
});

router.get("/users", async (req, res) => {
  const users = await models.Users.findAll();

  res.json({
    users,
  });
});

module.exports = router;
