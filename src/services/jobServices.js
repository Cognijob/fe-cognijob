import api from './api';

// ==========================================
// ENDPOINT UNTUK RECRUITER
// ==========================================
export const fetchJobs = () => api.get('/jobs');
export const createJob = (data) => api.post('/jobs', data);
export const getJobDetail = (id) => api.get(`/jobs/${id}`);
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);


// ==========================================
// ENDPOINT UNTUK JOBSEEKER
// ==========================================

// PERBAIKAN: Menggunakan garis miring (/public/jobs), bukan strip (/public-jobs)
export const fetchPublicJobs = () => api.get('/public/jobs');

// Asumsi format route-nya serupa untuk rekomendasi
export const fetchRecommendedJobs = () => api.get('/recommended/jobs');

// PERBAIKAN: Menggunakan garis miring (/public/jobs/:id)
export const getPublicJobDetail = (id) => api.get(`/public/jobs/${id}`);