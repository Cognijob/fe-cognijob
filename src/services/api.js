import axiosInstance from 'axios'; 
import { getToken, getFingerprint, removeToken } from '../utils/storage';

const api = axiosInstance.create({
  baseURL: 'https://be-cognijob.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor agar otomatis tempel token di setiap request + Proteksi  + Alert Penahan
api.interceptors.request.use((config) => {
  const token = getToken(); 
  let savedFingerprint = getFingerprint(); 
  const currentBrowser = btoa(navigator.userAgent); 

  // Amankan user asli saat baru login
  if (token && !savedFingerprint) {
    localStorage.setItem('browser_fingerprint', currentBrowser);
    savedFingerprint = currentBrowser;
    console.log("🟢 [Keamanan] Fingerprint otomatis dibuat untuk user sah.");
  }

  // DETEKSI SESSION HIJACKING DENGAN ALERT
  if (token && savedFingerprint && savedFingerprint !== currentBrowser) {
    
    // Muncul alert dicurigai session hijacking
    alert("⚠️ Deteksi Ancaman Session Hijacking: Sesi kamu tidak valid atau dicurigai telah dibajak dari browser lain!");
    
    // Fungsi menghancurkan token curian di browser penyerang
    removeToken(); 
    localStorage.clear(); 
    
    // Ada jeda 100ms agar alert ditampilkan/dirender sebelum dilempar ke landing page
    setTimeout(() => {
      window.location.href = '/'; 
    }, 100);
    
    return Promise.reject(new Error("Session hijacked. Request blocked."));
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;