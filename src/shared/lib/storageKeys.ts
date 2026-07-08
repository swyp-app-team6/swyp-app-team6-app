/**
 * 스토리지 키 상수
 * - 앱 전역에서 사용하는 AsyncStorage/EncryptedStorage 키를 한 곳에서 관리
 * - 키 중복·오타 방지 목적
 */
export const STORAGE_KEYS = {
  /** 액세스 토큰 (EncryptedStorage) */
  ACCESS_TOKEN: 'accessToken',
  /** 리프레시 토큰 (EncryptedStorage) */
  REFRESH_TOKEN: 'refreshToken',
  /** 온보딩 완료 여부 (AsyncStorage) */
  HAS_SEEN_ONBOARDING: 'hasSeenOnboarding',
  /** 프로필 생성 필요 여부 (AsyncStorage) */
  IS_PROFILE_CREATED: 'isProfileCreated',
  /** 이용약관 동의 필요 여부 (AsyncStorage) */
  IS_AGREED_TO_TERMS: 'isAgreedToTerms',
  /** 접근권한 안내 필요 여부 (AsyncStorage) */
  IS_PERMISSION_ALLOWED: 'isPermissionAllowed',
  /** 첫 페이지 방문 여부 (AsyncStorage) */
  HAS_VISITED_FIRST_PAGE: 'hasVisitedFirstPage',
} as const;
export type STORAGE_KEYS = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
