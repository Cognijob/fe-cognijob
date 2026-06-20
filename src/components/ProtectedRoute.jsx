import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken, getUser, getFingerprint, removeToken } from '../utils/storage';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = getToken();
  const user = getUser();
  const savedFingerprint = getFingerprint();
  const currentBrowser = btoa(navigator.userAgent);

  // Debugging log bawaan
  console.log("ProtectedRoute Debug - Token:", token);
  console.log("ProtectedRoute Debug - User:", user);

  // 🛡️ EKSEKUSI PERTAHANAN 
  if (token) {
    // Kasus 1: User asli baru login (Fingerprint di storage masih kosong)
    if (!savedFingerprint) {
      localStorage.setItem('browser_fingerprint', currentBrowser);
      console.log("🟢 [ProtectedRoute] Fingerprint otomatis dibuat untuk user sah.");
    } 
    // Kasus 2: Session Hijacking (Fingerprint tidak cocok dengan browser saat ini!)
    else if (savedFingerprint !== currentBrowser) {
      // 1. Kunci browser penyerang dengan alert (Ini akan menghentikan semua proses lain)
      alert("⚠️ Deteksi Ancaman: Sesi kamu tidak valid atau dicurigai telah dibajak dari browser lain!");
      
      // 2. Bersihkan token curian detik itu juga
      removeToken();
      localStorage.clear();
      
      // 3. Paksa refresh dan tendang ke landing page
      window.location.href = '/';
      return null;
    }
  }

  // Jika tidak ada token, paksa ke login (Bawaan)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Cek apakah role user ada dalam daftar allowedRoles (Bawaan)
  const userRole = user?.role;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // Jika semua lolos, tampilkan halaman (Bawaan)
  return <Outlet />;
}; 

export default ProtectedRoute;