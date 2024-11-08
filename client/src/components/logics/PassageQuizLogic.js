import { useState } from 'react';

const useQuizLogic = (quiz) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [results, setResults] = useState(null);

    const handleAnswerChange = (questionIndex, answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answerIndex,
        });
    };

    const handleQuizCompletion = async (quizId, score, total) => {
        const completionRate = `${((score / total) * 100).toFixed(2)}%`;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/quizzes/${quizId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ completion_rate: completionRate }),
            });
            if (!response.ok) {
                throw new Error('Ошибка при прохождении опроса');
            }
            console.log('Опрос успешно пройден');
        } catch (error) {
            console.error('Ошибка при прохождении опроса:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!quiz) return;

        const correctAnswers = quiz.questions.map((question) => String(question.correctAnswer));
        const userAnswers = Object.values(selectedAnswers).map(String);

        const score = userAnswers.reduce((acc, answer, index) => {
            return acc + (answer === correctAnswers[index] ? 1 : 0);
        }, 0);

        setResults({ score, total: quiz.questions.length });
        handleQuizCompletion(quiz._id, score, quiz.questions.length);
    };

    return { selectedAnswers, results, handleAnswerChange, handleSubmit };
};

export default useQuizLogic;
