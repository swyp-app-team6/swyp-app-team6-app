/**
 * API 요청 timeout
 */
export const NETWORK_TIMEOUT_MS = 3000;

export const NETWORK_RETRY_COUNT = 2;

/**
 * 개인정보 처리방침 노션 링크
 */
export const PRIVACY_URL = 'https://real-jellyfish-10c.notion.site/39444f56101180bcb54fe576bb83b17e?source=copy_link';

/**
 * 이용 약관
 */
export const SERVICE_URL = 'https://real-jellyfish-10c.notion.site/39444f56101180c4b0cee0382a20c102?source=copy_link';

/**
 * 공지사항
 */
export const NOTICE_URL = 'https://real-jellyfish-10c.notion.site/39544f56101180efac92fc343e305a1e?pvs=74';

/**
 * Firebase Analytics 이벤트 ID
 * - SIGNUP_COMPLETE = 회원가입(소셜 로그인) 완료
 * - PROFILE_COMPLETED = 프로필 등록 완료
 * - PROFILE_EXCHANGE_COMPLETED = 프로필 교환 완료
 * - REVIEW_COMPLETED = 교환 후기 작성 완료
 */
export const ANALYTICS_EVENT = {
  /** 회원가입(소셜 로그인) 완료 */
  SIGNUP_COMPLETE: 'signup_complete',
  /** 프로필 등록 완료 */
  PROFILE_COMPLETED: 'profile_completed',
  /** 프로필 교환 완료 */
  PROFILE_EXCHANGE_COMPLETED: 'profile_exchange_completed',
  /** 교환 후기 작성 완료 */
  REVIEW_COMPLETED: 'review_completed',
} as const;