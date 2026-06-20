import axiosInstance from 'axios'; 
import { getToken, getFingerprint, removeToken } from '../utils/storage';

const api = axiosInstance.create({
  baseURL: 'https://be-cognijob.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Otomatis tempel token di setiap request + Cek Hijacking
api.interceptors.request.use((config) => {
  const token = getToken(); 
  const savedFingerprint = getFingerprint(); 
  const currentBrowser = btoa(navigator.userAgent); 

  // 🔦 LAMPU SENTER DETEKSI (Akan muncul di F12 -> Console browser penyerang)
  console.log("=== 🛡️ INTERCEPTOR CEK HIJACKING ===");
  console.log("• URL Request:", config.url);
  console.log("• Token di Storage:", token ? "ADA" : "KOSONG");
  console.log("• Fingerprint di Storage (Copas):", savedFingerprint);
  console.log("• Fingerprint Browser Saat Ini:", currentBrowser);
  console.log("• Apakah Berbeda?:", savedFingerprint !== currentBrowser);
  console.log("=====================================");

  // 🛡️ Eksekusi Blokir jika token dibajak
  if (token && savedFingerprint && savedFingerprint !== currentBrowser) {
    alert("⚠️ Deteksi Ancaman: Sesi kamu dicurigai telah dibajak dari browser lain!");
    
    removeToken(); 
    localStorage.clear(); 
    
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