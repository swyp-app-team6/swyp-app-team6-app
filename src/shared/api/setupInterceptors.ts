import { Alert } from 'react-native';
import { API } from './client';
import useAuthStore from '@/entities/user/model/authStore';

/**
 * # setupInterceptors
 * ---
 * - 간단설명: API 인스턴스에 인증 관련 인터셉터를 등록
 * - 제약사항 및 특이사항:
 *   - 앱 시작 시 1회만 호출해야 함
 *   - 요청 인터셉터: accessToken 자동 첨부 (skipAuth: true 시 생략)
 *   - 응답 인터셉터: 401 발생 시 refreshAccessToken()으로 토큰 갱신 후 재시도
 * ---
 * @example
 * // App.tsx 또는 앱 진입점에서
 * setupInterceptors();
 */
export function setupInterceptors() {
  /** 요청 인터셉터 — accessToken 자동 첨부 */
  API.interceptors.request.use((config) => {
    if (config.skipAuth) {
      return config;
    }

    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  /** 응답 인터셉터 — 401 시 토큰 갱신 후 재시도 */
  API.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      const { refreshAccessToken } = useAuthStore.getState();

      try {
        const newToken = await refreshAccessToken();
        originalRequest._retry = true;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    },
  );
}
