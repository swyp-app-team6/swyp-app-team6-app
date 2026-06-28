/**
 * # authHandlers
 * ---
 * - 간단설명: 인증 관련 MSW mock 핸들러 (로그인, 토큰 갱신)
 * ---
 */
import { http, HttpResponse } from 'msw';
import Config from 'react-native-config';

const BASE_URL = Config.API_URL;

export const authHandlers = [
  /**
   * Google 로그인 — POST /auth/google/app
   */
  http.post(`${BASE_URL}/auth/google/app`, () => {
    return HttpResponse.json({
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
    });
  }),

  /**
   * 토큰 갱신 — POST /auth/refresh
   */
  http.post(`${BASE_URL}/auth/refresh`, () => {
    return HttpResponse.json({
      accessToken: 'mock-refreshed-access-token',
      refreshToken: 'mock-refreshed-refresh-token',
    });
  }),
];
