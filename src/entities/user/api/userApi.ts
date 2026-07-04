import { API } from '@/shared/api';
import type {
  User,
  AuthTokens,
} from '../model/types';
import { createQueryKeys } from "@lukemorales/query-key-factory";

/**
 * Google 로그인 API 응답
 * - access_token: 액세스 토큰 (snake_case)
 * - refresh_token: 리프레시 토큰 (snake_case)
 */
export interface GoogleLoginResponse {
  access_token: string;
  refresh_token: string;
}

/**
 * Apple 로그인 API 응답
 * - access_token: 액세스 토큰 (snake_case)
 * - refresh_token: 리프레시 토큰 (snake_case)
 */
export interface AppleLoginResponse {
  access_token: string;
  refresh_token: string;
}

/**
 * # UserAPI
 * ---
 * - 간단설명: 사용자·인증 관련 API를 정적 메서드로 관리하는 클래스
 * - 제약사항 및 특이사항:
 *   - googleLogin, refreshTokens는 skipAuth: true (인증 불필요)
 *   - query: @lukemorales/query-key-factory 기반 쿼리 키 팩토리
 * ---
 * @example
 * const { data } = await UserAPI.googleLogin('eyJhbGci...');
 * const { data } = await UserAPI.fetchUserInfo();
 */
export class UserAPI {
  /**
   * # googleLogin
   * ---
   * - 간단설명: 앱(Android/iOS) Google idToken을 검증하고 서비스 토큰을 반환
   * ---
   * @param idToken Google에서 발급받은 idToken
   */
  static googleLogin(idToken: string) {
    return API.post<GoogleLoginResponse>('/auth/google/app', { idToken }, { skipAuth: true });
  }

  /**
   * # appleLogin
   * ---
   * - 간단설명: Apple identityToken을 검증하고 서비스 토큰을 반환
   * ---
   * @param identityToken Apple에서 발급받은 identityToken
   * @param authorizationCode Apple에서 발급받은 authorizationCode (선택)
   */
  static appleLogin(identityToken: string, authorizationCode?: string) {
    return API.post<AppleLoginResponse>(
      '/auth/apple/token',
      { identityToken, authorizationCode },
      { skipAuth: true },
    );
  }

  /**
   * # refreshTokens
   * ---
   * - 간단설명: refresh_token으로 새로운 토큰 쌍을 재발급
   * ---
   * @param refreshToken 리프레시 토큰
   */
  static refreshTokens(refreshToken: string) {
    return API.post<AuthTokens>('/auth/refresh', { refresh_token: refreshToken }, { skipAuth: true });
  }

  /**
   * # fetchUserInfo
   * ---
   * - 간단설명: 현재 로그인된 사용자의 기본 정보(ID, 이메일, 역할, OAuth 제공자)를 조회
   * ---
   */
  static fetchUserInfo() {
    return API.get<User>('/user');
  }

  /**
   * # deleteUser
   * ---
   * - 간단설명: 회원 탈퇴 및 관련 데이터 삭제
   * - 제약사항: 탈퇴 시 프로필 등 연관 데이터도 함께 삭제됨
   * ---
   */
  static deleteUser() {
    return API.delete<void>('/user');
  }

  /** 쿼리 키 팩토리 */
  static query = createQueryKeys('users', {
    me: () => ({
      queryKey: ['me'],
      queryFn: () => UserAPI.fetchUserInfo(),
      // @ts-expect-error createQueryKeys 타입 제한으로 staleTime 할당 불가
      staleTime: Infinity,
    }),
  });
}
