import { API } from '@/shared/api';
import type {
  ProfileRegisterRequest,
  ProfileUpdateRequest,
  MyProfileResponse,
  QrResponse,
  PresignResponse,
  UploadContentType,
} from '../model/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * # ProfileAPI
 * ---
 * - 간단설명: 프로필 관련 API를 정적 메서드로 관리하는 클래스
 * - 제약사항 및 특이사항:
 *   - 모든 엔드포인트는 인증 필요 (Authorization Bearer 토큰)
 *   - query: @lukemorales/query-key-factory 기반 쿼리 키 팩토리
 * ---
 * @example
 * const { data } = await ProfileAPI.fetchProfile();
 * const { data } = await ProfileAPI.fetchProfileByUuid('uuid-string');
 */
export class ProfileAPI {
  /**
   * # fetchProfile
   * ---
   * - 간단설명: 현재 로그인된 사용자의 프로필 정보를 조회
   * ---
   */
  static fetchProfile() {
    return API.get<MyProfileResponse>('/profile');
  }

  /**
   * # registerProfile
   * ---
   * - 간단설명: 회원가입 시 사용자 프로필 등록
   * - 제약사항: nickname 3~10자, job 최대 10자, bio 최대 100자, interests 3~5개
   * ---
   * @param data 프로필 등록 요청 데이터
   */
  static registerProfile(data: ProfileRegisterRequest) {
    return API.post<MyProfileResponse>('/profile', data);
  }

  /**
   * # updateProfile
   * ---
   * - 간단설명: 기존 프로필 정보를 부분 수정
   * - 제약사항: 변경할 필드만 전송
   * ---
   * @param data 프로필 수정 요청 데이터
   */
  static updateProfile(data: ProfileUpdateRequest) {
    return API.patch<MyProfileResponse>('/profile', data);
  }

  /**
   * # deleteProfile
   * ---
   * - 간단설명: 사용자 프로필 및 연관 데이터 삭제
   * ---
   */
  static deleteProfile() {
    return API.delete<void>('/profile');
  }

  /**
   * # fetchProfileByUuid
   * ---
   * - 간단설명: QR 코드를 통해 다른 사용자의 프로필을 조회
   * ---
   * @param uuid 대상 사용자의 QR UUID
   */
  static fetchProfileByUuid(uuid: string) {
    return API.get<MyProfileResponse>(`/profile/${uuid}`);
  }

  /**
   * # fetchQrUuid
   * ---
   * - 간단설명: 현재 사용자의 QR UUID를 조회하거나 생성
   * ---
   */
  static fetchQrUuid() {
    return API.get<QrResponse>('/profile/qr');
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
  static query = createQueryKeys('profile', {
    me: () => ({
      queryKey: ['me'],
      queryFn: async () => {
        const { data } = await ProfileAPI.fetchProfile();
        return data;
      },
    }),
    byUuid: (uuid: string) => ({
      queryKey: [uuid],
      queryFn: async () => {
        const { data } = await ProfileAPI.fetchProfileByUuid(uuid);
        return data;
      },
    }),
    qr: () => ({
      queryKey: ['qr'],
      queryFn: async () => {
        const { data } = await ProfileAPI.fetchQrUuid();
        return data;
      },
    }),
  });
}
