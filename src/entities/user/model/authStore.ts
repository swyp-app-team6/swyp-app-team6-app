import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import EncryptedStorage from 'react-native-encrypted-storage';
import type { User, AuthTokens } from './types';
import { getMe } from '../api/authApi';

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
 * - fetchMe: /users/me API를 호출하여 사용자 정보를 조회·저장
 * - clear: 인증 상태 초기화 및 저장된 토큰 삭제
 * - hydrate: 앱 시작 시 EncryptedStorage에서 토큰 복원 + 유저 정보 조회
 */
interface AuthActions {
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  fetchMe: () => Promise<void>;
  clear: () => void;
  hydrate: () => Promise<void>;
}

/**
 * # useAuthStore
 * ---
 * - 간단설명: 인증 토큰 및 사용자 정보를 관리하는 전역 스토어
 * - 제약사항 및 특이사항:
 *   - 토큰은 EncryptedStorage에 암호화 저장됨
 *   - 앱 시작 시 hydrate() 호출 필요
 *   - fetchMe()는 토큰 설정 후 호출하여 유저 정보 초기화
 * ---
 * @example
 * const { accessToken, user, setTokens, fetchMe, hydrate } = useAuthStore();
 */
const useAuthStore = create<AuthState & AuthActions>()(
  immer((set) => ({
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
      await EncryptedStorage.setItem('accessToken', accessToken);
      await EncryptedStorage.setItem('refreshToken', refreshToken);
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
    fetchMe: async () => {
      try {
        const { data } = await getMe();
        set((state) => {
          state.user = data;
        });
      } catch (error) {
        console.error('fetchMe 실패:', error);
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
      await EncryptedStorage.removeItem('accessToken');
      await EncryptedStorage.removeItem('refreshToken');
    },

    /**
     * 앱 시작 시 EncryptedStorage에서 토큰을 읽어 메모리에 복원하고 유저 정보 조회
     */
    hydrate: async () => {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      const refreshToken = await EncryptedStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        set((state) => {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
        });
      }
    },
  })),
);

export default useAuthStore;
