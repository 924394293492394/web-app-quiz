const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
});

module.exports = mongoose.model("Quiz", quizSchema);
