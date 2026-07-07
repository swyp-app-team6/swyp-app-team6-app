import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import EncryptedStorage from 'react-native-encrypted-storage';
import type { User, AuthTokens } from './types';
import { UserAPI } from '../api/userApi';
import { STORAGE_KEYS } from '@/shared/lib/storageKeys';
import { openErrorDialog } from '@/shared/ui';

/**
 * 인증 상태
 * - accessToken: API 요청에 사용하는 액세스 토큰
 * - refreshToken: 토큰 갱신에 사용하는 리프레시 토큰
 * - user: 로그인된 사용자 정보
 */
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

/**
 * 인증 액션
 * - setTokens: 토큰 저장 (메모리 + EncryptedStorage)
 * - setUser: 사용자 정보 저장
 * - fetchUserInfo: /users/me API를 호출하여 사용자 정보를 조회·저장
 * - refreshAccessToken: 토큰 갱신 큐를 관리하며 새 accessToken을 반환
 * - clear: 인증 상태 초기화 및 저장된 토큰 삭제
 * - initTokenFromStorage: 앱 시작 시 EncryptedStorage에서 토큰 복원
 */
interface AuthActions {
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  fetchUserInfo: () => Promise<void>;
  refreshAccessToken: () => Promise<string>;
  clear: () => void;
  initTokenFromStorage: () => Promise<boolean>;
}

/** 토큰 갱신 진행 중 플래그 */
let isRefreshing = false;

/** 토큰 갱신 대기 큐 */
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (reason?: unknown) => void;
}> = [];

/**
 * 대기 큐에 쌓인 요청들을 일괄 처리
 */
function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
}

/**
 * # useAuthStore
 * ---
 * - 간단설명: 인증 토큰 및 사용자 정보를 관리하는 전역 스토어
 * - 제약사항 및 특이사항:
 *   - 토큰은 EncryptedStorage에 암호화 저장됨
 *   - 앱 시작 시 initTokenFromStorage() 호출 필요
 *   - fetchUserInfo()는 토큰 설정 후 호출하여 유저 정보 초기화
 *   - refreshAccessToken()은 동시 호출 시 큐로 관리하여 단일 갱신만 수행
 * ---
 * @example
 * const { accessToken, user, setTokens, fetchUserInfo, initTokenFromStorage } = useAuthStore();
 */
const useAuthStore = create<AuthState & AuthActions>()(
  immer((set, get) => ({
    accessToken: null,
    refreshToken: null,
    user: null,

    /**
     * 액세스/리프레시 토큰을 메모리와 EncryptedStorage에 저장
     * @param tokens - 저장할 AuthTokens 객체
     */
    setTokens: async ({ accessToken, refreshToken }) => {
      set((state) => {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      });
      await EncryptedStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      await EncryptedStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    },

    /**
     * 사용자 정보를 스토어에 저장
     * @param user - 저장할 User 객체
     */
    setUser: (user) => {
      set((state) => {
        state.user = user;
      });
    },

    /**
     * /users/me API를 호출하여 사용자 정보를 조회하고 스토어에 저장
     */
    fetchUserInfo: async () => {
      try {
        const { data } = await UserAPI.fetchUserInfo();
        set((state) => {
          state.user = data;
        });
      } catch (error) {
        console.error('fetchUserInfo 실패:', error);
        openErrorDialog();
      }
    },

    /**
     * # refreshAccessToken
     * ---
     * - 간단설명: refreshToken으로 새 토큰을 발급받고 스토어에 저장 후 새 accessToken 반환
     * - 제약사항 및 특이사항:
     *   - 동시 호출 시 큐를 사용해 단일 갱신만 실행
     *   - 갱신 실패 시 인증 상태 초기화(clear) 후 에러 전파
     * ---
     */
    refreshAccessToken: async () => {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      isRefreshing = true;
      const { refreshToken } = get();

      if (!refreshToken) {
        get().clear();
        const error = new Error('INVALID_REFRESH');
        processQueue(error);
        isRefreshing = false;
        throw error;
      }

      try {
        const { data } = await UserAPI.refreshTokens(refreshToken);
        get().setTokens(data);
        processQueue(null, data.accessToken);
        return data.accessToken;
      } catch (refreshError) {
        processQueue(refreshError);
        get().clear();
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    },

    /**
     * 인증 상태를 초기화하고 EncryptedStorage에서 토큰 삭제
     */
    clear: async () => {
      set((state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
      });
      await EncryptedStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, '');
      await EncryptedStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, '');
    },

    /**
     * 앱 시작 시 EncryptedStorage에서 토큰을 읽어 메모리에 복원
     * @returns storage에 두 토큰 들어있는지 여부, 하나라도 없으면 false
     */
    initTokenFromStorage: async () => {
      const accessToken = await EncryptedStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const refreshToken = await EncryptedStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (accessToken && refreshToken) {
        set((state) => {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
        });
        return true;
      }
      return false;
    },
  })),
);

export default useAuthStore;
