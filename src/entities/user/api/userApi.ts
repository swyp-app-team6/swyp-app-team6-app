import { API } from '@/shared/api';
import type {
  User,
} from '../model/types';
import { createQueryKeys } from "@lukemorales/query-key-factory";

/**
 * Google 로그인 API 응답
 * - access_token: 액세스 토큰 (snake_case)
 * - refresh_token: 리프레시 토큰 (snake_case)
 * - requires_terms_agreement: 약관 동의 필요 여부 (false = 미동의, 약관 동의 바텀시트 노출)
 */
export interface GoogleLoginResponse {
  access_token: string;
  refresh_token: string;
  requires_terms_agreement: boolean;
}

/**
 * Apple 로그인 API 응답
 * - access_token: 액세스 토큰 (snake_case)
 * - refresh_token: 리프레시 토큰 (snake_case)
 * - requires_terms_agreement: 약관 동의 필요 여부 (false = 미동의, 약관 동의 바텀시트 노출)
 */
export interface AppleLoginResponse {
  access_token: string;
  refresh_token: string;
  requires_terms_agreement: boolean;
}

/**
 * 일반 로그인 API 요청
 * - email: 가입 시 등록한 아이디
 * - password: 비밀번호
 */
export interface DefaultLoginRequest {
  /** 가입 시 등록한 아이디 */
  email: string;
  /** 비밀번호 */
  password: string;
}

/**
 * 일반 로그인 API 응답
 * - access_token: 액세스 토큰 (snake_case)
 * - refresh_token: 리프레시 토큰 (snake_case)
 * - requires_terms_agreement: 약관 동의 필요 여부 (false = 미동의, 약관 동의 바텀시트 노출)
 */
export interface DefaultLoginResponse {
  /** 액세스 토큰 */
  access_token: string;
  /** 리프레시 토큰 */
  refresh_token: string;
  /** 약관 동의 필요 여부 */
  requires_terms_agreement: boolean;
}

/**
 * 토큰 갱신 API 응답
 * - access_token: 새 액세스 토큰 (snake_case)
 * - refresh_token: 새 리프레시 토큰 (snake_case)
 */
export interface RefreshTokenResponse {
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
   * # defaultLogin
   * ---
   * - 간단설명: 안내받은 계정 기반 이메일/비밀번호 로그인
   * ---
   * @param body 이메일과 비밀번호
   */
  static defaultLogin(body: DefaultLoginRequest) {
    return API.post<DefaultLoginResponse>('/auth/login', body, { skipAuth: true });
  }

  /**
   * # refreshTokens
   * ---
   * - 간단설명: refresh_token으로 새로운 토큰 쌍을 재발급
   * ---
   * @param refreshToken 리프레시 토큰
   */
  static refreshTokens(refreshToken: string) {
    return API.post<RefreshTokenResponse>('/auth/refresh', { refresh_token: refreshToken }, { skipAuth: true });
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
   * # logout
   * ---
   * - 간단설명: 서버에 로그아웃 요청하여 리프레시 토큰 무효화
   * ---
   * @param refreshToken 무효화할 리프레시 토큰
   */
  static logout(refreshToken: string) {
    return API.post<void>('/auth/logout', { refresh_token: refreshToken });
  }

  /**
   * # deleteUser
   * ---
   * - 간단설명: 회원 탈퇴 및 관련 데이터 삭제
   * - 제약사항: 탈퇴 시 프로필 등 연관 데이터도 함께 삭제됨
   * ---
   * @param body 탈퇴 사유 코드 및 상세 사유
   */
  static deleteUser(body: { reasonCode: string; reasonDetail?: string }) {
    return API.delete<void>('/user', { data: body });
  }

  /** 쿼리 키 팩토리 */
  static query = createQueryKeys('users', {
    me: () => ({
      queryKey: ['me'],
      queryFn: async () => {
        const { data } = await UserAPI.fetchUserInfo();
        return data;
      },
    }),
  });
}
