import { API } from '@/shared/api';
import type { CosmicType } from '@/shared/enums';
import type { CosmicTestResponse, CosmicTypeResponse } from '../model/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

/**
 * # CosmicAPI
 * ---
 * - 간단설명: Cosmic(우주 유형) 관련 API를 정적 메서드로 관리하는 클래스
 * - 제약사항 및 특이사항:
 *   - 모든 엔드포인트는 인증 필요 (Authorization Bearer 토큰)
 *   - query: @lukemorales/query-key-factory 기반 쿼리 키 팩토리
 * ---
 * @example
 * const { data } = await CosmicAPI.fetchTest();
 * const { data } = await CosmicAPI.fetchType('GALAXY');
 */
export class CosmicAPI {
  /**
   * # fetchTest
   * ---
   * - 간단설명: Cosmic 연애 유형 테스트 질문 목록 조회
   * ---
   */
  static fetchTest() {
    return API.get<CosmicTestResponse>('/cosmic/test');
  }

  /**
   * # fetchType
   * ---
   * - 간단설명: 특정 Cosmic 유형의 상세 정보 조회
   * ---
   * @param type Cosmic 유형 (GALAXY | SHOOTING_STAR | LUNA | SOLA)
   */
  static fetchType(type: CosmicType) {
    return API.get<CosmicTypeResponse>(`/cosmic/${type}`);
  }

  /**
   * # updateCosmic
   * ---
   * - 간단설명: 프로필의 코스믹 유형을 수정 (PATCH /profile/cosmic)
   * - 제약사항 및 특이사항:
   *   - 응답 204 No Content
   *   - 인증 필요 (Authorization Bearer 토큰)
   * ---
   * @param cosmicType 변경할 Cosmic 유형 (GALAXY | SHOOTING_STAR | LUNA | SOLA)
   */
  static updateCosmic(cosmicType: CosmicType) {
    return API.patch<void>('/profile/cosmic', { cosmic_type: cosmicType });
  }

  /** 쿼리 키 팩토리 */
  static query = createQueryKeys('cosmic', {
    test: () => ({
      queryKey: ['test'],
      queryFn: async () => {
        const { data } = await CosmicAPI.fetchTest();
        return data;
      },
    }),
    type: (type: CosmicType) => ({
      queryKey: [type],
      queryFn: async () => {
        const { data } = await CosmicAPI.fetchType(type);
        return data;
      },
    }),
  });
}
