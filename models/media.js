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
    comments: [
      {
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        mediaId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Media",
        },
        repliedTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        mediaId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Media",
        },
      },
    ],
    dislikes: [
      {
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        mediaId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Media",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", MediaSchema);
