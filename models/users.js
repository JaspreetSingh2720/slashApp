const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    default: "",
  },
  phoneNo: {
    type: String,
  },
  otp: {
    type: String,
    default: "",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  birthdate: {
    type: String,
    default: "",
  },
  document: {
    documentType: {
      type: String,
      default: "",
    },
    frontSide: {
      type: String,
      default: "",
    },
    backSide: {
      type: String,
      default: "",
    },
  },
  address: {
    country: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
  },
  gender: {
    type: String,
    enum: ["Man", "Woman", "Non-Binary"],
    default: "Man",
  },
  showGender: {
    type: Boolean,
    default: false,
  },
  perfectMatch: {
    type: String,
    enum: ["Man", "Woman", "Non-Binary"],
    default: "Man",
  },
  showPerfectMatch: {
    type: Boolean,
    default: false,
  },
  ageRange: {
    type: String,
    default: "",
  },
  photos: [],
  bio: {
    type: String,
    default: "",
  },
  education: {
    type: String,
    default: "",
  },
  university: {
    type: String,
    default: "",
  },
  pushNotifications: {
    type: Boolean,
    default: false,
  },
  interests: [],
  fbUrl: {
    type: String,
    default: "",
  },
  instaUrl: {
    type: String,
    default: "",
  },
  snapchatUrl: {
    type: String,
    default: "",
  },
  spotifyUrl: {
    type: String,
    default: "",
  },
  appleMusicUrl: {
    type: String,
    default: "",
  },
  tiktokUrl: {
    type: String,
    default: "",
  },
  AccountStatus: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  deleteAccountFeedback: {
    type: String,
    default: "",
  },
  screenNo: {
    type: String,
    default: "",
  },
}, {timestamps:true});

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("users", userSchema);
