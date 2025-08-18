import axios from 'axios';
import { baseURL } from '@/config/api';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { useAccountStore } = await import('@/stores/account');
        const accountStore = useAccountStore();
        const newToken = await accountStore.refreshAccessToken();
        
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuthToken();
        clearRefreshToken();
        window.location.href = '/account/auth';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const getAuthToken = () => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('tspadmin.token='));
  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }
  return null;
};

const getRefreshToken = () => {
  const cookies = document.cookie.split(';');
  const refreshTokenCookie = cookies.find(cookie => cookie.trim().startsWith('tspadmin.refreshToken='));
  if (refreshTokenCookie) {
    return refreshTokenCookie.split('=')[1];
  }
  return null;
};

const clearAuthToken = () => {
  document.cookie = 'tspadmin.token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

const clearRefreshToken = () => {
  document.cookie = 'tspadmin.refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export default apiClient;