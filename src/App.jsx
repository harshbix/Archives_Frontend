import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import UploadPage from './components/upload/uploadPage';
import HomePage from './components/homePage/homePage';


function App() {
  const [loggedInRole, setLoggedInRole] = useState(() => {
    return localStorage.getItem("role");
  });

  const handleLoginSuccess = (role) => {
    localStorage.setItem("role", role);
    setLoggedInRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    setLoggedInRole(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedInRole === "lecturer" ? (
              <Navigate to="/upload" />
            ) : loggedInRole === "student" ? (
              <Navigate to="/student" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/upload"
          element={
            loggedInRole === "lecturer" ? (
              <UploadPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/student"
          element={
            loggedInRole === "student" ? (
                <div>
                  <HomePage onLogout={handleLogout} />
                </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
