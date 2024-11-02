// routes/userActions.js
const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/user-actions', authMiddleware, async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ username: req.user.username });
    if (!userProfile) {
      return res.status(404).json({ message: 'Профиль пользователя не найден' });
    }

    res.json(userProfile.actions_history);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении действий пользователя' });
  }
});

module.exports = router;
