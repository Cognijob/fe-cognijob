import axiosInstance from 'axios'; 
import { getToken, getFingerprint, removeToken } from '../utils/storage';

const api = axiosInstance.create({
  baseURL: 'https://be-cognijob.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Otomatis tempel token + Buatkan fingerprint untuk user asli saat login sukses
api.interceptors.request.use((config) => {
  const token = getToken(); 
  const savedFingerprint = getFingerprint(); 
  const currentBrowser = btoa(navigator.userAgent); 

  // Jika request ini adalah proses hit API normal dan tokennya ada tapi fingerprint belum sempat terbuat,
  // maka ini adalah fase transisi user asli setelah klik tombol login dan segera buatkan fingerprintnya
  if (token && !savedFingerprint) {
    localStorage.setItem('browser_fingerprint', currentBrowser);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;