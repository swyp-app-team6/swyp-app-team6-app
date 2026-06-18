import { API } from '@/shared/api/client';
import useAuthStore from '@/entities/user/model/authStore';
import { refreshTokens } from '@/entities/user/api/authApi';

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

/**
 * # interceptor
 * ---
 * - 간단설명: axios 요청/응답 인터셉터 초기화
 * - 제약사항 및 특이사항:
 *   - 앱 시작 시 1회만 호출
 *   - 401 응답 시 자동으로 토큰 갱신 시도
 *   - 동시 요청 실패 시 큐에 저장 후 갱신 완료 후 재시도
 * ---
 * @example
 * interceptor(); // QueryProvider에서 호출
 */
export const interceptor = () => {
  API.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
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
        processQueue(null, data.access_token);
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
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
};
