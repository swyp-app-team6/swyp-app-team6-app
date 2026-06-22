import axios from "axios";
import Config from "react-native-config";
import useAuthStore from '@/entities/user/model/authStore';
import { refreshTokens } from '@/entities/user/api/authApi';
import { Alert } from 'react-native';

// TODO: 여기 리팩토링

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
}


export const API = axios.create({
  baseURL: Config.API_URL,
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  Alert.alert(accessToken || '');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return API(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const { refreshToken, setTokens, clear } = useAuthStore.getState();

    if (!refreshToken) {
      clear();
      return Promise.reject(error);
    }

    try {
      const { data } = await refreshTokens(refreshToken);
      setTokens(data);
      processQueue(null, data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return API(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clear();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);