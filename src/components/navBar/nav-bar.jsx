import React from "react";
import { FaSearch, FaCog, FaBell, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
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
        <div className="profile">
          <FaUserCircle className="profile-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
