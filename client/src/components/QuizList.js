import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from './auth/Auth';

function QuizList({ quizzes, onUpdateQuizzes }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadQuizzes() {
            try {
                const response = await fetchWithAuth(`${process.env.REACT_APP_SERVER_URL}/api/quizzes`);
                if (response.ok) {
                    const data = await response.json();
                    onUpdateQuizzes(data);
                } else {
                    setError('Ошибка при загрузке данных');
                }
            } catch (err) {
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        }

        loadQuizzes();
    }, [onUpdateQuizzes]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!quizzes.length) {
        return <div className="no-quizzes-message">Нет доступных опросов</div>;
    }

    return (
        <div className="quiz-list-page">
            <h2>Список всех опросов</h2>
            <ul className="quiz-list">
                {quizzes.map((quiz) => (
                    <li
                        key={quiz._id}
                        onClick={() => navigate(`/quiz/${quiz._id}`)}
                        className="quiz-list-item"
                    >
                        {quiz.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuizList;
