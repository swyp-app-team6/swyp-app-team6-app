import type { CosmicType } from '@/features/register/model/cosmicTypeResults';
import { INTEREST } from '@/entities/user/model/types';

/**
 * 홈 화면 프로필 목 데이터 타입
 * - nickname = 닉네임
 * - age = 만 나이
 * - profileImageUri = 프로필 이미지 URI (null이면 placeholder)
 * - interests = 관심사 목록
 * - cosmicType = 코스믹 유형
 */
interface MockHomeProfile {
  /** 닉네임 */
  nickname: string;
  /** 만 나이 */
  age: string;
  /** 프로필 이미지 URI */
  profileImageUri: string | null;
  /** 관심사 목록 */
  interests: INTEREST[];
  /** 코스믹 유형 */
  cosmicType: CosmicType;
}

/**
 * # HAS_PROFILE
 * ---
 * - 간단설명: 프로필 등록 여부 토글 상수 (UI 개발용)
 * - 제약사항 및 특이사항:
 *   - true: 프로필 카드 표시, false: 빈 카드 표시
 *   - 추후 API 연동 시 제거
 * ---
 */
export const HAS_PROFILE = true;

/**
 * # MOCK_HOME_PROFILE
 * ---
 * - 간단설명: 홈 화면 프로필 카드 표시용 목 데이터
 * - 제약사항 및 특이사항:
 *   - 추후 API 연동 시 실제 데이터로 교체
 * ---
 */
export const MOCK_HOME_PROFILE: MockHomeProfile = {
  nickname: '김오르비',
  age: '25',
  profileImageUri: null,
  interests: [INTEREST.TRAVEL, INTEREST.MUSIC, INTEREST.FOOD],
  cosmicType: 'SHOOTING_STAR',
};
