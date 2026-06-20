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

  // PERTAHANAN DEPAN
  if (token) {
    // KASUS A: Jika user asli baru login (fingerprint masih kosong/null)
    // maka akan dibuatkan secara otomatis agar dia bisa masuk 
    if (!savedFingerprint) {
      localStorage.setItem('browser_fingerprint', currentBrowser);
      console.log("🟢 [ProtectedRoute] Fingerprint otomatis dibuat untuk user sah.");
    } 
    // KASUS B: Hacker copas paket lengkap (fingerprint ada, tapi punya browser korban)
    else if (savedFingerprint !== currentBrowser) {
      alert("⚠️ Deteksi Ancaman: Sesi kamu tidak valid atau dicurigai telah dibajak dari browser lain!");
      removeToken();
      localStorage.clear();
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

  return <Outlet />;
}; 

export default ProtectedRoute;