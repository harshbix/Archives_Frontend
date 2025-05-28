import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin, useRegister } from '../../hooks/useAuth';
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  // Add role state only for signup mode to fix blank signup form issue
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

  const loginMutation = useLogin({
    onSuccess: (data) => {
      localStorage.setItem('role', data.role);
      if (onLoginSuccess) onLoginSuccess(data.role);
      if (data.role === 'student') {
        navigate('/student');
      } else if (data.role === 'lecturer') {
        navigate('/upload');
      } else {
        setError('Unknown role.');
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const registerMutation = useRegister({
    onSuccess: () => {
      alert('Registration successful! Please login.');
      toggleMode();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

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

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    if (isSignUp && formData.password !== formData.password2) {
      return setError('Passwords do not match.');
    }

    if (isSignUp) {
      registerMutation.mutate({ role, ...formData });
    } else {
      loginMutation.mutate({ email: formData.email, password: formData.password });
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <p className="login-subtitle">{isSignUp ? 'Create an account' : 'Welcome back!'}</p>

        {isSignUp && (
          <div className="role-selection-buttons">
            <button
              type="button"
              className={`role-button ${role === 'student' ? 'active' : ''}`}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button
              type="button"
              className={`role-button ${role === 'lecturer' ? 'active' : ''}`}
              onClick={() => setRole('lecturer')}
            >
              Lecturer
            </button>
          </div>
        )}

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

        <button className="login-button" type="submit" disabled={loginMutation.isLoading || registerMutation.isLoading}>
          {loginMutation.isLoading || registerMutation.isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
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
