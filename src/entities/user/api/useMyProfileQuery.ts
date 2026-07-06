import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ProfileAPI } from './profileApi';
import useAuthStore from '../model/authStore';
import { AxiosError } from 'axios';

/**
 * # useMyProfileQuery
 * ---
 * - 간단설명: 현재 로그인된 사용자의 프로필 정보를 조회하는 React Query 훅
 * - 제약사항 및 특이사항:
 *   - 인증 토큰이 존재할 때만 쿼리 실행
 *   - 프로필 미등록 시 API가 404를 반환하면 data는 undefined
 * ---
 * @example
 * const { data: profile, isLoading } = useMyProfileQuery();
 */
export default function useMyProfileQuery() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useQuery({
    ...ProfileAPI.query.me(),
    enabled: !!accessToken,
    throwOnError: (e) => {
      console.error(e);
      const err = e as AxiosError;
      // 404에러면 refetch 중단 (프로필없음)
      if (err.response?.status === 404) {
        queryClient.cancelQueries(ProfileAPI.query.me());
        return false;
      }
      return false;
    }
  });
}
