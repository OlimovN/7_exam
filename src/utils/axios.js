import axios from 'axios';

const CLIENT_ID = "bccf8c1a5c48453287736a546c4c48d5";
const CLIENT_SECRET = "4b3db2d586414d4287e00691aeaf7ce1";

const getToken = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
      },
      body: 'grant_type=client_credentials',
    });

    const auth = await response.json();
    const token = `${auth.token_type} ${auth.access_token}`;

    if (token) {
      localStorage.setItem('access_token', token); 
      localStorage.setItem('token_expiry', Date.now() + auth.expires_in * 1000); 
    } else {
      console.log('Token topilmadi');
    }

    return token;
  } catch (err) {
    console.error('Token olishda xato:', err);
  }
};

const instance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

  instance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('access_token');
    const tokenExpiry = localStorage.getItem('token_expiry');


    if (!token || Date.now() > tokenExpiry) {
      console.log('Tokenni yangilash kerak');
      token = await getToken();  
    }

    if (token) {
      config.headers['Authorization'] = token; 
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
