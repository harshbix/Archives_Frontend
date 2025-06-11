import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/login';
import UploadPage from './components/upload/uploadPage';
import HomePage from './components/homePage/homePage';
import DocumentViewer from './components/homePage/DocumentViewer'; // New import

function App() {
  const [loggedInRole, setLoggedInRole] = useState(() => {
    return localStorage.getItem("role") || null;
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
        {/* Existing routes (unchanged) */}
        <Route
          path="/"
          element={
            loggedInRole === "Lecture" ? (
              <Navigate to="/upload" />
            ) : loggedInRole === "Student" ? (
              <Navigate to="/student" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/upload"
          element={
            loggedInRole === "Lecture" ? (
              <UploadPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/student"
          element={
            loggedInRole === "Student" ? (
              <div>
                <HomePage onLogout={handleLogout} />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        
        {/* New document viewer route - accessible to both roles */}
        <Route
          path="/documents/:documentId"
          element={
            loggedInRole ? ( // Any authenticated user
              <DocumentViewer onLogout={handleLogout} />
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