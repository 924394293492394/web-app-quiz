import React from 'react';
import Header from '../components/Header';
import contactImage from '../images/cute-cat2.jpg';
import '../styles/Contact.css';

const Contact = () => {
    return (
        <div>
            <Header />
            <div className="contact-container">
                <h1>Свяжитесь с нами</h1>
                <p>Если у вас есть вопросы или предложения, пожалуйста,<br />
                свяжитесь с нами любым из следующих способов:</p>
                <ul>
                    <li>Email: support@quizify.com</li>
                    <li>Телефон: +375333370929</li>
                    <li>Адрес: Московский проспект, 70к2, Витебск</li>
                </ul>
                <img src={contactImage} alt="contact Us" className="contact-image" />
                <p>Мы всегда рады услышать ваши отзывы и предложения!</p>
            </div>
        </div>
    );
};

export default Contact;
