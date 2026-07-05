/**
 * 코스믹 유형 테스트 질문
 * - id: 질문 고유 ID
 * - questionNumber: 질문 번호 (1~7)
 * - question: 질문 텍스트
 * - options: 4개 선택지
 */
export interface CosmicTypeQuestion {
  id: string;
  questionNumber: number;
  question: string;
  options: string[];
}