const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    userId:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "users"
    },
    cookies:{
     necessary: {
        type: Boolean,
        default: false
     },
     analyticsPerformance: {
        type: Boolean,
        default: false   
     },
     marketing: {
        type: Boolean,
        default: false
     }
    }
 },{timesatamps: true})

const Setting = mongoose.model("settings", settingsSchema);

module.exports = {Setting};