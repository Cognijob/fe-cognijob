// src/services/jobServices.js
import api from './api'; // Pastikan import dari api.js, bukan dari 'axios' langsung

export const fetchJobs = () => api.get('/jobs');
export const createJob = (data) => api.post('/jobs', data);
export const getJobDetail = (id) => api.get(`/jobs/${id}`);
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);