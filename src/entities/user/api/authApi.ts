import { API } from '@/shared/api';
import type { User, AuthTokens } from '../model/types';

/**
 * # refreshTokens
 * ---
 * - 간단설명: refresh_token으로 새 토큰 쌍 발급
 * - 제약사항: 응답의 두 토큰 모두 교체 필요, 기존 refresh_token은 즉시 무효화
 * ---
 * @param refreshToken 저장된 refresh_token
 * ---
 * @example
 * const { data } = await refreshTokens('eyJ...');
 */
export const refreshTokens = (refreshToken: string) =>
  API.post<AuthTokens>('/auth/refresh', { refresh_token: refreshToken });

/**
 * # getMe
 * ---
 * - 간단설명: 로그인한 사용자의 프로필 정보 조회
 * - 제약사항: Authorization 헤더에 access_token 필요
 * ---
 * @example
 * const { data } = await getMe();
 */
export const getMe = () =>
  API.get<User>('/users/me');
