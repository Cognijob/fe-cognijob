import api from './api';

// Mengambil daftar semua percakapan
export const fetchConversations = () => api.get('/conversations');

// Mengambil detail percakapan beserta pesan (dengan pagination)
export const fetchConversationMessages = (id, page = 1, limit = 50) => 
  api.get(`/conversations/${id}?page=${page}&limit=${limit}`);

// Mengirim pesan baru ke percakapan tertentu
export const sendMessage = (id, body) => 
  api.post(`/conversations/${id}/messages`, { body });

// Menandai pesan di dalam percakapan sebagai sudah dibaca
export const markConversationRead = (id) => 
  api.patch(`/conversations/${id}/read`);
