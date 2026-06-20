import axiosInstance from 'axios'; 
import { getToken, getFingerprint, removeToken } from '../utils/storage';

const api = axiosInstance.create({
  baseURL: 'https://be-cognijob.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Otomatis tempel token di setiap request + Proteksi 
api.interceptors.request.use((config) => {
  const token = getToken(); 
  let savedFingerprint = getFingerprint(); 
  const currentBrowser = btoa(navigator.userAgent); 

  // 🛡️ AMANKAN USER ASLI SAAT LOGIN:
  // Jika token ada di storage, tapi fingerprint-nya masih kosong,
  // artinya ini adalah USER ASLI yang baru saja sukses melakukan login.
  // Kita otomatis buatkan sidik jari asli browsernya di storage saat itu juga.
  if (token && !savedFingerprint) {
    localStorage.setItem('browser_fingerprint', currentBrowser);
    savedFingerprint = currentBrowser; // Perbarui variabel untuk pengecekan di bawah
    console.log("🟢 [Keamanan] Fingerprint otomatis dibuat untuk user sah.");
  }

  // CEK/DETEKSI
  console.log("=== 🛡️ INTERCEPTOR CEK HIJACKING ===");
  console.log("• Token di Storage:", token ? "ADA" : "KOSONG");
  console.log("• Fingerprint di Storage:", savedFingerprint);
  console.log("• Fingerprint Browser Saat Ini:", currentBrowser);
  console.log("=====================================");

  // ETEKSI SESSION HIJACKING (PINTAR & AKURAT)
  // Alert hanya akan meledak jika token ada, fingerprint ada, TAPI tidak cocok dengan browser saat ini!
  if (token && savedFingerprint && savedFingerprint !== currentBrowser) {
    alert("⚠️ Deteksi Ancaman: Sesi kamu tidak valid atau dicurigai telah dibajak dari browser lain!");
    
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