import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuizList from '../components/QuizList';
import Logout from '../components/Logout';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <QuizList />
      <button onClick={() => navigate('/create')}>Создать новый опрос</button>
      <button onClick={() => navigate('/delete')}>Удалить опрос</button>
      <button onClick={() => navigate('/edit')}>Редактировать опрос</button> 
      <Logout />
    </div>
  );
};

export default Home;
