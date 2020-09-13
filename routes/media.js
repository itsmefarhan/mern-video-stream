const express = require("express");
const router = express.Router();
const { requireLogin } = require("../controllers/auth");
const { uploadVideo, newMedia } = require("../controllers/media");

router.route("/upload").post(requireLogin, uploadVideo);
router.route("/new").post(requireLogin, newMedia);

module.exports = router;
