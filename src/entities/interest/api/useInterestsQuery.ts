import { useQuery } from '@tanstack/react-query';
import { InterestAPI } from './interestApi';

/**
 * # useInterestsQuery
 * ---
 * - 간단설명: 선택 가능한 관심사 목록을 조회하는 React Query 훅
 * - 제약사항 및 특이사항:
 *   - GET /interests 엔드포인트 사용
 *   - 인증 필요 (Authorization Bearer 토큰)
 * ---
 * @example
 * const { data, isLoading } = useInterestsQuery();
 */
export function useInterestsQuery() {
  return useQuery({
    ...InterestAPI.query.all(),
  });
}
