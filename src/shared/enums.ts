/**
 * 앱 라우트 내비게이션 이름
 * - HOME = 홈(Todo) 탭
 * - LOGIN = 로그인
 * - REGISTER = 회원가입
 * - PROFILE = 프로필 탭
 * - GALLERY = 갤러리 탭
 * - PLAYGROUND = UI 플레이그라운드
 * - NOTI = 알림 테스트
 */
export const NAV_NAME = {
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
  PROFILE: 'Profile',
  GALLERY: 'Gallery',
  PLAYGROUND: 'Playground',
  NOTI: 'Noti',
} as const;
export type NAV_NAME = (typeof NAV_NAME)[keyof typeof NAV_NAME];

/**
 * 스택 네비게이터 화면 파라미터 목록
 */
export type RootStackParamList = {
  [NAV_NAME.HOME]: undefined;
  [NAV_NAME.LOGIN]: undefined;
  [NAV_NAME.REGISTER]: undefined;
  [NAV_NAME.PROFILE]: undefined;
  [NAV_NAME.GALLERY]: undefined;
  [NAV_NAME.PLAYGROUND]: undefined;
  [NAV_NAME.NOTI]: undefined;
};
