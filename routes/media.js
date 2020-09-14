const express = require("express");
const router = express.Router();
const { requireLogin } = require("../controllers/auth");
const {
  uploadVideo,
  newVideo,
  getVideos,
  getRelatedVideos,
  getVideo,
  getSubscriptions,
} = require("../controllers/media");

router.route("/upload").post(requireLogin, uploadVideo);
router.route("/subscriptions").get(requireLogin, getSubscriptions);
router.route("/new").post(requireLogin, newVideo);
router.route("/").get(getVideos);
router.route("/related/:videoId").get(getRelatedVideos);
router.route("/:videoId").get(getVideo);
module.exports = router;
