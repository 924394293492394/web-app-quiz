import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from './Auth';

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadQuizzes() {
            try {
                const response = await fetchWithAuth('http://192.168.0.10:5000/api/quizzes');
                if (response.ok) {
                    const data = await response.json();
                    setQuizzes(data);
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
    }, []);    

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Список всех опросов</h2>
            <ul>
                {quizzes.map((quiz) => (
                    <li
                        key={quiz._id}
                        onClick={() => navigate(`/quiz/${quiz._id}`)}
                        style={{ cursor: 'pointer', marginBottom: '5px', color: 'blue', textDecoration: 'underline' }}
                    >
                        {quiz.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuizList;
