import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/quiz-logo-web2.jpg';
import '../styles/header/Header.css';
import '../styles/header/SearchBar.css';

const Header = ({ onSearch }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Site Logo" />
                <span>App Quizify</span>
            </div>
            {location.pathname === '/' && (
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Поиск опросов"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="search-input"
                    />
                </div>
            )}
            <nav className="nav">
                <a href="/">Home</a>
                <a href="/create">Create</a>
                <a href="/delete">Delete</a>
                <a href="/edit">Edit</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/profile">Profile</a>
                <a href="#logout" onClick={handleLogout}>Logout</a>
            </nav>
        </header>
    );
};

export default Header;
