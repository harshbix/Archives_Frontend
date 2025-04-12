import React from "react";
import { FaSearch, FaBell, FaCog, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Archives</h2>
        <div className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#">Inbox</a>
          <a href="#">Profile</a>
          <a href="#">Downloads</a>
        </div>
      </div>

      <div className="navbar-right">
      {menuActive && (
          <>
            <FaSearch className="icon" />
            <FaCog className="icon" />
            <FaBell className="icon" />
          </>
        )}

        {menuActive ? (
          <FaTimes
            className="icon menu-icon"
            onClick={() => setMenuActive(false)}
          />
        ) : (
          <FaBars
            className="icon menu-icon"
            onClick={() => setMenuActive(true)}
          />
        )}     
        <img
          src="https://via.placeholder.com/30"
          alt="Profile"
          className="profile-img"
        />
      </div>
    </nav>
  );
};

export default Navbar;
