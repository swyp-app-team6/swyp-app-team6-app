import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import EncryptedStorage from 'react-native-encrypted-storage';
import type { User, AuthTokens } from './types';
import { getMe } from '../api/authApi';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

interface AuthActions {
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  fetchAndSetMe: () => Promise<void>;
  clear: () => void;
  hydrate: () => Promise<void>;
}

/**
 * # useAuthStore
 * ---
 * - 간단설명: 인증 상태 관리 스토어 (토큰 + 유저 정보)
 * - 제약사항 및 특이사항:
 *   - 토큰은 Zustand 상태와 EncryptedStorage에 동시 저장
 *   - hydrate()로 앱 시작 시 EncryptedStorage에서 토큰 복원
 * ---
 * @example
 * const { accessToken, user } = useAuthStore();
 * const { setTokens, fetchAndSetMe, clear } = useAuthStore();
 */
const useAuthStore = create<AuthState & AuthActions>()(
  immer((set) => ({
    accessToken: null,
    refreshToken: null,
    user: null,

    setTokens: ({ access_token, refresh_token }) => {
      set((state) => {
        state.accessToken = access_token;
        state.refreshToken = refresh_token;
      });
      EncryptedStorage.setItem('accessToken', access_token);
      EncryptedStorage.setItem('refreshToken', refresh_token);
    },

    setUser: (user) => {
      set((state) => {
        state.user = user;
      });
    },

    fetchAndSetMe: async () => {
      const { data } = await getMe();
      set((state) => {
        state.user = data;
      });
    },

    clear: () => {
      set((state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
      });
      EncryptedStorage.removeItem('accessToken');
      EncryptedStorage.removeItem('refreshToken');
    },

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
