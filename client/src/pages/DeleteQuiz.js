import React from 'react';
import Header from '../components/Header';
import useDeleteQuizLogic from '../components/logics/DeleteQuizLogic';
import '../styles/DeleteQuiz.css';

const DeleteQuiz = () => {
    const { quizzes, selectedQuizId, setSelectedQuizId, handleDeleteQuiz } = useDeleteQuizLogic();

    return (
        <div className="delete-quiz-page">
            <Header />
            <div className="delete-highlight-zone">
                <h2>Удаление опроса</h2>
                <select
                    value={selectedQuizId}
                    onChange={(e) => setSelectedQuizId(e.target.value)}
                >
                    <option value="">Выберите опрос</option>
                    {quizzes.map((quiz) => (
                        <option key={quiz._id} value={quiz._id}>
                            {quiz.title}
                        </option>
                    ))}
                </select>
                <button onClick={handleDeleteQuiz} disabled={!selectedQuizId}>
                    Удалить выбранный опрос
                </button>
            </div>
        </div>
    );
};

export default DeleteQuiz;
