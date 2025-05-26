import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    reg_number: '',
    year_of_study: '',
    employee_number: '',
    department: '',
    title: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsSignUp(prev => !prev);
    setError('');
    setFormData({
      full_name: '',
      email: '',
      reg_number: '',
      year_of_study: '',
      employee_number: '',
      department: '',
      title: '',
      password: '',
      password2: '',
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (isSignUp && formData.password !== formData.password2) {
      return setError('Passwords do not match.');
    }

    if (!isSignUp) {
      // Handle mock login using login.json
      try {
        const response = await fetch('/login.json');
        const users = await response.json();

        const user = users.find(
          (u) => u.email === formData.email && u.password === formData.password
        );

        if (!user) {
          setError('Invalid email or password.');
          return;
        }

        const { role } = user;
        localStorage.setItem('role', role);

        if (onLoginSuccess) onLoginSuccess(role);

        if (role === 'student') {
          navigate('/student');
        } else if (role === 'lecturer') {
          navigate('/upload');
        } else {
          setError('Unknown role.');
        }
      } catch (err) {
        setError('Failed to load login data.');
        console.error(err);
      }

      return;
    }

    // Placeholder for sign-up action
    alert('Mock sign-up successful! (No actual data saved)');
    toggleMode(); // Switch back to login after sign-up
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <p className="login-subtitle">{isSignUp ? 'Create an account' : 'Welcome back!'}</p>

        {error && <div className="login-error">{error}</div>}

        {isSignUp && (
          <input
            className="login-input"
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        )}

        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          className="login-input-select"
          name="role"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
        </select>

        {isSignUp && role === 'student' && (
          <>
            <input
              className="login-input"
              type="text"
              name="reg_number"
              placeholder="Registration Number"
              value={formData.reg_number}
              onChange={handleChange}
              required
            />
            <input
              className="login-input"
              type="number"
              name="year_of_study"
              placeholder="Year of Study"
              value={formData.year_of_study}
              onChange={handleChange}
              required
            />
          </>
        )}

        {isSignUp && role === 'lecturer' && (
          <>
            <input
              className="login-input"
              type="text"
              name="employee_number"
              placeholder="Employee Number"
              value={formData.employee_number}
              onChange={handleChange}
              required
            />
            <input
              className="login-input"
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <input
              className="login-input"
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </>
        )}

        {isSignUp && (
          <input
            className="login-input"
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        )}

        <button className="login-button" type="submit">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>

        <div className="login-footer">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <span className="login-link" onClick={toggleMode}>
                Login
              </span>
            </p>
          ) : (
            <p>
              Don’t have an account?{' '}
              <span className="login-link" onClick={toggleMode}>
                Sign Up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
