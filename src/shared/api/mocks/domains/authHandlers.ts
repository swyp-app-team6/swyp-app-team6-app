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
      requires_terms_agreement: true,
    });
  }),

  /**
   * Apple 로그인 — POST /auth/apple/token
   */
  http.post(`${BASE_URL}/auth/apple/token`, () => {
    return HttpResponse.json({
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      requires_terms_agreement: true,
    });
  }),

  /**
   * 안내받은 계정 로그인 — POST /auth/login
   */
  http.post(`${BASE_URL}/auth/login`, () => {
    return HttpResponse.json({
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      requires_terms_agreement: true,
    });
  }),

  /**
   * 토큰 갱신 — POST /auth/refresh
   */
  http.post(`${BASE_URL}/auth/refresh`, () => {
    return HttpResponse.json({
      access_token: 'mock-refreshed-access-token',
      refresh_token: 'mock-refreshed-refresh-token',
    });
  }),
];
