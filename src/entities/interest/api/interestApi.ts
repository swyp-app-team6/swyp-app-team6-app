import { API } from '@/shared/api';
import type { InterestResponse } from '../model/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * # InterestAPI
 * ---
 * - 간단설명: 관심사 관련 API를 정적 메서드로 관리하는 클래스
 * - 제약사항 및 특이사항:
 *   - 모든 엔드포인트는 인증 필요 (Authorization Bearer 토큰)
 *   - query: @lukemorales/query-key-factory 기반 쿼리 키 팩토리
 * ---
 * @example
 * const { data } = await InterestAPI.fetchInterests();
 */
export class InterestAPI {
  /**
   * # fetchInterests
   * ---
   * - 간단설명: 선택 가능한 관심사 카테고리 목록 조회
   * ---
   */
  static fetchInterests() {
    return API.get<InterestResponse>('/interests');
  }

  /** 쿼리 키 팩토리 */
  static query = createQueryKeys('interest', {
    all: () => ({
      queryKey: ['all'],
      queryFn: async () => {
        const { data } = await InterestAPI.fetchInterests();
        return data;
      },
    }),
  });
}
