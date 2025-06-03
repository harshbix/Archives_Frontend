import React from "react";
import { FaSearch, FaCog, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import '../../Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('role'); // optional if you're storing
    navigate('/');
    window.location.reload(); // force reset App state if needed
  };

  // Safely extract first letter of user's full_name or fallback to "?"
  const initial = user && user.full_name && user.full_name.length > 0
    ? user.full_name.charAt(0).toUpperCase()
    : "?";

  // Fallback for name and email
  const displayName = user && user.full_name ? user.full_name : "Unknown User";
  const displayEmail = user && user.email ? user.email : "No email";

  return (
    <nav className="navbar">
      <div className="logo">ARCHIVES</div>
      <div className="nav-links">
        <a href="#home" className="nav-link">HOME</a>
        <a href="#upload" className="nav-link">UPLOAD</a>
        <a href="#notification" className="nav-link">NOTIFICATION</a>
        <a href="#downloads" className="nav-link">DOWNLOADS</a>
      </div>
      <div className="search-container">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search documents..." />
        </div>
      </div>
      <div className="icons-container">
        <FaCog className="nav-icon" />
        <FaBell className="nav-icon" />
        <div className="profile" onClick={handleLogout} title="Click to log out" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="profile-avatar">{initial}</div>
          <div className="profile-info">
            <div className="profile-name">{displayName}</div>
            <div className="profile-email">{displayEmail}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
