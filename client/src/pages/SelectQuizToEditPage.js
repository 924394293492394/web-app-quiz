import React from 'react';
import useDeleteQuizLogic from '../components/DeleteQuizLogic';

const SelectQuizToEditPage = () => {
    const { quizzes, selectedQuizId, setSelectedQuizId } = useDeleteQuizLogic();

    return (
        <div>
            <h2>Выберите опрос для редактирования</h2>
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
            <button onClick={() => window.location.href = `/edit/${selectedQuizId}`} disabled={!selectedQuizId}>
                Редактировать выбранный опрос
            </button>
        </div>
    );
};

export default SelectQuizToEditPage;
