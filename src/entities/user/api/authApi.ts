import { API } from '@/shared/api';
import type { User, AuthTokens } from '../model/types';

/**
 * Google 로그인 API 응답
 * - access_token: 액세스 토큰 (snake_case)
 * - refresh_token: 리프레시 토큰 (snake_case)
 */
export interface GoogleLoginResponse {
  access_token: string;
  refresh_token: string;
}

export const googleLogin = (idToken: string) =>
  API.post<GoogleLoginResponse>('/auth/google/app', { idToken });

export const refreshTokens = (refreshToken: string) =>
  API.post<AuthTokens>('/api/auth/refresh', { refreshToken });

export const logout = (refreshToken: string) =>
  API.post('/api/auth/logout', { refreshToken });

export const getMe = () =>
  API.get<User>('/api/auth/me');
