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

  // 🛡️ EKSEKUSI PERTAHANAN MULTIMODE (TOP-LEVEL)
  if (token) {
    // SKENARIO ANCAMAN A: Hacker cuma copas token (fingerprint sengaja dikosongkan/null)
    // SKENARIO ANCAMAN B: Hacker copas paket lengkap (tapi sidik jarinya milik browser korban)
    if (!savedFingerprint || savedFingerprint !== currentBrowser) {
      
      // 1. Kunci layar browser penyerang dengan alert native
      alert("⚠️ Deteksi Ancaman Session Hijacking: Sesi kamu tidak valid atau dicurigai telah dibajak!");
      
      // 2. Bersihkan token curian detik itu juga dari browser penyerang
      removeToken();
      localStorage.clear();
      
      // 3. Paksa refresh penuh untuk menendang penyerang ke landing page
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