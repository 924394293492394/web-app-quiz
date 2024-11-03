const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [
        {
            question: { type: String, required: true },
            answers: [{ type: String, required: true }],  
            correctAnswer: { type: String, required: true }
        }
    ],
    creator: { type: String, required: true }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
