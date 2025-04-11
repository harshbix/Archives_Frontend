import React, { useState } from "react";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState(""); 

    const defaultAdmin = 
    {
        "email" : "admin@gmail.com",
        "password": "1234",
        "role": "admin"
    };

    const defaultUser =
    {
        "email" : "user@gmail.com",
        "password" : "12345",
        "role" : "user"
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email||!password||!role) {
            alert("Please fill in all fields and select a role");
        }
        else if (email === defaultAdmin.email && password === defaultAdmin.password && role === "admin") {
            setWelcomeMessage("Welcome Admin");
        }
        else if (email === defaultUser.email && password === defaultUser.password && role === "user") {
            setWelcomeMessage("Welcome User");
        }
        else
        {
            setWelcomeMessage("Wrong credentials, please try again!");
        }
        console.log("Email:",email);
        console.log("Password:",password);
        console.log("Role:",role);
        
        setEmail("");
        setPassword("");
        setRole("");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Access Account</h1>
                <p className="login-subtitle">Access your dashboard</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Your email address" className="login-input" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter your password" className="login-input" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <select className="login-input-select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="" disabled>Select your role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <div className="login-remember-me">
                        <a href="#" className="login-link">Forgot your Password?</a>
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                </form>  
                {welcomeMessage && (
                    <p style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
                        {welcomeMessage}
                    </p>
                )}
                <p className="login-footer">
                    Need to create an account? <a href="#" className="login-link">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;