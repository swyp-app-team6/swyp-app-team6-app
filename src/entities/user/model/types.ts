import { INTEREST, CosmicType, TMIQuestionType } from '@/shared/enums';

export { INTEREST, CosmicType, TMIQuestionType };

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
 * 지역 정보 객체
 * - group = 시/도 그룹명 (예: "서울")
 * - detail = 시/도 코드 (예: "SEOUL")
 * - label = 표시 라벨 (예: "서울전체")
 */
export interface Region {
  /** 시/도 그룹명 */
  group: string;
  /** 
   * 시/도 코드 ex) BUSAN_JUNGGU 
   * 이걸 통해 사용자 지역파악에 사용
   * */
  detail: string;
  /** 표시 라벨 */
  label: string;
}

/**
 * 프로필 등록 요청 (POST /profile)
 * - nickname: 닉네임 (3~10자)
 * - image_key: 프로필 이미지 키 (presign API에서 발급)
 * - gender: 성별 (M | F)
 * - age: 나이
 * - region: 지역
 * - job: 직업 (최대 10자)
 * - interests: 관심사 목록 (3~5개)
 * - bio: 자기소개 (최대 100자, 선택)
 * - cosmic_type: 우주 유형 (선택)
 * - choice_template: 선택형 템플릿 (선택)
 * - short_template: 단답형 템플릿 (선택)
 */
export interface ProfileRegisterRequest {
  nickname: string;
  image_key: string;
  gender: 'M' | 'F';
  age: number;
  region: string;
  job: string;
  interests: INTEREST[];
  bio?: string;
  cosmic_type?: CosmicType;
  choice_template?: ChoiceTemplate[];
  short_template?: ShortTemplate[];
}

/**
 * 프로필 수정 요청 (PATCH /profile)
 * - nickname: 닉네임 (3~10자, 선택)
 * - image_key: 프로필 이미지 키 (선택)
 * - age: 나이 (선택)
 * - region: 지역 (선택)
 * - job: 직업 (최대 10자, 선택)
 * - interests: 관심사 목록 (3~5개, 선택)
 * - bio: 자기소개 (최대 100자, 선택)
 * - cosmic_type: 우주 유형 (선택)
 * - choice_template: 선택형 템플릿 (선택)
 * - short_template: 단답형 템플릿 (선택)
 */
export interface ProfileUpdateRequest {
  nickname?: string;
  image_key?: string;
  age?: number;
  region?: string;
  job?: string;
  interests?: INTEREST[];
  bio?: string;
  cosmic_type?: CosmicType;
  choice_template?: ChoiceTemplate[];
  short_template?: ShortTemplate[];
}

/**
 * 관심사 타입 라벨
 * - type: 관심사 타입 enum 값
 * - label: 화면에 표시할 라벨 텍스트
 */
export interface InterestTypeLabel {
  type: INTEREST;
  label: string;
}


/**
 * 선택형 템플릿
 * - question_id: 질문 ID
 * - question_type: 질문 유형
 * - question: 질문 내용
 * - answer_id: 선택한 답변 ID
 * - answer: 선택한 답변 내용
 */
export interface ChoiceTemplate {
  question_id?: number;
  question_type: TMIQuestionType;
  question: string;
  answer_id?: number;
  answer: string;
}

/**
 * 단답형 템플릿
 * - question_id: 질문 ID
 * - question_type: 질문 유형
 * - question: 질문 내용
 * - answer: 답변 내용 (1~20자)
 */
export interface ShortTemplate {
  question_id?: number;
  question_type: TMIQuestionType;
  question: string;
  answer: string;
}

/**
 * 프로필 응답 (GET /profile, POST /profile, PATCH /profile, GET /profile/{uuid})
 * - id: 프로필 ID
 * - nickname: 닉네임
 * - image_key: 프로필 이미지 키
 * - gender: 성별
 * - age: 나이
 * - region: 지역
 * - job: 직업
 * - interests: 관심사 목록 (타입+라벨)
 * - bio: 자기소개
 * - cosmic_type: 우주 유형
 * - cosmic_type_image_key: 우주 유형 이미지 키
 * - cosmic_type_detail: 우주 유형 상세 설명
 * - choice_template: 선택형 템플릿 목록
 * - short_template: 단답형 템플릿 목록
 */
export interface MyProfileResponse {
  id: number;
  nickname: string;
  image_key?: string;
  gender: 'M' | 'F';
  age: number;
  region: Region;
  job: string;
  interests: InterestTypeLabel[];
  bio: string;
  cosmic_type?: CosmicType;
  cosmic_type_image_key?: string;
  cosmic_type_detail?: string;
  choice_template?: ChoiceTemplate[];
  short_template?: ShortTemplate[];
}

/**
 * QR UUID 응답 (GET /profile/qr)
 * - qr: QR UUID 문자열
 */
export interface QrResponse {
  qr: string;
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
