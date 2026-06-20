import axiosInstance from 'axios'; 
import { getToken, getFingerprint, removeToken } from '../utils/storage';

const api = axiosInstance.create({
  baseURL: 'https://be-cognijob.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Proteksi Berlapis khusus menangkap Hacker yang manipulasi LocalStorage
api.interceptors.request.use((config) => {
  const token = getToken(); 
  const savedFingerprint = getFingerprint(); 
  const currentBrowser = btoa(navigator.userAgent); 

  // 🛡️ PERTAHANAN LAPIS KEDUA (Menangkap Hacker yang Cuma Copas Token)
  // Jika token ada, dan request-nya BUKAN ke rute login/register, kita cek kecocokannya.
  if (token && config.url !== '/auth/login') {
    
    // Jika sidik jari di storage ternyata berbeda dengan browser saat ini,
    // (Termasuk kasus hacker yang dibuatkan fingerprint otomatis oleh Firefox tadi)
    if (savedFingerprint && savedFingerprint !== currentBrowser) {
      
      alert("⚠️ Deteksi Ancaman: Akses API ditolak, sesi kamu dicurigai telah dibajak!");
      
      removeToken();
      localStorage.clear();
      
      // Jeda sedikit agar alert sempat terbaca di Firefox sebelum halaman dilempar
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
      
      return Promise.reject(new Error("Session hijacked. Request blocked."));
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;