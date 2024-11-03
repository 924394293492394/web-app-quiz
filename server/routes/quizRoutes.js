const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const UserProfile = require('../models/UserProfile');
const { authMiddleware } = require('../middleware/authMiddleware');

async function recordUserAction(username, actionType, surveyId, surveyTitle, completionRate) {
  const userProfile = await UserProfile.findOne({ username });

  if (userProfile) {
    const actionEntry = {
      survey_id: surveyId,
      title: surveyTitle,
      timestamp: new Date(),
      completion_rate: completionRate || null
    };

    switch (actionType) {
      case 'viewed':
        userProfile.actions_history.viewed_surveys.push(actionEntry);
        break;
      case 'completed':
        userProfile.actions_history.completed_surveys.push(actionEntry);
        break;
      case 'created':
        userProfile.actions_history.created_surveys.push(actionEntry);
        break;
      case 'deleted':
        userProfile.actions_history.deleted_surveys.push(actionEntry);
        break;
    }

    await userProfile.save();
    console.log(`Записано действие: ${actionType} для пользователя: ${username}`);
  }
}

// Создание нового опроса
router.post('/quizzes', authMiddleware, async (req, res) => {
  const { title, questions } = req.body;
  const username = req.user.username;

  const quiz = new Quiz({ title, questions, creator: username });

  try {
      const savedQuiz = await quiz.save();
      await recordUserAction(username, 'created', savedQuiz._id.toString(), savedQuiz.title);

      res.status(201).json(savedQuiz);
  } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
  }
});

// Получение всех опросов
router.get('/quizzes', authMiddleware, async (req, res) => {
  try {
      const quizzes = await Quiz.find();
      res.status(200).json(quizzes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
});

// Получение опросов пользователя
router.get('/user-quizzes', authMiddleware, async (req, res) => {
  try {
      const quizzes = await Quiz.find({ creator: req.user.username });
      res.status(200).json(quizzes);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
});


// Получение опроса по ID
router.get('/quizzes/:id', authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Опрос не найден' });
    }

    await recordUserAction(req.user.username, 'viewed', quiz._id.toString(), quiz.title);

    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Удаление опроса по ID
router.delete('/quizzes/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const username = req.user.username;

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Опрос не найден' });
    }

    await recordUserAction(username, 'deleted', quiz._id.toString(), quiz.title);

    await quiz.deleteOne();

    res.status(200).json({ message: 'Опрос удален' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Прохождение опроса
router.post('/quizzes/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const username = req.user.username;
  const { completion_rate } = req.body;

  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Опрос не найден' });
    }

    console.log(`Прохождение опроса для пользователя: ${username}`);
    await recordUserAction(username, 'completed', quiz._id.toString(), quiz.title, completion_rate);

    res.status(200).json({ message: 'Опрос пройден' });
  } catch (error) {
    console.error('Ошибка при прохождении опроса:', error);
    res.status(500).json({ message: 'Ошибка при прохождении опроса' });
  }
});

module.exports = router;
