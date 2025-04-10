import React from "react";
import "./login.css";

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Access Account</h1>
                <p className="login-subtitle">Access your dashboard</p>
                <form>
                    <input type="email" placeholder="Your email address" className="login-input" />
                    <input type="password" placeholder="Enter your password" className="login-input" />
                    <select className="login-input-select" defaultValue="">
                        <option value="" disabled>Select your role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <div className="login-remember-me">
                        <a href="#" className="login-link">Forgot your Password?</a>
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                </form>
                <p className="login-footer">
                    Need to create an account? <a href="#" className="login-link">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;