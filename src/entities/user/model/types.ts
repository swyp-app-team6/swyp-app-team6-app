/**
 * 사용자 정보 (/users/me 응답)
 * - id: 사용자 고유 ID
 * - email: 이메일
 * - role: 사용자 역할 (USER 등)
 * - provider: OAuth 제공자 (GOOGLE 등)
 */
export interface User {
  id: number;
  email: string;
  role: string;
  provider: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * 관심사 목록
 * - TRAVEL = 여행
 * - SPORTS = 스포츠
 * - MUSIC = 음악
 * - CONTENTS = 콘텐츠
 * - FOOD = 음식
 * - CULTURE = 문화
 * - BOOKS = 독서
 * - GAME = 게임
 * - SELF_DEVELOPMENT = 자기계발
 * - INVESTING = 투자
 */
export type Interest =
  | 'TRAVEL'
  | 'SPORTS'
  | 'MUSIC'
  | 'CONTENTS'
  | 'FOOD'
  | 'CULTURE'
  | 'BOOKS'
  | 'GAME'
  | 'SELF_DEVELOPMENT'
  | 'INVESTING';

/**
 * 프로필 등록 요청
 * - nickname: 닉네임 (3~10자)
 * - gender: 성별 (M | F)
 * - image_key: 프로필 이미지 키 (선택, presign API에서 발급)
 * - bio: 자기소개 (0~20자)
 * - keyword: 키워드 (0~20자)
 * - topic: 토픽 (0~20자)
 * - interests: 관심사 목록 (3~5개)
 */
export interface ProfileRegisterRequest {
  nickname: string;
  gender: 'M' | 'F';
  image_key?: string;
  bio: string;
  keyword: string;
  topic: string;
  interests: Interest[];
}

/**
 * 프로필 수정 요청 (PATCH /profile)
 * - nickname: 닉네임 (3~10자, 선택)
 * - image_key: 프로필 이미지 키 (선택)
 * - bio: 자기소개 (0~20자, 선택)
 * - keyword: 키워드 (0~20자, 선택)
 * - topic: 토픽 (0~20자, 선택)
 * - interests: 관심사 목록 (3~5개, 선택)
 */
export interface ProfileUpdateRequest {
  nickname?: string;
  image_key?: string;
  bio?: string;
  keyword?: string;
  topic?: string;
  interests?: Interest[];
}

/**
 * 프로필 응답
 * - id: 프로필 ID
 * - nickname: 닉네임
 * - image_key: 프로필 이미지 키
 * - gender: 성별
 * - bio: 자기소개
 * - keyword: 키워드
 * - topic: 토픽
 * - interests: 관심사 목록
 */
export interface MyProfileResponse {
  id: number;
  nickname: string;
  image_key?: string;
  gender: 'M' | 'F';
  bio: string;
  keyword: string;
  topic: string;
  interests: Interest[];
}

/**
 * Presigned URL 응답
 * - uploadUrl: S3 업로드용 Presigned URL (10분 유효)
 * - imageKey: 프로필 생성 API에 전달할 이미지 키
 */
export interface PresignResponse {
  uploadUrl: string;
  imageKey: string;
}

/**
 * 업로드 콘텐츠 타입
 */
export type UploadContentType = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';
