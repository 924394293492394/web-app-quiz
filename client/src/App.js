import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import PassagePage from './pages/PassageQuiz';
import DeleteQuiz from './pages/DeleteQuiz';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/create" 
          element={
            <PrivateRoute>
              <CreateQuiz />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/quiz/:id" 
          element={
            <PrivateRoute>
              <PassagePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/delete" 
          element={
            <PrivateRoute>
              <DeleteQuiz />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
