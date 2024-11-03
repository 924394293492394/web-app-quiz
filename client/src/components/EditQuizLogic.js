import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useEditQuizLogic = (id) => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/quizzes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке опроса');
                }
                const data = await response.json();
                setTitle(data.title);
                setQuestions(data.questions);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].question = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (questionIndex, answerIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers[answerIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (questionIndex, correctAnswer) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].correctAnswer = correctAnswer;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', answers: ['', '', '', ''], correctAnswer: 0 }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const addAnswer = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers.push('');
        setQuestions(newQuestions);
    };

    const removeLastAnswer = (questionIndex) => {
        const newQuestions = [...questions];
        if (newQuestions[questionIndex].answers.length > 0) {
            newQuestions[questionIndex].answers.pop();
            setQuestions(newQuestions);
        }
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        const quizData = { title, questions };
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/quizzes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(quizData),
            });
            if (response.ok) {
                console.log('Опрос успешно обновлен');
                navigate('/');
            } else {
                console.error('Ошибка при обновлении опроса:', await response.text());
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setQuestions([{ question: '', answers: ['', '', '', ''], correctAnswer: 0 }]);
    };

    return {
        title,
        setTitle,
        questions,
        handleQuestionChange,
        handleAnswerChange,
        handleCorrectAnswerChange,
        addQuestion,
        removeQuestion,
        addAnswer,
        removeLastAnswer,
        handleEditSubmit,
        resetForm,
        loading,
        error,
    };
};
