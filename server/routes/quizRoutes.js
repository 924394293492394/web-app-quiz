const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

// Создание нового квиза
router.post('/quizzes', async (req, res) => {
    const { title, questions } = req.body;

    const quiz = new Quiz({ title, questions });

    try {
        const savedQuiz = await quiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message }); 
    }
});

// Получение всех квизов
router.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Получение опроса по ID
router.get('/quizzes/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Опрос не найден' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
