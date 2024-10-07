const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "users"
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
 },{timesatamps: true})

const Feedback = mongoose.model("feedbacks", feedbackSchema);

module.exports = {Feedback};