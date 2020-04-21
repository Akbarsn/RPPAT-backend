const router = require("express").Router();
const models = require("../models");
const kasirRoute = require("./kasir");
const authorization = require("./auth");
const petaniRoute = require("./petani");
const kemasanRoute = require("./kemasan");
const bahanTambahRoute = require("./bahanTambah");
const outletRoute = require("./outlet");
const UMKMRoute = require("./ukm");
const {
  GetGantiProfile,
  PostGantiProfile,
} = require("../controllers/authController");

const { isAuthenticated } = require("../middleware");

router.use("/auth", authorization);

router.get("/ganti-profile", isAuthenticated, GetGantiProfile);

router.get("/ganti-profile", isAuthenticated, PostGantiProfile);

router.use("/petani", isAuthenticated, petaniRoute);

router.use("/kemasan", isAuthenticated, kemasanRoute);

router.use("/bahan-tambahan", isAuthenticated, bahanTambahRoute);

router.use("/umkm", isAuthenticated, UMKMRoute);

router.use("/outlet", isAuthenticated, outletRoute);

router.use("/kasir", kasirRoute);

router.get("/users", async (req, res) => {
  const users = await models.Users.findAll();

  res.json({
    users,
  });
});

module.exports = router;
