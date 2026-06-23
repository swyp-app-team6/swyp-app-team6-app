import { API } from '@/shared/api';
import type {
  User,
  AuthTokens,
  ProfileRegisterRequest,
  MyProfileResponse,
  PresignResponse,
  UploadContentType,
} from '../model/types';

// TODO: 본격 api 나오면 분리

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
 * - 구글로그인 성공후 전달받은 idToken 사용해 인증토큰 획득
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
 * - 간단설명: 회원가입 시 사용자 프로필 등록
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
 * # profileImageUpload
 * ---
 * - 간단설명: 프로필 이미지 업로드를 위한 presign uploadURL, imageKey 발급
 * - 이미지 업로드 후 나온 url을 사용해 S3이미지업로드 수행
 * - imageKey값은 추후 이미지 조회 링크 등 제작 용도로 사용됨
 * TODO: 이미지 압축기능 필요
 * ---
 * @param contentType 업로드할 파일의 Content-Type, Available values : image/jpeg, image/png, image/webp, image/gif (기본값: image/jpeg)
 * ---
 * @example
 * const { uploadUrl, imageKey } = await presignUpload('image/png');
 */
export const profileImageUpload = (contentType: UploadContentType = 'image/jpeg') =>
  API.post<PresignResponse>('/api/uploads/presign', null, {
    params: { contentType },
  });
