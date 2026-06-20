import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken, getUser, getFingerprint, removeToken } from '../utils/storage';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = getToken();
  const user = getUser();
  let savedFingerprint = getFingerprint();
  const currentBrowser = btoa(navigator.userAgent);
  const [isHijacked, setIsHijacked] = useState(false);
  
  // Debugging log bawaan untuk memastikan data terbaca
  console.log("ProtectedRoute Debug - Token:", token);
  console.log("ProtectedRoute Debug - User:", user);

  // Eksekusi deteksi hijacking begitu komponen di-load browser
  useEffect(() => {
    // 1. Kondisi User Sah baru login (Token ada, tapi fingerprint di storage masih null)
    if (token && !savedFingerprint) {
      localStorage.setItem('browser_fingerprint', currentBrowser);
      console.log("🟢 [ProtectedRoute] Fingerprint otomatis dibuat untuk user sah.");
      return;
    }

    // 2. Kondisi Session Hijacking (Token ada, fingerprint ada/tidak, tapi tidak cocok dengan browser saat ini)
    if (token && savedFingerprint && savedFingerprint !== currentBrowser) {
      setIsHijacked(true);
      
      // Mengunci browser penyerang dengan pop-up alert native
      alert("⚠️ Deteksi Ancaman Session Hijacking: Sesi kamu tidak valid atau dicurigai telah dibajak dari browser lain!");
      
      // Hancurkan token curian saat itu juga sebelum pindah halaman
      removeToken();
      localStorage.clear();
      
      // Alihkan paksa halaman penyerang ke landing page
      window.location.href = '/';
    }
  }, [token, savedFingerprint, currentBrowser]);

  // Jika sistem mendeteksi pembajakan, stop render dan langsung potong rute
  if (isHijacked) {
    return <Navigate to="/" replace />;
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