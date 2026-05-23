import api from './api';

// Mengambil daftar lamaran (applications) untuk jobseeker yang sedang login
export const fetchApplications = () => api.get('/applications');

// Jika nanti ada endpoint jobseeker lain, tambahkan di sini. Contoh:
// export const fetchJobseekerProfile = () => api.get('/jobseeker/profile');