import * as Sentry from '@sentry/react-native';
import { API } from './client';
import useAuthStore from '@/entities/user/model/authStore';
import useConditionStateStore from '@/shared/model/conditionStateStore';
import useApiLogStore, { type ApiLogEntry } from '@/shared/model/apiLogStore';

/**
 * # setupInterceptors
 * ---
 * - 간단설명: API 인스턴스에 인증 관련 인터셉터를 등록
 * - 제약사항 및 특이사항:
 *   - 앱 시작 시 1회만 호출해야 함
 *   - 요청 인터셉터: accessToken 자동 첨부 (skipAuth: true 시 생략)
 *   - 응답 인터셉터: 401 발생 시 refreshAccessToken()으로 토큰 갱신 후 재시도
 *   - 토큰 갱신 실패 시 토큰 제거, 조건 플래그 초기화, 로그인 화면으로 이동
 * ---
 * @example
 * // App.tsx 또는 앱 진입점에서
 * setupInterceptors();
 */
/** 로그 ID 생성용 카운터 */
let logIdCounter = 0;

export function setupInterceptors() {
  /** 요청 인터셉터 — accessToken 자동 첨부 + 로그용 타임스탬프 기록 */
  API.interceptors.request.use((config) => {
    config._logId = String(++logIdCounter);
    config._startTime = Date.now();

    if (config.skipAuth) {
      return config;
    }

    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  /** 응답 인터셉터 — 성공 로그 수집 */
  API.interceptors.response.use(
    (response) => {
      const config = response.config;
      const entry: ApiLogEntry = {
        id: config._logId ?? String(++logIdCounter),
        timestamp: config._startTime ?? Date.now(),
        method: (config.method ?? 'GET').toUpperCase(),
        url: (config.baseURL ?? '') + (config.url ?? ''),
        status: response.status,
        duration: Date.now() - (config._startTime ?? Date.now()),
        request: {
          headers: config.headers as unknown as Record<string, string>,
          params: config.params,
          data: config.data,
        },
        response: {
          headers: response.headers as unknown as Record<string, string>,
          data: response.data,
        },
        error: null,
      };
      useApiLogStore.getState().addLog(entry);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      /** 에러 로그 수집 (401 재시도 전에도 기록) */
      if (originalRequest && !originalRequest._logRecorded) {
        originalRequest._logRecorded = true;
        const entry: ApiLogEntry = {
          id: originalRequest._logId ?? String(++logIdCounter),
          timestamp: originalRequest._startTime ?? Date.now(),
          method: (originalRequest.method ?? 'GET').toUpperCase(),
          url: (originalRequest.baseURL ?? '') + (originalRequest.url ?? ''),
          status: error.response?.status ?? null,
          duration: Date.now() - (originalRequest._startTime ?? Date.now()),
          request: {
            headers: originalRequest.headers as unknown as Record<string, string>,
            params: originalRequest.params,
            data: originalRequest.data,
          },
          response: error.response
            ? {
              headers: error.response.headers as unknown as Record<string, string>,
              data: error.response.data,
            }
            : null,
          error: error.message ?? 'Unknown error',
        };
        useApiLogStore.getState().addLog(entry);
      }

      Sentry.captureException(error, {
        extra: {
          method: (originalRequest?.method ?? 'GET').toUpperCase(),
          url: (originalRequest?.baseURL ?? '') + (originalRequest?.url ?? ''),
          status: error.response?.status ?? null,
          requestBody: originalRequest?.data ?? null,
          responseBody: error.response?.data ?? null,
        },
      });

      if (error.response?.status !== 401 || originalRequest._retry || originalRequest.skipAuth) {
        return Promise.reject(error);
      }

      const { refreshAccessToken } = useAuthStore.getState();

      try {
        const newToken = await refreshAccessToken();
        originalRequest._retry = true;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        const { clear } = useAuthStore.getState();
        await clear();
        await useConditionStateStore.getState().clearAll();

        return Promise.reject(refreshError);
      }
    },
  );
}
