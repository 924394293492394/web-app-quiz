import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuizList from '../components/QuizList';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <QuizList />
      <button onClick={() => navigate('/create')}>Создать новый опрос</button>
      <button onClick={() => navigate('/delete')}>Удалить опрос</button>
    </div>
  );
};

export default Home;
