import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/profile`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Ошибка получения профиля');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p>Имя пользователя: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Дата регистрации: {new Date(profile.registration_date).toLocaleDateString()}</p>
      <p>Дата последней активности: {new Date(profile.last_active_date).toLocaleDateString()}</p>
      <h3>История действий</h3>
      <div>
        <h4>Созданные опросы</h4>
        <ul>
          {profile.actions_history.created_surveys.map((survey, index) => (
            <li key={index}>
              Опрос: {survey.title} - Время: {new Date(survey.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
        <h4>Удаленные опросы</h4>
        <ul>
          {profile.actions_history.deleted_surveys.map((survey, index) => (
            <li key={index}>
              Опрос: {survey.title} - Время: {new Date(survey.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
        <h4>Пройденные опросы</h4>
        <ul>
          {profile.actions_history.completed_surveys.map((survey, index) => (
            <li key={index}>
              Опрос: {survey.title}, Процент завершения: {survey.completion_rate} - 
              Время: {new Date(survey.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
