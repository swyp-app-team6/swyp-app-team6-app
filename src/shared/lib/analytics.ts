import {
  getAnalytics,
  logEvent as firebaseLogEvent,
  logScreenView as firebaseLogScreenView,
  setUserId as firebaseSetUserId,
} from '@react-native-firebase/analytics';

/**
 * # logScreenView
 * ---
 * - 간단설명: Firebase Analytics에 화면 진입 이벤트(screen_view)를 기록한다
 * - 제약사항 및 특이사항:
 *   - 개발 환경(__DEV__)에서는 콘솔 로그만 출력하고 Firebase 전송하지 않음
 *   - screenName은 라우트명과 일치시키는 것을 권장
 * ---
 * @param screenName 화면 이름 (예: 'home', 'qr', 'storage')
 * @param screenClass 화면 클래스명 (선택, 기본값: screenName)
 * ---
 * @example
 * logScreenView('home');
 * logScreenView('profileStep1', 'ProfileStep1Page');
 */
export const logScreenView = async (
  screenName: string,
  screenClass?: string,
): Promise<void> => {
  if (__DEV__) {
    console.log('[Analytics] screen_view:', screenName, screenClass);
    return;
  }

  await firebaseLogScreenView(getAnalytics(), {
    screen_name: screenName,
    screen_class: screenClass ?? screenName,
  });
};

/**
 * # logEvent
 * ---
 * - 간단설명: Firebase Analytics에 커스텀 이벤트를 기록한다
 * - 제약사항 및 특이사항:
 *   - 개발 환경(__DEV__)에서는 콘솔 로그만 출력하고 Firebase 전송하지 않음
 *   - eventName은 Firebase 이벤트 명명 규칙 준수 (영문+숫자+언더스코어, 40자 이내)
 *   - 예약된 이벤트명 사용 금지 (ad_click, app_update, first_open, error 등)
 * ---
 * @param eventName 이벤트 이름 (예: 'qr_scan_success', 'profile_share')
 * @param params 이벤트 파라미터 (선택)
 * ---
 * @example
 * logEvent('qr_scan_success');
 * logEvent('profile_share', { profileId: 123, method: 'qr' });
 */
export const logEvent = async (
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
