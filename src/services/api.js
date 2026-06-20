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
  const savedFingerprint = getFingerprint(); // 🛡️ Ambil sidik jari yang tersimpan
  const currentBrowser = btoa(navigator.userAgent); // Sidik jari browser yang sedang dipakai sekarang

  // 🛡️ DETEKSI SESSION HIJACKING:
  // Jika token ada, tapi sidik jari browser TIDAK COCOK (artinya hasil copas ke browser lain)
  if (token && savedFingerprint !== currentBrowser) {
    alert("⚠️ Deteksi Ancaman Session Hijacking: Sesi kamu dicurigai telah dibajak dari browser lain!");
    
    // Hancurkan token curian di browser penyerang
    removeToken(); 
    localStorage.clear(); // Pastikan bersih total
    
    // Tendang balik si penyerang ke halaman utama
    window.location.href = '/'; 
    
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