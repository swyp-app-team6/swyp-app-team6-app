import { API } from '@/shared/api';
import type { User, AuthTokens } from '../model/types';

interface GoogleLoginResponse extends AuthTokens {
  user: User;
}

export const googleLogin = (idToken: string) =>
  API.post<GoogleLoginResponse>('/api/auth/google', { idToken });

export const refreshTokens = (refreshToken: string) =>
  API.post<AuthTokens>('/api/auth/refresh', { refreshToken });

export const logout = (refreshToken: string) =>
  API.post('/api/auth/logout', { refreshToken });

export const getMe = () =>
  API.get<User>('/api/auth/me');
