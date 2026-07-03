import { MOCK_STORAGE_PROFILE_DETAILS } from '@/entities/storage';
import type { StorageProfileDetail } from '@/entities/storage';
import type { QRExchangePayload } from './types';

/** QR 토큰 유효 시간 (ms) — 60초 */
const QR_TTL_MS = 60_000;

/**
 * # resolveScannedProfile
 * ---
 * - 간단설명: userId로 목 프로필 상세 데이터를 조회
 * - 제약사항 및 특이사항: 목 데이터에 없는 ID는 null 반환
 * ---
 * @param userId 조회할 프로필 ID
 */
export function resolveScannedProfile(userId: number): StorageProfileDetail | null {
  return MOCK_STORAGE_PROFILE_DETAILS.find((p) => p.id === userId) ?? null;
}

/**
 * # computeCommonInterests
 * ---
 * - 간단설명: 두 관심사 목록의 교집합을 반환
 * ---
 * @param mine 내 관심사 목록
 * @param theirs 상대 관심사 목록
 */
export function computeCommonInterests(mine: string[], theirs: string[]): string[] {
  const mySet = new Set(mine);
  return theirs.filter((interest) => mySet.has(interest));
}

/**
 * # generateMockQRPayload
 * ---
 * - 간단설명: 테스트용 QR 교환 페이로드를 생성
 * - 제약사항 및 특이사항: 추후 API 연동 시 서버 발급 토큰으로 교체
 * ---
 * @param userId 프로필 소유자 ID
 */
export function generateMockQRPayload(userId: number): QRExchangePayload {
  return {
    type: 'swyp_exchange',
    userId,
    token: `mock_token_${userId}_${Date.now()}`,
    expiresAt: Date.now() + QR_TTL_MS,
  };
}
