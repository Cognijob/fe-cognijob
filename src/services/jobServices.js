import api from './api';

// ==========================================
// ENDPOINT UNTUK RECRUITER
// ==========================================
export const fetchJobs = () => api.get('/jobs');
export const createJob = (data) => api.post('/jobs', data);
export const getJobDetail = (id) => api.get(`/jobs/${id}`);
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);

// TAMBAHKAN BARIS INI: Untuk mengambil daftar pelamar di suatu pekerjaan
export const getJobApplicants = (jobId) => api.get(`/jobs/${jobId}/applicants`);
export const getApplicantDetail = (applicationId) => api.get(`/applications/${applicationId}/detail`);
export const updateApplicantStatus = (applicationId, status) => api.patch(`/applications/${applicationId}/status`, { status });

// ==========================================
// ENDPOINT UNTUK JOBSEEKER
// ==========================================
export const fetchPublicJobs = () => api.get('/public/jobs');
export const fetchRecommendedJobs = () => api.get('/recommended/jobs');
export const getPublicJobDetail = (id) => api.get(`/public/jobs/${id}`);
