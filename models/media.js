const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    privacy: {
      type: String,
    },
    genre: {
      type: String,
    },
    filePath: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", MediaSchema);
