import axios from 'react'; // pastikan impor axios tetap ada
import axiosInstance from 'axios'; 
import { getToken, getFingerprint, removeToken } from '../utils/storage'; // 🛡️ Impor helper pengaman

const api = axiosInstance.create({
  baseURL: 'https://be-cognijob.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Otomatis tempel token di setiap request + Cek Hijacking
api.interceptors.request.use((config) => {
  const token = getToken(); 
  const savedFingerprint = getFingerprint(); // Ambil sidik jari yang tersimpan
  const currentBrowser = btoa(navigator.userAgent); // Sidik jari browser saat ini

  // 🛡️ PERBAIKAN PENGAMAN HIJACKING:
  // Pastikan token HARUS ADA dulu, dan savedFingerprint HARUS ADA, baru dibandingkan
  if (token && savedFingerprint && savedFingerprint !== currentBrowser) {
    alert("⚠️ Deteksi Ancaman: Sesi kamu dicurigai telah dibajak dari browser lain!");
    
    // Hancurkan token curian di browser penyerang
    removeToken(); 
    localStorage.clear(); 
    
    // Tendang balik si penyerang ke halaman utama
    window.location.href = '/'; 
    
    return Promise.reject(new Error("Session hijacked. Request blocked."));
  }

  // Jika token ada (dan lolos pengecekan sidik jari), tempelkan ke header API
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;