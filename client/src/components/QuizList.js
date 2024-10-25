import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quizzes');
                setQuizzes(response.data);
            } catch (err) {
                setError('Ошибка загрузки квизов');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Список квизов</h2>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>{quiz.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;
