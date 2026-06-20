const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const FINGERPRINT_KEY = 'browser_fingerprint';

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  const fingerprint = btoa(navigator.userAgent);
  localStorage.setItem(FINGERPRINT_KEY, fingerprint);
  
  console.log("🟢 [Storage] Token & Fingerprint berhasil disimpan:", fingerprint);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getFingerprint = () => localStorage.getItem(FINGERPRINT_KEY);

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(FINGERPRINT_KEY);
  console.log("🔴 [Storage] Semua token dan fingerprint telah dibersihkan.");
};

export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = () => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};