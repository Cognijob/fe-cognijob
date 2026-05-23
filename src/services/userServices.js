import api from './api';

/**
 * ==========================================
 * USER & PROFILE SERVICES
 * Berdasarkan users.routes.ts
 * ==========================================
 */

// 1. Mengambil profil lengkap user (Data User + Data Jobseeker)
export const fetchUserProfile = () => {
  return api.get('/users/profile');
};

// 2. Mengambil preview profil (versi ringkas, misal untuk header/navbar)
export const fetchUserProfilePreview = () => {
  return api.get('/users/profile/preview');
};

// 3. Mengupdate data teks profil (Nama, Lokasi, Skill, Pengalaman, dll)
// Endpoint ini menerima JSON payload biasa
export const updateUserProfile = (data) => {
  return api.put('/users/profile', data);
};

// 4. Mengunggah/Memperbarui Foto Profil
// Endpoint ini HARUS menggunakan multipart/form-data karena mengirim file
export const uploadUserPhoto = (formData) => {
  return api.post('/users/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 5. Mengunggah/Memperbarui CV
// Endpoint ini HARUS menggunakan multipart/form-data dan dibatasi file PDF maks 5MB di backend
export const uploadUserCV = (formData) => {
  return api.post('/users/cv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * ==========================================
 * ACCOUNT & SECURITY SERVICES (Opsional/Tambahan)
 * ==========================================
 */

// Mengganti Password
export const changePassword = (data) => {
  // data = { currentPassword: '...', newPassword: '...' }
  return api.post('/users/change-password', data);
};

// Menghapus Akun Permanen
export const deleteAccount = () => {
  return api.delete('/users/account');
};