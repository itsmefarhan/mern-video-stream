const express = require("express");
const router = express.Router();
const { requireLogin } = require("../controllers/auth");
const {
  uploadVideo,
  newVideo,
  getVideos,
  getRelatedVideos,
  getVideo,
} = require("../controllers/media");

router.route("/upload").post(requireLogin, uploadVideo);
router.route("/new").post(requireLogin, newVideo);
router.route("/").get(getVideos);
router.route("/related/:videoId").get(getRelatedVideos);
router.route("/:videoId").get(getVideo);
module.exports = router;
