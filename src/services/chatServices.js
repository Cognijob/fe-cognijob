const API_BASE_URL = 'https://be-cognijob.vercel.app';

const getHeaders = () => ({
  'Authorization': `Bearer ${sessionStorage.getItem("token")}`, // Pastikan token tersimpan di sessionStorage
  'Content-Type': 'application/json'
});

// GET: Daftar percakapan (untuk sidebar kiri)
export const getConversations = async () => {
  const response = await fetch(`${API_BASE_URL}/conversations`, {
    method: 'GET',
    headers: getHeaders()
  });
  return response.json();
};

// POST: Buat percakapan baru (dipanggil saat klik 'Kirim Pesan' di ApplicantDetail)
export const createConversation = async (applicationId) => {
  const response = await fetch(`${API_BASE_URL}/conversations`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ applicationId })
  });
  return response.json();
};

// GET: Ambil pesan dalam percakapan (sesuai dokumentasi /conversations/:id/messages?limit=50)
export const getMessages = async (conversationId, limit = 50) => {
  const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages?limit=${limit}`, {
    method: 'GET',
    headers: getHeaders()
  });
  return response.json();
};

// POST: Kirim pesan
export const sendMessage = async (conversationId, body) => {
  const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ body })
  });
  return response.json();
};