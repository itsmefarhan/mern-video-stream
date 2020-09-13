const express = require("express");
const router = express.Router();
const { requireLogin } = require("../controllers/auth");
const { uploadVideo } = require("../controllers/media");

router.route("/upload").post(requireLogin, uploadVideo);

module.exports = router;
