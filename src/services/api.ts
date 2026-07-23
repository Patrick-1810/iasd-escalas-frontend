import axios from 'axios';

const defaultUrl = 'https://iasd-escalas-api.onrender.com/api';

const rawUrl = import.meta.env.VITE_API_URL || defaultUrl;
const baseURL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@IASDEscalas:token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});