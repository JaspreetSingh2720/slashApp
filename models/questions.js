const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: []
},{timesatamps: true})

const Questions = mongoose.model("questions", questionsSchema);

module.exports = {Questions};