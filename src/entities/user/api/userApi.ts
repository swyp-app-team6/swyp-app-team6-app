import { API } from '@/shared/api';
import type {
  User,
  AuthTokens,
  ProfileRegisterRequest,
  MyProfileResponse,
  PresignResponse,
  UploadContentType,
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
 * # UserAPI
 * ---
 * - 간단설명: 사용자·인증 관련 API를 정적 메서드로 관리하는 클래스
 * - 제약사항 및 특이사항:
 *   - googleLogin, refreshTokens는 skipAuth: true (인증 불필요)
 *   - query: @lukemorales/query-key-factory 기반 쿼리 키 팩토리
 * ---
 * @example
 * const { data } = await UserAPI.googleLogin('eyJhbGci...');
 * const { data } = await UserAPI.getMe();
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
   * # getMe
   * ---
   * - 간단설명: 현재 로그인된 사용자의 기본 정보(ID, 이메일, 역할, OAuth 제공자)를 조회
   * ---
   */
  static getMe() {
    return API.get<User>('/users/me');
  }

  /**
   * # registerProfile\
   * ---
   * - 간단설명: 회원가입 시 사용자 프로필 등록
   * - 제약사항: nickname 3~10자, bio/keyword/topic 0~20자, interests 1~5개
   * ---
   * @param data 프로필 등록 요청 데이터
   */
  static registerProfile(data: ProfileRegisterRequest) {
    return API.post<MyProfileResponse>('/profile/register', data);
  }

  /**
   * # profileImageUpload
   * ---
   * - 간단설명: 프로필 이미지 업로드를 위한 presign uploadURL, imageKey 발급
   * - 제약사항: contentType은 image/jpeg, image/png, image/webp, image/gif만 허용
   * ---
   * @param contentType 업로드할 파일의 Content-Type (기본값: image/jpeg)
   */
  static profileImageUpload(contentType: UploadContentType = 'image/jpeg') {
    return API.post<PresignResponse>('/api/uploads/presign', null, {
      params: { contentType },
    });
  }

  /** 쿼리 키 팩토리 */
  static query = createQueryKeys('users', {
    me: () => ({
      queryKey: ['me'],
      queryFn: () => UserAPI.getMe(),
    }),
  });
}
