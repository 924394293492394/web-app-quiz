const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const userActionsRoutes = require('./routes/userActions');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/quiz-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/auth', authRoutes);
app.use('/api', quizRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', userActionsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
