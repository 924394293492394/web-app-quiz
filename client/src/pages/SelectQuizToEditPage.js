import React from 'react';
import Header from '../components/Header';
import useDeleteQuizLogic from '../components/DeleteQuizLogic';
import '../styles/SelectQuizToEdit.css';

const SelectQuizToEditPage = () => {
    const { quizzes, selectedQuizId, setSelectedQuizId } = useDeleteQuizLogic();

    return (
        <div className="select-quiz-page">
            <Header />
            <div className="edit-highlight-zone">
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
                <button 
                    onClick={() => window.location.href = `/edit/${selectedQuizId}`} 
                    disabled={!selectedQuizId}>
                    Редактировать выбранный опрос
                </button>
            </div>
        </div>
    );
};

export default SelectQuizToEditPage;
