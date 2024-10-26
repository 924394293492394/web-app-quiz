import React, { useState, useEffect } from 'react';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/quizzes');
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error('Ошибка при загрузке опросов:', error);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div>
            <h2>Список всех опросов</h2>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>{quiz.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;
