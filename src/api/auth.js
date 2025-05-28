import apiClient from './apiClient';

// Base URLs for registration endpoints
const BASE_URL = apiClient.defaults.baseURL || 'http://127.0.0.1:8000/api';
export const STUDENT_REGISTER_URL = `${BASE_URL}/student/register`;
export const LECTURER_REGISTER_URL = `${BASE_URL}/lecture/register`;

export const loginApi = async ({ email, password, role }) => {
  let url = '';
  if (role === 'student') {
    url = '/student/login';
  } else if (role === 'lecturer') {
    url = '/lecture/login';
  } else {
    url = `/login/${role}`;
  }
  try {
    const response = await apiClient.post(url, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerApi = async (data) => {
  // Determine the registration URL based on the user role
  const { role, ...rest } = data;
  let url = '';
  if (role === 'student') {
    // API endpoint for student registration
    url = STUDENT_REGISTER_URL;
  } else if (role === 'lecturer') {
    // API endpoint for lecturer registration
    url = LECTURER_REGISTER_URL;
  } else {
    url = `/register/${role}`;
  }
  try {
    const response = await apiClient.post(url, rest);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};
