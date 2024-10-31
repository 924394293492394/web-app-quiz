import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        username, 
        email, 
        password 
      });
      setMessage(response.data.message);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Имя пользователя:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Электронная почта:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
