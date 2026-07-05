import { useQuery } from '@tanstack/react-query';
import { QuestionAPI } from './questionApi';

/**
 * # useQuestionsQuery
 * ---
 * - 간단설명: TMI 질문 템플릿 목록을 조회하는 React Query 훅
 * - 제약사항 및 특이사항:
 *   - GET /question 엔드포인트 사용
 *   - 선택형(multiple_questions)과 단답형(short_questions) 모두 반환
 * ---
 * @example
 * const { data, isLoading } = useQuestionsQuery();
 */
export function useQuestionsQuery() {
  return useQuery({
    ...QuestionAPI.query.all(),
  });
}
