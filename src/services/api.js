import axiosInstance from 'axios'; 
import { getToken, getFingerprint, removeToken } from '../utils/storage';

const api = axiosInstance.create({
  baseURL: 'https://be-cognijob.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Otomatis tempel token di setiap request + Proteksi Super Ketat
api.interceptors.request.use((config) => {
  const token = getToken(); 
  const savedFingerprint = getFingerprint(); 
  const currentBrowser = btoa(navigator.userAgent); 

  // DETEKSI
  console.log("=== 🛡️ INTERCEPTOR CEK HIJACKING ===");
  console.log("• Token di Storage:", token ? "ADA" : "KOSONG");
  console.log("• Fingerprint di Storage:", savedFingerprint ? savedFingerprint : "KOSONG/NULL");
  console.log("• Fingerprint Browser Saat Ini:", currentBrowser);
  console.log("=====================================");

  // DETEKSI SESSION HIJACKING 
  // Sistem akan langsung MEMBLOKIR dan MENENDANG jika:
  // 1. Token ada, tapi fingerprint di storage kosong (Sengaja dihapus/dikurangi hacker)
  // 2. Token ada, fingerprint ada, tapi tidak cocok dengan browser saat ini (Hasil copas browser lain)
  if ((token && !savedFingerprint) || (token && savedFingerprint && savedFingerprint !== currentBrowser)) {
    alert("⚠️ Deteksi Ancaman: Sesi kamu tidak valid atau dicurigai telah dibajak!");
    
    removeToken(); 
    localStorage.clear(); 
    
    window.location.href = '/'; 
    return Promise.reject(new Error("Session hijacked or invalid. Request blocked."));
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;