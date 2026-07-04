import type { CosmicType } from '@/shared/enums';

/**
 * Cosmic 테스트 답변 항목
 * - answer_id: 답변 ID
 * - answer: 답변 내용
 * - cosmic_type: 해당 답변의 우주 유형
 * - score: 점수
 */
export interface CosmicTestAnswer {
  /** 답변 ID */
  answer_id: number;
  /** 답변 내용 */
  answer: string;
  /** 해당 답변의 우주 유형 */
  cosmic_type: CosmicType;
  /** 점수 */
  score: number;
}

/**
 * Cosmic 테스트 질문 항목
 * - question_id: 질문 ID
 * - question: 질문 내용
 * - answers: 답변 선택지 목록
 */
export interface CosmicTestQuestion {
  /** 질문 ID */
  question_id: number;
  /** 질문 내용 */
  question: string;
  /** 답변 선택지 목록 */
  answers: CosmicTestAnswer[];
}

/**
 * Cosmic 테스트 질문 응답 (GET /cosmic/test)
 * - questions: 테스트 질문 목록
 */
export interface CosmicTestResponse {
  /** 테스트 질문 목록 */
  questions: CosmicTestQuestion[];
}

/**
 * Cosmic 타입 라벨
 * - type: 우주 유형 enum
 * - label: 화면 표시 라벨
 */
export interface CosmicTypeLabel {
  /** 우주 유형 */
  type: CosmicType;
  /** 화면 표시 라벨 */
  label: string;
}

/**
 * Cosmic 타입 상세 응답 (GET /cosmic/{type})
 * - cosmic_type: 우주 유형 타입+라벨
 * - detail: 상세 설명
 * - image_key: 이미지 키
 * - features: 특성 목록
 * - matches: 잘 맞는 유형 목록
 * - mentions: 언급 목록
 * - tags: 태그 목록
 */
export interface CosmicTypeResponse {
  /** 우주 유형 타입+라벨 */
  cosmic_type: CosmicTypeLabel;
  /** 상세 설명 */
  detail: string;
  /** 이미지 키 */
  image_key: string;
  /** 특성 목록 */
  features: string[];
  /** 잘 맞는 유형 목록 */
  matches: CosmicTypeLabel[];
  /** 언급 목록 */
  mentions: string[];
  /** 태그 목록 */
  tags: string[];
}
