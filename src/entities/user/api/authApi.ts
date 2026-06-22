import { API } from '@/shared/api';
import type {
  User,
  AuthTokens,
  ProfileRegisterRequest,
  MyProfileResponse,
  PresignResponse,
  UploadContentType,
} from '../model/types';

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
 * # googleLogin
 * ---
 * - 간단설명: 앱(Android/iOS) Google idToken을 검증하고 서비스 토큰을 반환
 * ---
 * @param idToken Google에서 발급받은 idToken
 * ---
 * @example
 * const response = await googleLogin('eyJhbGciOi...');
 */
export const googleLogin = (idToken: string) =>
  API.post<GoogleLoginResponse>('/auth/google/app', { idToken });

/**
 * # refreshTokens
 * ---
 * - 간단설명: refresh_token으로 새로운 토큰 쌍을 재발급
 * ---
 * @param refreshToken 리프레시 토큰
 * ---
 * @example
 * const tokens = await refreshTokens('eyJhbGciOi...');
 */
export const refreshTokens = (refreshToken: string) =>
  API.post<AuthTokens>('/auth/refresh', { refresh_token: refreshToken });

/**
 * # getMe
 * ---
 * - 간단설명: 현재 로그인된 사용자의 기본 정보(ID, 이메일, 역할, OAuth 제공자)를 조회
 * ---
 * @example
 * const user = await getMe();
 */
export const getMe = () =>
  API.get<User>('/users/me');

/**
 * # registerProfile
 * ---
 * - 간단설명: 사용자 프로필을 등록
 * - 제약사항: nickname 3~10자, bio/keyword/topic 0~20자, interests 1~5개
 * ---
 * @param data 프로필 등록 요청 데이터
 * ---
 * @example
 * const profile = await registerProfile({
 *   nickname: '홍길동',
 *   gender: 'M',
 *   bio: '안녕하세요',
 *   keyword: '개발',
 *   topic: '프론트엔드',
 *   interests: ['TRAVEL', 'MUSIC'],
 * });
 */
export const registerProfile = (data: ProfileRegisterRequest) =>
  API.post<MyProfileResponse>('/profile/register', data);

/**
 * # presignUpload
 * ---
 * - 간단설명: 파일 업로드를 위한 S3 Presigned URL을 발급 (10분간 유효)
 * - 제약사항: 발급된 URL로 PUT 방식으로 파일을 직접 업로드, imageKey는 프로필 생성 API에 사용
 * ---
 * @param contentType 업로드할 파일의 Content-Type (기본값: image/jpeg)
 * ---
 * @example
 * const { uploadUrl, imageKey } = await presignUpload('image/png');
 */
export const presignUpload = (contentType: UploadContentType = 'image/jpeg') =>
  API.post<PresignResponse>('/api/uploads/presign', null, {
    params: { contentType },
  });
