const API_BASE_URL = 'https://be-cognijob.vercel.app';

const getHeaders = () => ({
  'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
  'Content-Type': 'application/json'
});

export const getCompany = async () => {
  const res = await fetch(`${API_BASE_URL}/company/profile`, { headers: getHeaders() });
  return res.json();
};

export const updateCompany = async (data) => {
  const res = await fetch(`${API_BASE_URL}/company/profile`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
};

export const uploadCompanyLogo = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/company/logo`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` },
    body: formData
  });
  return res.json();
};