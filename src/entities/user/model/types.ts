/**
 * 사용자 정보
 * - id: 사용자 고유 ID
 * - email: 이메일
 * - name: 닉네임
 * - picture: 서버 프로필 이미지 URL
 * - localProfileImage: 기기에 저장된 프로필 이미지 URI
 * - provider: 소셜 로그인 제공자 (google | apple)
 */
export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  localProfileImage?: string;
  /** 소셜 로그인 제공자 */
  provider?: 'google' | 'apple';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
