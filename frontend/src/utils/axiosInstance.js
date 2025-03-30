import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


// Add a request interceptor to include the token in headers if available


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error responses here if needed
    if (error.response) {
       if(error.response.status === 401) {
        window.location.href = '/login'; // Redirect to login page
       }
       else if (error.response.status === 500) {
        console.error('Server error, Try again later');
       }
       else if (error.code === "ECONNABORTED") {
        console.error('Request timeout, Try again later');
       }  
    } 
    return Promise.reject(error);
  }
);

export default axiosInstance;