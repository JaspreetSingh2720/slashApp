const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    likeStatus: {
      type: Boolean,
      default: false,
    },
    dislikeStatus: {
      type: Boolean,
      dafault: false,
    },
    superLikeStatus: {
      type: Boolean,
      default: false,
    },
    boostProfileStatus: {
      type: Boolean,
      default: false,
    },
    likedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timesatamps: true }
);

const Likes = mongoose.model("likes", likesSchema);

module.exports = { Likes };
