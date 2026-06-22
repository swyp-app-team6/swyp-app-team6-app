import { API } from '@/shared/api';
import type { User, AuthTokens } from '../model/types';

export const refreshTokens = (refreshToken: string) =>
  API.post<AuthTokens>('/api/auth/refresh', { refreshToken });

export const logout = (refreshToken: string) =>
  API.post('/api/auth/logout', { refreshToken });

export const getMe = () =>
  API.get<User>('/api/auth/me');
