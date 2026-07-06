import { useQuery } from '@tanstack/react-query';
import { ProfileAPI } from './profileApi';

/**
 * # useProfileByUuidQuery
 * ---
 * - 간단설명: QR UUID를 통해 다른 사용자의 프로필을 조회하는 React Query 훅
 * - 제약사항 및 특이사항:
 *   - uuid가 존재할 때만 쿼리 실행 (enabled 옵션)
 * ---
 * @param uuid 대상 사용자의 QR UUID
 * @param options.enabled 쿼리 실행 여부 (기본값: uuid가 존재할 때)
 * @example
 * const { data: profile } = useProfileByUuidQuery('uuid-string');
 */
export default function useProfileByUuidQuery(uuid: string, options?: { enabled?: boolean }) {
  return useQuery({
    ...ProfileAPI.query.byUuid(uuid),
    enabled: options?.enabled ?? !!uuid,
  });
}
