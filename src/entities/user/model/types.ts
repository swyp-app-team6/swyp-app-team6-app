/**
 * 사용자 역할
 * - USER = 일반 사용자
 * - ADMIN = 관리자
 * - MANAGER = 매니저
 */
export type UserRole = 'USER' | 'ADMIN' | 'MANAGER';

/**
 * 소셜 로그인 제공자
 * - GOOGLE = 구글
 * - KAKAO = 카카오
 * - APPLE = 애플
 * - null = 이메일 가입
 */
export type AuthProvider = 'GOOGLE' | 'KAKAO' | 'APPLE' | null;

/**
 * /users/me 응답 사용자 정보
 * - id = 사용자 고유 ID
 * - email = 이메일 주소
 * - role = 사용자 역할
 * - provider = 소셜 로그인 제공자 (이메일 가입 시 null)
 */
export interface User {
  /** 사용자 고유 ID */
  id: number;
  /** 이메일 주소 */
  email: string;
  /** 사용자 역할 */
  role: UserRole;
  /** 소셜 로그인 제공자 */
  provider: AuthProvider;
}

/**
 * 인증 토큰 쌍
 * - access_token = 접근 토큰 (30분)
 * - refresh_token = 갱신 토큰 (14일)
 */
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}
