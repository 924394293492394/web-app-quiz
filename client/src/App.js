import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import CreateQuiz from './pages/CreateQuiz';
import PassagePage from './pages/PassageQuiz';
import DeleteQuiz from './pages/DeleteQuiz';
import SelectQuizToEditPage from './pages/SelectQuizToEditPage';
import EditQuizPage from './pages/EditQuiz';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';

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
        <Route
          path="/edit"
          element={
            <PrivateRoute>
              <SelectQuizToEditPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditQuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
