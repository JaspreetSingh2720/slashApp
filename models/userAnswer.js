const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema({
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
   },
   questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions"
   },
   options:[]
},{timesatamps: true})

const UserAnswer = mongoose.model("userAnswers", userAnswerSchema);

module.exports = {UserAnswer};