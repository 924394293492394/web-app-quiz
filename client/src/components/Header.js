import React from 'react';
import '../styles/Header.css';
import logo from '../images/quiz-logo-web2.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Site Logo" />
                <span>App Quizify</span>
            </div>
            <nav className="nav">
                <a href="/">Home</a>
                <a href="/create">Create</a>
                <a href="/delete">Delete</a>
                <a href="/edit">Edit</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
                <a href="/profile">Profile</a>
                <a href="#logout" onClick={handleLogout}>Logout</a>
            </nav>
        </header>
    );
};

export default Header;