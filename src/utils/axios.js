import axios from 'axios';

const http = axios.create({
  baseURL: 'https://frontend-mentor-apis-6efy.onrender.com',
  timeout: 5000,
});


http.interceptors.request.use(
  (config) => {
    
    config.headers['Authorization'] = 'Bearer your-token-here';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
