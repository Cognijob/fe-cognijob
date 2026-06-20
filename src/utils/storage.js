const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const FINGERPRINT_KEY = 'browser_fingerprint'; // 🛡️ Tambah key sidik jari

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  // 🛡️ Otomatis simpan sidik jari browser saat token disimpan
  localStorage.setItem(FINGERPRINT_KEY, btoa(navigator.userAgent));
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getFingerprint = () => localStorage.getItem(FINGERPRINT_KEY); // 🛡️ Helper ambil fingerprint

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(FINGERPRINT_KEY); // 🛡️ Bersihkan fingerprint saat logout
};

export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = () => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};