const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    reportedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    reportReason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timesatamps: true }
);

const Report = mongoose.model("reports", reportSchema);

module.exports = Report;
