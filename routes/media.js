const express = require("express");
const router = express.Router();
const { requireLogin } = require("../controllers/auth");
const {
  uploadVideo,
  newVideo,
  getVideos,
  getRelatedVideos,
  incrementView,
  getVideo,
  getSubscriptions,
  addComment,
  getComments,
  deleteComment,
  addLike,
  addDislike,
  removeLike,
  removeDislike,
  getLikesDislikes,
} = require("../controllers/media");

router.route("/upload").post(requireLogin, uploadVideo);
router.route("/subscriptions").get(requireLogin, getSubscriptions);
router.route("/new").post(requireLogin, newVideo);
router.route("/").get(getVideos);
router.route("/related/:videoId").get(getRelatedVideos);
router
  .route("/comment/:videoId")
  .put(requireLogin, addComment)
  .get(getComments);
router.route("/like/:videoId").put(requireLogin, addLike);
router.route("/unlike/:videoId").put(requireLogin, removeLike);
router.route("/dislike/:videoId").put(requireLogin, addDislike);
router.route("/undislike/:videoId").put(requireLogin, removeDislike);
router.route("/likedislike/:videoId").get(requireLogin, getLikesDislikes);
router
  .route("/comment/:videoId/:commentId")
  .delete(requireLogin, deleteComment);
router.route("/:videoId").get(incrementView, getVideo);
module.exports = router;
