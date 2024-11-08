import React from 'react';
import Header from '../components/Header';
import aboutImage from '../images/cute-cat.jpg';
import '../styles/About.css';

const About = () => {
    return (
        <div>
            <Header />
            <div className="about-container">
                <h1>О нас</h1>
                <p>
                Добро пожаловать в App Quizify!<br />
                Наше приложение поможет вам создавать, редактировать и проходить интересные опросы.<br /> 
                </p>
                <img src={aboutImage} alt="about Us" className="about-image" />
                <p>Мы рады, что вы выбрали наше приложение!<br />
                Наслаждайтесь использованием нашего сервиса!</p>
            </div>
        </div>
    );
};

export default About;
