import { useState } from 'react';

export const useCreateQuizLogic = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', answers: ['', '', '', ''], correctAnswer: 0 }]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const quizData = { title, questions };

        try {
            const response = await fetch('http://localhost:5000/api/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quizData),
            });

            if (response.ok) {
                setTitle('');
                setQuestions([{ question: '', answers: ['', '', '', ''], correctAnswer: 0 }]);
            } else {
                console.error('Ошибка при создании опроса');
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
        handleSubmit,
        resetForm,
    };
};
