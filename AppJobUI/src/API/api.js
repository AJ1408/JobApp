// src/api.js
import axios from 'axios';

const api = axios.create({
  // This line tells Axios where your backend is located
  baseURL: 'http://localhost:8080', 
});

// This interceptor will automatically add your JWT token to future requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;