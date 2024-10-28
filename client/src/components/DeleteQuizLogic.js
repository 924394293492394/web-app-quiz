import { useState, useEffect } from 'react';

const useDeleteQuizLogic = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuizId, setSelectedQuizId] = useState('');

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

    const handleDeleteQuiz = async () => {
        if (!selectedQuizId) return;

        try {
            const response = await fetch(`http://localhost:5000/api/quizzes/${selectedQuizId}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                setQuizzes(quizzes.filter((quiz) => quiz._id !== selectedQuizId));
                setSelectedQuizId('');
                alert('Опрос успешно удален');
            } else {
                console.error('Ошибка при удалении опроса');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return {
        quizzes,
        selectedQuizId,
        setSelectedQuizId,
        handleDeleteQuiz,
    };
};

export default useDeleteQuizLogic;
