import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaCog, FaBell, FaUserCircle } from "react-icons/fa";
import '../../Navbar.css';

const Navbar = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        
        <div className="profile" ref={dropdownRef}>
          <FaUserCircle className="profile-icon" onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
          
          {showDropdown && (
            <div className="dropdown-menu">
              <button className="dropdown-item">View Profile</button>
              <button className="dropdown-item" onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
