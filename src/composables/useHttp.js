import { ref } from 'vue';
import axios from 'axios';
import { useAuth } from './useAuth';

const { getToken } = useAuth();

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export function useHttp() {
  const loading = ref(false);
  const error = ref(null);

  const request = async (method, url, data = null, params = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api({ method, url, data, params });
      return response.data;
    } catch (err) {
      console.log(err.response?.data?.message);
      error.value = err.response?.data?.message || 'Something went wrong';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { request, loading, error };
}
