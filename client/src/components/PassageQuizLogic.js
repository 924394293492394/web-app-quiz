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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!quiz) return;

        const correctAnswers = quiz.questions.map((question) => String(question.correctAnswer));
        const userAnswers = Object.values(selectedAnswers).map(String);

        const score = userAnswers.reduce((acc, answer, index) => {
            return acc + (answer === correctAnswers[index] ? 1 : 0);
        }, 0);

        setResults({ score, total: quiz.questions.length });
    };

    return { selectedAnswers, results, handleAnswerChange, handleSubmit };
};

export default useQuizLogic;
