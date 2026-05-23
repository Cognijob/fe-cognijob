import api from './api';

export const fetchApplications = () => api.get('/applications');

// Tambahkan fungsi POST untuk mengirim lamaran
export const applyJob = (data) => api.post('/applications', data);