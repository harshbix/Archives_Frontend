import apiClient from './apiClient';

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
  const { role, ...rest } = data;
  let url = '';
  if (role === 'student') {
    url = '/student/register';
  } else if (role === 'lecturer') {
    url = '/lecture/register';
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
