const mongoose = require("mongoose");
const formidable = require("formidable");
const Media = require("../models/media");
const User = require("../models/user");
const fs = require("fs");

let gridfs = null;
mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

exports.uploadVideo = async (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "Video could not be uploaded" });
      }
      let media = new Media(fields);
      media.postedBy = user;
      if (files.video) {
        let writeStream = gridfs.openUploadStream(media._id, {
          contentType: files.video.type || "binary/octet-stream",
        });
        fs.createReadStream(files.video.path).pipe(writeStream);
      }
      await media.save();
      res.json(media);
    });
  } catch (err) {
    console.log(err);
  }
};
