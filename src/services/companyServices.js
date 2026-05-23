import api from './api';

export const fetchCompanies = () => api.get('/companies');