import axios from 'axios';

const apiClient = axios.create({
  // Base URL for API requests, update to point to local backend server
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default apiClient;
