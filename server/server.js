const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/quizapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Подключение к MongoDB успешно');
}).catch(err => {
    console.error('Ошибка подключения к MongoDB:', err);
});

app.use('/api/quizzes', quizRoutes);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
