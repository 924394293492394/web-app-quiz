import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuizLogic from '../components/PassageQuizLogic';

const QuizPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/quizzes/${id}`);
                if (!response.ok) {
                    throw new Error('Сетевая ошибка');
                }
                const data = await response.json();
                setQuiz(data);
            } catch (error) {
                console.error('Ошибка при загрузке опроса:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    const { selectedAnswers, results, handleAnswerChange, handleSubmit } = useQuizLogic(quiz);

    useEffect(() => {
        if (results) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [results, navigate]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!quiz) {
        return <div>Опрос не найден</div>;
    }

    return (
        <div>
            <h1>{quiz.title}</h1>
            {results ? (
                <div>
                    <h2>Ваш результат:</h2>
                    <p>Вы набрали {results.score} из {results.total}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {quiz.questions.map((question, index) => (
                        <div key={index}>
                            <h3>{question.question}</h3>
                            <ul>
                                {question.answers.map((answer, ansIndex) => (
                                    <li key={ansIndex}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`question-${index}`}
                                                checked={selectedAnswers[index] === ansIndex}
                                                onChange={() => handleAnswerChange(index, ansIndex)}
                                            />
                                            {answer}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <button type="submit">Отправить ответы</button>
                </form>
            )}
        </div>
    );
};

export default QuizPage;
