const router = require("express").Router();
const multer = require("multer");

//Config for multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//Init multer with Disk Storage
const upload = multer({
  storage: storage,
});

//Handler
const {
  RegisterHandler,
  LoginHandler,
} = require("../controllers/authController");

const registerUpload = upload.fields([
  { name: "IDcard", maxCount: 1 },
  { name: "profile", maxCount: 1 },
]);

//Register
router.post("/register", registerUpload, RegisterHandler);

//Login
router.post("/login", LoginHandler);

module.exports = router;
