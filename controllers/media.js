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
