import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import EncryptedStorage from 'react-native-encrypted-storage';
import type { User, AuthTokens } from './types';

/**
 * 인증 상태
 * - accessToken: API 요청에 사용하는 액세스 토큰
 * - refreshToken: 토큰 갱신에 사용하는 리프레시 토큰
 * - user: 로그인된 사용자 정보
 * - localProfileImage: 기기에 저장된 프로필 이미지 URI
 */
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  localProfileImage: string | null;
}

/**
 * 인증 액션
 * - setTokens: 토큰 저장 (메모리 + EncryptedStorage)
 * - setUser: 사용자 정보 저장
 * - setProfileImage: 로컬 프로필 이미지 URI 저장
 * - clear: 인증 상태 초기화 및 저장된 토큰 삭제
 * - hydrate: 앱 시작 시 EncryptedStorage에서 토큰 복원
 */
interface AuthActions {
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  setProfileImage: (uri: string) => void;
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
 * ---
 * @example
 * const { accessToken, setTokens, hydrate } = useAuthStore();
 */
const useAuthStore = create<AuthState & AuthActions>()(
  immer((set) => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    localProfileImage: null,

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
     * 로컬 프로필 이미지 URI를 저장하고 user 객체에도 반영
     * @param uri - 기기에 저장된 이미지 URI
     */
    setProfileImage: (uri) => {
      set((state) => {
        state.localProfileImage = uri;
        if (state.user) {
          state.user.localProfileImage = uri;
        }
      });
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
     * 앱 시작 시 EncryptedStorage에서 토큰을 읽어 메모리에 복원
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
