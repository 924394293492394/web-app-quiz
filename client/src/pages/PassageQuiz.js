import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuizLogic from '../components/logics/PassageQuizLogic';
import Header from '../components/Header';
import '../styles/PassageQuiz.css';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/quizzes/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Сетевая ошибка');
        }
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Ошибка при загрузке опроса:', error);
        setQuiz(null);
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
      <Header />
      <div className="quiz-container">
        <h1>{quiz.title}</h1>
        {results ? (
          <div className="results">
            <h2>Ваш результат:</h2>
            <p>Вы набрали {results.score} из {results.total}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="quiz-form">
            {quiz.questions.map((question, index) => (
              <div key={index} className="question-block">
                <h3>{question.question}</h3>
                <ul className="answers-list">
                  {question.answers.map((answer, ansIndex) => (
                    <li key={ansIndex} className="answer-item">
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
            <button type="submit" className="submit-button">Отправить ответы</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
