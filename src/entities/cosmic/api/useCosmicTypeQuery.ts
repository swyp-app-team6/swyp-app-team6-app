import { useQuery } from '@tanstack/react-query';
import type { CosmicType } from '@/shared/enums';
import { CosmicAPI } from './cosmicApi';

/**
 * # useCosmicTypeQuery
 * ---
 * - 간단설명: 특정 코스믹 유형의 상세 정보를 조회하는 React Query 훅
 * - 제약사항 및 특이사항:
 *   - type이 존재할 때만 쿼리 실행
 * ---
 * @param type 코스믹 유형 코드
 * @example
 * const { data: typeInfo } = useCosmicTypeQuery('SHOOTING_STAR');
 */
export default function useCosmicTypeQuery(type: CosmicType | undefined) {
  return useQuery({
    ...CosmicAPI.query.type(type!),
    enabled: !!type,
  });
}
