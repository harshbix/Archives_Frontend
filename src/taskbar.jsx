import React from "react"

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
        </nav>
    )
}