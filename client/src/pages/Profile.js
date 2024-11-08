import React from 'react';
import Header from '../components/Header';
import useProfileLogic from '../components/logics/ProfileLogic';
import '../styles/Profile.css';
import logo from '../images/profile-photo.jpg';

const Profile = () => {
  const { profile } = useProfileLogic();

  if (!profile) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <Header />
      <div className="highlight-zone">
        <div className="profile-info">
          <img src={logo} alt="Profile" />
          <h2>Профиль пользователя</h2>
          <p>Имя пользователя: {profile.username}</p>
          <p>Электронная почта: {profile.email}</p>
          <p>Дата регистрации: {new Date(profile.registration_date).toLocaleDateString()}</p>
        </div>
        <div className="profile-actions">
          <div id="history">
            <h4>Созданные опросы</h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Опрос</th>
                    <th>Время</th>
                  </tr>
                </thead>
                <tbody>
                  {[...profile.actions_history.created_surveys].reverse().map((survey, index) => (
                    <tr key={index}>
                      <td>{survey.title}</td>
                      <td>{new Date(survey.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4>Удаленные опросы</h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Опрос</th>
                    <th>Время</th>
                  </tr>
                </thead>
                <tbody>
                  {[...profile.actions_history.deleted_surveys].reverse().map((survey, index) => (
                    <tr key={index}>
                      <td>{survey.title}</td>
                      <td>{new Date(survey.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4>Пройденные опросы</h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Опрос</th>
                    <th>Время</th>
                    <th>Результат (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {[...profile.actions_history.completed_surveys].reverse().map((survey, index) => (
                    <tr key={index}>
                      <td>{survey.title}</td>
                      <td>{new Date(survey.timestamp).toLocaleDateString()}</td>
                      <td>{survey.completion_rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
