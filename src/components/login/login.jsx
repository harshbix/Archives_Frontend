import React, { useEffect, useState } from "react";
import "./login.css";

const Login = ({ onLoginSuccess }) => {
    const [isSignup, setIsSignup] = useState(false);

    const [loginData, setLoginData] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        fetch("/login.json")
            .then(res => res.json())
            .then(data => setLoginData(data))
            .catch(err => console.error("Failed to fetch login data", err));
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password || !role) {
            setErrorMessage("Please fill in all fields and select a role");
            return;
        }

        const user = loginData.find(user =>
            user.email === email &&
            user.password === password &&
            user.role === role
        );

        if (user) {
            setWelcomeMessage(`Welcome ${user.role}`);
            clearMessages();
            resetForm();
            onLoginSuccess(user.role); // pass role to App
        } else {
            setErrorMessage("Wrong credentials, please try again!");
        }

        console.log("Login Attempt:", email, password, role);
    };

    const handleSignup = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password || !confirmPassword || !course || !year || !role) {
            setErrorMessage("Please fill in all signup fields");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        setWelcomeMessage(`Account created for ${firstName} ${lastName}`);
        clearMessages();
        setIsSignup(false);
        resetForm();

        console.log("Signed up:", firstName, lastName, email, password, course, year, role);
    };

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCourse("");
        setYear("");
        setRole("");
    };

    const clearMessages = () => {
        setErrorMessage("");
        setWelcomeMessage("");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">{isSignup ? "Create Account" : "Access Account"}</h1>
                <p className="login-subtitle">{isSignup ? "Sign up to continue" : "Access your dashboard"}</p>

                <form onSubmit={isSignup ? handleSignup : handleLogin}>
                    {isSignup && (
                        <>
                            <input type="text" placeholder="First Name" className="login-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <input type="text" placeholder="Last Name" className="login-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </>
                    )}

                    <input type="email" placeholder="Your email address" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter your password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {isSignup && (
                        <input type="password" placeholder="Confirm Password" className="login-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    )}

                    {isSignup && (
                        <>
                            <input type="text" placeholder="Course" className="login-input" value={course} onChange={(e) => setCourse(e.target.value)} />
                            <input type="text" placeholder="Academic Year (e.g., 2024/2025)" className="login-input" value={year} onChange={(e) => setYear(e.target.value)} />
                        </>
                    )}

                    <select className="login-input-select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="" disabled hidden>Select your role</option>
                        <option value="lecturer">lecturer</option>
                        <option value="student">student</option>
                    </select>

                    {!isSignup && (
                        <div className="login-remember-me">
                            <a href="#" className="login-link">Forgot your Password?</a>
                        </div>
                    )}

                    <button type="submit" className="login-button">
                        {isSignup ? "Sign Up" : "Log In"}
                    </button>
                </form>

                {errorMessage && <p style={{ marginTop: "20px", color: "crimson", textAlign: "center" }}>{errorMessage}</p>}
                {welcomeMessage && <p style={{ marginTop: "20px", color: "green", textAlign: "center" }}>{welcomeMessage}</p>}

                <p className="login-footer">
                    {isSignup ? (
                        <>Already have an account?{" "}
                            <button className="login-link" onClick={() => { setIsSignup(false); clearMessages(); resetForm(); }} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
                                Log In
                            </button>
                        </>
                    ) : (
                        <>Need to create an account?{" "}
                            <button className="login-link" onClick={() => { setIsSignup(true); clearMessages(); resetForm(); }} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
                                Sign Up
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Login;
