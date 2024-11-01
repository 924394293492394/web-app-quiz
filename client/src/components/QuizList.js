import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/quizzes`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Ошибка при загрузке опросов:', error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Список всех опросов</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li
            key={quiz._id}
            onClick={() => navigate(`/quiz/${quiz._id}`)}
            style={{ cursor: 'pointer', marginBottom: '5px', color: 'blue', textDecoration: 'underline' }}
          >
            {quiz.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
