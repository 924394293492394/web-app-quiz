import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import QuizList from '../components/QuizList';
import { fetchWithAuth } from '../components/auth/Auth';
import '../styles/QuizList.css';

const Home = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadQuizzes = useCallback(async () => {
        try {
            const response = await fetchWithAuth(`${process.env.REACT_APP_SERVER_URL}/api/quizzes`);
            if (response.ok) {
                const data = await response.json();
                setQuizzes(data);
                const searchTerm = localStorage.getItem('searchTerm') || '';
                const filtered = data.filter(quiz => quiz.title.toLowerCase().includes(searchTerm.toLowerCase()));
                setFilteredQuizzes(filtered);
            } else {
                setError('Ошибка при загрузке данных');
            }
        } catch (err) {
            setError('Ошибка при загрузке данных');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadQuizzes();
    }, [loadQuizzes]);

    const handleSearch = (searchTerm) => {
        localStorage.setItem('searchTerm', searchTerm);
        const filtered = quizzes.filter(quiz => quiz.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredQuizzes(filtered);
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Header onSearch={handleSearch} />
            <QuizList quizzes={filteredQuizzes} onUpdateQuizzes={setFilteredQuizzes} />
        </div>
    );
};

export default Home;
