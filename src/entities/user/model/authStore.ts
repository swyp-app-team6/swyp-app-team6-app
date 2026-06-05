import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import EncryptedStorage from 'react-native-encrypted-storage';
import type { User, AuthTokens } from './types';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  localProfileImage: string | null;
}

interface AuthActions {
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  setProfileImage: (uri: string) => void;
  clear: () => void;
  hydrate: () => Promise<void>;
}

const useAuthStore = create<AuthState & AuthActions>()(
  immer((set) => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    localProfileImage: null,

    setTokens: ({ accessToken, refreshToken }) => {
      set((state) => {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      });
      EncryptedStorage.setItem('accessToken', accessToken);
      EncryptedStorage.setItem('refreshToken', refreshToken);
    },

    setUser: (user) => {
      set((state) => {
        state.user = user;
      });
    },

    setProfileImage: (uri) => {
      set((state) => {
        state.localProfileImage = uri;
        if (state.user) {
          state.user.localProfileImage = uri;
        }
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
