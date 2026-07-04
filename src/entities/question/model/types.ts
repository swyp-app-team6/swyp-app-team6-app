import type { TMIQuestionType } from '@/shared/enums';

/**
 * 선택형 질문 답변 항목
 * - answer_id: 답변 ID
 * - content: 답변 내용
 */
export interface QuestionAnswer {
  /** 답변 ID */
  answer_id: number;
  /** 답변 내용 */
  content: string;
}

/**
 * 선택형(multiple) 질문
 * - id: 질문 ID
 * - type: 질문 유형 (BINARY | BLANK | DISCUSSION | BALANCE_GAME)
 * - content: 질문 내용
 * - answers: 선택지 목록
 */
export interface MultipleQuestion {
  /** 질문 ID */
  id: number;
  /** 질문 유형 */
  type: TMIQuestionType;
  /** 질문 내용 */
  content: string;
  /** 선택지 목록 */
  answers: QuestionAnswer[];
}

/**
 * 단답형(short) 질문
 * - id: 질문 ID
 * - type: 질문 유형 (BINARY | BLANK | DISCUSSION | BALANCE_GAME)
 * - content: 질문 내용
 */
export interface ShortQuestion {
  /** 질문 ID */
  id: number;
  /** 질문 유형 */
  type: TMIQuestionType;
  /** 질문 내용 */
  content: string;
}

/**
 * 질문 템플릿 응답 (GET /question)
 * - multiple_questions: 선택형 질문 목록
 * - short_questions: 단답형 질문 목록
 */
export interface CustomQuestionResponse {
  /** 선택형 질문 목록 */
  multiple_questions: MultipleQuestion[];
  /** 단답형 질문 목록 */
  short_questions: ShortQuestion[];
}
