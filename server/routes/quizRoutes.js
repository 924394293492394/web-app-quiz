const express = require('express');
const Quiz = require('../models/Quiz');

const router = express.Router();

// Создание квиза
router.post('/', async (req, res) => {
    try {
        const quizzes = req.body.quizzes;
        const savedQuizzes = await Quiz.insertMany(quizzes);
        res.status(201).json(savedQuizzes);
    } catch (error) {
        console.error('Ошибка при создании квизов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Получение всех квизов
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        console.error('Ошибка при получении квизов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
