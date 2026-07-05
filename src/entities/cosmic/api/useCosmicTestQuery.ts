import { useQuery } from '@tanstack/react-query';
import { CosmicAPI } from './cosmicApi';

/**
 * # useCosmicTestQuery
 * ---
 * - 간단설명: 코스믹 유형 테스트 질문 목록을 조회하는 React Query 훅
 * ---
 * @example
 * const { data: testData, isLoading } = useCosmicTestQuery();
 */
export default function useCosmicTestQuery() {
  return useQuery({
    ...CosmicAPI.query.test(),
  });
}
