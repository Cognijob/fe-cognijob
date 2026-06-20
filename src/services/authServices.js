import axios from 'axios';
import { saveToken, saveUser } from '../utils/storage';

const api = axios.create({
  baseURL: 'https://be-cognijob.vercel.app/' 
});

// Helper
const handleAuthResponse = (response) => {
  const data = response.data;
  if (data.token) {
    saveToken(data.token); // 🛡️ Di sini sidik jari browser otomatis ikut tersimpan aman
  }
  const user = data.data?.user || data.user;
  if (user) {
    saveUser(user);
  }
  return data;
};

export const registerJobSeeker = async (userData) => {
  const response = await api.post('/auth/register/job-seeker', userData);
  return handleAuthResponse(response);
};

export const registerRecruiter = async (userData) => {
  const response = await api.post('/auth/register/recruiter', userData);
  return handleAuthResponse(response);
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    // Simpan token
    if (response.data.token) {
        saveToken(response.data.token); // 🛡️ Gunakan helper bawaan agar sinkron
    }
    return handleAuthResponse(response); 
  } catch (error) {
    throw error;
  }
};