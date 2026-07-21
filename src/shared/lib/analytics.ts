import {
  getAnalytics,
  logEvent as firebaseLogEvent,
  setUserId as firebaseSetUserId,
} from '@react-native-firebase/analytics';
import { ANALYTICS_EVENT } from '@/shared/constants';
import { useAuthStore } from '../../entities/user';

/**
 * # logEvent
 * ---
 * - 간단설명: Firebase Analytics에 커스텀 이벤트를 기록한다 (내부용)
 * - 제약사항 및 특이사항:
 *   - 개발 환경(__DEV__)에서는 콘솔 로그만 출력하고 Firebase 전송하지 않음
 * ---
 * @param eventName 이벤트 이름
 * @param params 이벤트 파라미터 (선택)
 */
const logEvent = async (
  eventName: string,
  params?: Record<string, string | number>,
): Promise<void> => {
  if (__DEV__) {
    console.log('[Analytics] event:', eventName, params);
    return;
  }

  await firebaseLogEvent(getAnalytics(), eventName, params);
};

/**
 * # logProfileCompleted
 * ---
 * - 간단설명: 프로필 등록 완료 이벤트 전송
 * ---
 * @example
 * logProfileCompleted();
 */
export const logProfileCompleted = async () => {
  const { user } = useAuthStore.getState();
  if (!user?.profile_registered) {
    logEvent(ANALYTICS_EVENT.PROFILE_COMPLETED);
  }
};

/**
 * # logProfileExchangeCompleted
 * ---
 * - 간단설명: 프로필 교환 완료 이벤트 전송
 * ---
 * @example
 * logProfileExchangeCompleted();
 */
export const logProfileExchangeCompleted = async () => {
  const { user } = useAuthStore.getState();
  if (!user?.profile_exchanged) {
    await logEvent(ANALYTICS_EVENT.PROFILE_EXCHANGE_COMPLETED);
  }
}

/**
 * # logReviewCompleted
 * ---
 * - 간단설명: 교환 후기 작성 완료 이벤트 전송
 * ---
 * @example
 * logReviewCompleted();
 */
export const logReviewCompleted = async () => {
  const { user } = useAuthStore.getState();
  if (!user?.review_registered) {
    await logEvent(ANALYTICS_EVENT.REVIEW_COMPLETED);
  }
};

/** 테스트용 이벤트 전송 */
export const testLogEvent = async () => {
  await firebaseLogEvent(getAnalytics(), 'test_event', {
    value: 1000,
    name: 'hello'
  });
};

/**
 * # setAnalyticsUserId
 * ---
 * - 간단설명: Firebase Analytics에 사용자 ID를 설정하여 사용자 기준 집계를 활성화한다
 * - 제약사항 및 특이사항:
 *   - 개발 환경(__DEV__)에서는 콘솔 로그만 출력
 *   - 로그인 성공 직후 호출해야 함
 * ---
 * @param userId 사용자 고유 ID (User.id를 문자열로 변환)
 * ---
 * @example
 * setAnalyticsUserId(String(user.id));
 */
export const setAnalyticsUserId = async (userId: string): Promise<void> => {
  if (__DEV__) {
    console.log('[Analytics] setUserId:', userId);
    return;
  }

  await firebaseSetUserId(getAnalytics(), userId);
};
