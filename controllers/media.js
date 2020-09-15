const multer = require("multer");
const Media = require("../models/media");
const User = require("../models/user");
// const ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("Only mp4 files are allowed"), false);
    }
    cb(null, true);
  },
});

let upload = multer({ storage }).single("file");

exports.uploadVideo = async (req, res) => {
  try {
    upload(req, res, (error) => {
      if (error) {
        return res.status(400).json({ success: false, error });
      }

      return res.json({
        success: true,
        filePath: req.file.path,
        fileName: req.file.filename,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.newVideo = async (req, res) => {
  try {
    const media = new Media(req.body);
    await media.save();

    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

exports.getVideos = async (req, res) => {
  try {
    const media = await Media.find()
      .populate("postedBy", "_id name email")
      .sort("-createdAt");
    res.json(media);
  } catch (err) {
    console.log(err);
  }
};

exports.getVideo = async (req, res) => {
  try {
    const media = await Media.findById(req.params.videoId).populate(
      "postedBy",
      "_id name email"
    );
    res.json(media);
  } catch (err) {
    console.log(err);
  }
};

exports.getRelatedVideos = async (req, res) => {
  try {
    const media = await Media.findById(req.params.videoId).populate(
      "postedBy",
      "_id name email"
    );
    const videos = await Media.find({
      _id: { $ne: media },
      genre: media.genre,
    });
    res.json(videos);
  } catch (err) {
    console.log(err);
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
    const user = await User.find({ subscriber: { $in: req.user._id } }).select(
      "-password -__v"
    );
    const media = await Media.find({ postedBy: { $in: user } })
      .populate("postedBy", "_id name email")
      .sort("-createdAt");
    res.json(media);
  } catch (err) {
    console.log(err);
  }
};

exports.addComment = async (req, res) => {
  try {
    let media = await Media.findById(req.params.videoId);
    media.comments.unshift(req.body);
    await media.save();
    res.json(media.comments);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    let media = await Media.findById(req.params.videoId);
    let comment = await media.comments.find(
      (com) => com._id.toString() === req.params.commentId
    );
    if (comment.postedBy._id.toString() !== req.user._id) {
      return res.status(403).json({ error: "Access Denied" });
    }
    media.comments.splice(media.comments.indexOf(comment), 1);
    await media.save();
    res.json(media.comments);
  } catch (err) {
    console.log(err);
  }
};

exports.getComments = async (req, res) => {
  try {
    let media = await Media.findById(req.params.videoId).populate(
      "comments.postedBy"
    );
    res.json({ result: media.comments });
  } catch (err) {
    console.log(err);
  }
};

exports.addLike = async (req, res) => {
  try {
    let media = await Media.findById(req.params.videoId);
    // find user in likes
    // let like = await media.likes.find(
    //   (el) => el.postedBy._id.toString() === req.user._id
    // );
    // find user in dislikes
    let dislike = await media.dislikes.find(
      (dislike) => dislike.postedBy.toString() === req.user._id
    );
    // if like return
    // if (like) {
    //   return res.status(400).json({ error: "Already liked" });
    // }
    // if dislike remove dislike
    if (dislike) {
      media.dislikes.splice(media.dislikes.indexOf(dislike), 1);
    }
    media.likes.unshift(req.body);
    await media.save();
    res.json(media.likes);
  } catch (err) {
    console.log(err);
  }
};

exports.removeLike = async (req, res) => {
  try {
    let media = await Media.findById(req.params.videoId);
    // find user in likes
    let like = await media.likes.find(
      (el) => el.postedBy.toString() === req.user._id
    );

    // if like return
    // if (!like) {
    //   return res.status(400).json({ error: "Already liked" });
    // }
    media.likes.splice(media.likes.indexOf(like), 1);
    await media.save();
    res.json(media.likes);
  } catch (err) {
    console.log(err);
  }
};

exports.addDislike = async (req, res) => {
  try {
    let media = await Media.findById(req.params.videoId);
    // find user in dislikes
    // let dislike = await media.dislikes.find(
    //   (el) => el.postedBy._id.toString() === req.user._id
    // );
    // find user in likes
    let like = await media.likes.find(
      (like) => like.postedBy._id.toString() === req.user._id
    );
    // if like return
    // if (like) {
    //   return res.status(400).json({ error: "Already liked" });
    // }
    // if dislike remove dislike
    if (like) {
      media.likes.splice(media.likes.indexOf(like), 1);
    }
    media.dislikes.unshift(req.body);
    await media.save();
    res.json(media.dislikes);
  } catch (err) {
    console.log(err);
  }
};

exports.removeDislike = async (req, res) => {
  try {
    let media = await Media.findById(req.params.videoId);
    // find user in likes
    let dislike = await media.dislikes.find(
      (el) => el.postedBy._id.toString() === req.user._id
    );

    // if like return
    // if (!like) {
    //   return res.status(400).json({ error: "Already liked" });
    // }
    media.dislikes.splice(media.dislikes.indexOf(dislike), 1);
    await media.save();
    res.json(media.dislikes);
  } catch (err) {
    console.log(err);
  }
};

exports.getLikesDislikes = async (req, res) => {
  try {
    let media = await Media.findById(req.params.videoId);
    res.json({ likes: media.likes.length, dislikes: media.dislikes.length });
  } catch (err) {
    console.log(err);
  }
};
