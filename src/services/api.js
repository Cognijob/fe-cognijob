import axiosInstance from 'axios'; 
import { getToken, getFingerprint, removeToken } from '../utils/storage';

const api = axiosInstance.create({
  baseURL: 'https://be-cognijob.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Otomatis tempel token di setiap request + Lapisan Pertahanan Tambahan
api.interceptors.request.use((config) => {
  const token = getToken(); 
  const savedFingerprint = getFingerprint(); 
  const currentBrowser = btoa(navigator.userAgent); 

  // 🛡️ PERTAHANAN LAPIS KEDUA (API BLOCKER):
  // Jika diakses lewat rute dalam dan terdeteksi hijacking, langsung gagalkan request API ke backend
  if (token && savedFingerprint && savedFingerprint !== currentBrowser) {
    console.error("❌ Request blocked by interceptor due to fingerprint mismatch.");
    removeToken();
    localStorage.clear();
    return Promise.reject(new Error("Session hijacked. Request blocked."));
  }

  // Jika aman dan cocok, tempelkan token ke header authorization seperti biasa
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;