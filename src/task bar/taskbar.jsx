import React from "react"
import { Fasearch, FaBell, FaCog } from "react-icons/fa"

const Navbar = () => {
    return(
        <nav className = "navbar">
            <div className = "navbar-left">
                <h2 className = "logo">Archives</h2>
                <ul className = "nav-links">
                    <li className = "active">Home</li>
                    <li>Inbox</li>
                    <li>Profile</li>
                    <li>Downloads</li>
                </ul>
            </div>
            <div className = "navbar-right">
                <Fasearch className = "icon" />
                <FaCog className = "icon" />
                <FaBell className = "icon" />
                <img
                src = "https://viaplaceholder.com/30"
                alt = "Profile"
                className = "profile-img" 
                />
            </div>
        </nav>
    )
}