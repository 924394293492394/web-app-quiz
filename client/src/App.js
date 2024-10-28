import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import PassagePage from './pages/PassageQuiz';
import DeleteQuiz from './pages/DeleteQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/quiz/:id" element={<PassagePage />} />
        <Route path="/delete" element={<DeleteQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
