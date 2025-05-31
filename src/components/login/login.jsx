import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin, useRegister } from '../../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { setUser } from '../../hooks/useUser';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './login.css';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    username: '',
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const queryClient = useQueryClient();

  const loginMutation = useLogin({
    onSuccess: (data) => {
      const userRole = data.user?.role;
      if (!userRole) {
        setError('Login failed: role information missing.');
        return;
      }
      localStorage.setItem('role', userRole);
      setUser(queryClient, data.user);
      if (onLoginSuccess) onLoginSuccess(userRole);
      if (userRole === 'Student') {
        navigate('/student');
      } else if (userRole === 'Lecture') {
        navigate('/upload');
      } else {
        setError(`Unknown role: ${userRole}`);
      }
    },
    onError: (error) => setError(error.message),
  });

  const registerMutation = useRegister({
    onSuccess: () => {
      alert('Registration successful! Please login.');
      toggleMode();
    },
    onError: (error) => setError(error.message),
  });

  const toggleMode = () => {
    setIsSignUp(prev => !prev);
    setError('');
    setFormData({
      username: '',
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
      const dataToSend = {
        role,
        username: formData.username,
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
      };

      if (role === 'student') {
        dataToSend.reg_number = formData.reg_number;
        dataToSend.year_of_study = formData.year_of_study;
      } else if (role === 'lecture') {
        dataToSend.employee_number = formData.employee_number;
        dataToSend.department = formData.department;
        dataToSend.title = formData.title;
      }

      registerMutation.mutate(dataToSend);
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
              className={`role-button ${role === 'lecture' ? 'active' : ''}`}
              onClick={() => setRole('lecture')}
            >
              Lecture
            </button>
          </div>
        )}

        {error && <div className="login-error">{error}</div>}

        {/* Login Fields */}
        {!isSignUp && (
          <>
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="password-input-container">
              <input
                className="login-input password-input"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(prev => !prev)}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(prev => !prev); }}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </>
        )}

        {/* Sign-Up Fields (Reordered) */}
        {isSignUp && (
          <>
            <input
              className="login-input"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              className="login-input"
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {role === 'student' && (
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

            {role === 'lecture' && (
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
                <select
                  className="login-input"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science And Engineering">Computer Science And Engineering</option>
                  <option value="Information And Communication Technology">Information And Communication Technology</option>
                </select>
                <select
                  className="login-input"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Title</option>
                  <option value="Head Of Department">Head Of Department</option>
                  <option value="Lecture">Lecture</option>
                </select>
              </>
            )}

            <div className="password-input-container">
              <input
                className="login-input password-input"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(prev => !prev)}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowPassword(prev => !prev); }}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="password-input-container">
              <input
                className="login-input password-input"
                type={showConfirmPassword ? 'text' : 'password'}
                name="password2"
                placeholder="Confirm Password"
                value={formData.password2}
                onChange={handleChange}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowConfirmPassword(prev => !prev); }}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </>
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
              Don't have an account?{' '}
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
