const express = require('express');
const UserProfile = require('../models/UserProfile');
const Quiz = require('../models/Quiz');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
    const username = req.user.username;
    try {
        const user = await UserProfile.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Получим названия созданных опросов
        const createdSurveyActions = user.actions_history.created_surveys;
        const createdSurveys = createdSurveyActions.map(action => ({
            survey_id: action.survey_id,
            title: action.title,
            timestamp: action.timestamp
        }));

        // Получим названия удаленных опросов
        const deletedSurveyActions = user.actions_history.deleted_surveys;
        const deletedSurveys = deletedSurveyActions.map(action => ({
            survey_id: action.survey_id,
            title: action.title,
            timestamp: action.timestamp
        }));

        // Получим названия пройденных опросов
        const completedSurveyActions = user.actions_history.completed_surveys;
        const completedSurveys = completedSurveyActions.map(action => ({
            survey_id: action.survey_id,
            title: action.title,
            completion_rate: action.completion_rate,
            timestamp: action.timestamp
        }));

        res.json({
            username: user.username,
            email: user.email,
            registration_date: user.registration_date,
            last_active_date: user.last_active_date,
            actions_history: {
                created_surveys: createdSurveys,
                deleted_surveys: deletedSurveys,
                completed_surveys: completedSurveys
            }
        });
    } catch (error) {
        console.error('Ошибка при получении профиля:', error.message);
        res.status(500).json({ message: error.message });
    }
});

router.put('/profile', authMiddleware, async (req, res) => {
    const { username, email, phone, actions_history } = req.body;
    try {
        const user = await UserProfile.findOneAndUpdate(
            { username },
            { email, phone, last_active_date: new Date(), actions_history },
            { new: true, upsert: true }
        );
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
