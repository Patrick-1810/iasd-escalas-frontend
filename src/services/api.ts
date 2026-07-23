import axios from 'axios';

const RENDER_BASE_URL = 'https://iasd-escalas-api.onrender.com';

const envUrl = import.meta.env.VITE_API_URL;
const isLocalhost = !envUrl || envUrl.includes('localhost');

const baseUrlTarget = isLocalhost ? RENDER_BASE_URL : envUrl;
const baseURL = baseUrlTarget.endsWith('/api') 
  ? baseUrlTarget 
  : `${baseUrlTarget.replace(/\/$/, '')}/api`;

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