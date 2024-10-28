import React from 'react';
import useDeleteQuizLogic from '../components/DeleteQuizLogic';

const DeleteQuizPage = () => {
    const { quizzes, selectedQuizId, setSelectedQuizId, handleDeleteQuiz } = useDeleteQuizLogic();

    return (
        <div>
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
    );
};

export default DeleteQuizPage;
