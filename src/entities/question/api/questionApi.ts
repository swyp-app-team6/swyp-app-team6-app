import { API } from '@/shared/api';
import type { CustomQuestionResponse } from '../model/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * # QuestionAPI
 * ---
 * - 간단설명: 프로필등록: TMI 질문 템플릿 관련 API를 정적 메서드로 관리하는 클래스
 * - 제약사항 및 특이사항:
 *   - 모든 엔드포인트는 인증 필요 (Authorization Bearer 토큰)
 *   - query: @lukemorales/query-key-factory 기반 쿼리 키 팩토리
 * ---
 * @example
 * const { data } = await QuestionAPI.fetchQuestions();
 */
export class QuestionAPI {
  /**
   * # fetchQuestions
   * ---
   * - 간단설명: 프로필 생성용 질문 템플릿(선택형/단답형) 목록 조회
   * ---
   */
  static fetchQuestions() {
    return API.get<CustomQuestionResponse>('/question');
  }

  /** 쿼리 키 팩토리 */
  static query = createQueryKeys('question', {
    all: () => ({
      queryKey: ['all'],
      queryFn: async () => {
        const { data } = await QuestionAPI.fetchQuestions();
        return data;
      },
    }),
  });
}
