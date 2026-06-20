import axiosInstance from 'axios'; 
import { getToken, getFingerprint, removeToken } from '../utils/storage';

const api = axiosInstance.create({
  baseURL: 'https://be-cognijob.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Otomatis tempel token di setiap request + Proteksi Otomatis
api.interceptors.request.use((config) => {
  const token = getToken(); 
  let savedFingerprint = getFingerprint(); 
  const currentBrowser = btoa(navigator.userAgent); 

  // 🛡️ TRICK SAPU JAGAT:
  // Jika user asli baru login (token ada tapi fingerprint di storage masih kosong)
  // Maka otomatis buatkan fingerprint asli browser tersebut di storage saat itu juga!
  if (token && !savedFingerprint) {
    localStorage.setItem('browser_fingerprint', currentBrowser);
    savedFingerprint = currentBrowser; // update variabel untuk pengecekan di bawah
    console.log("🟢 [Sapu Jagat] Fingerprint otomatis dibuat untuk browser asli:", currentBrowser);
  }

  // 🔦 LAMPU SENTER DETEKSI
  console.log("=== 🛡️ INTERCEPTOR CEK HIJACKING ===");
  console.log("• Token di Storage:", token ? "ADA" : "KOSONG");
  console.log("• Fingerprint di Storage (Bawaan):", savedFingerprint);
  console.log("• Fingerprint Browser Saat Ini:", currentBrowser);
  console.log("• Apakah Berbeda?:", savedFingerprint !== currentBrowser);
  console.log("=====================================");

  // 🛡️ DETEKSI SESSION HIJACKING (Otomatis Aktif Tanpa Manual)
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