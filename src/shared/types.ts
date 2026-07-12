import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 * stack navigator type 목록
 * - onboarding = 온보딩
 * - login = 로그인
 * - register = 회원가입
 * - home = 홈
 * - profileCard = 프로필카드
 * - mypage = 마이페이지
 * - accountEdit = 계정 정보 수정
 * - withdrawalReason = 탈퇴 사유 선택
 * - withdrawalConfirm = 탈퇴 확인
 * - profileDetail = 프로필 상세보기
 */
/** 프로필 등록/수정 단계 공통 파라미터 */
type ProfileStepParams = { mode: 'register' | 'edit' };

export type NavigatorType = {
  onboarding: undefined;
  login: undefined;
  defaultLogin: undefined;
  home: undefined;
  profileCard: undefined;
  mypage: undefined;
  qr: undefined;
  storage: undefined;
  storageAll: undefined;
  profileDetail: undefined;
  exchangeResult: undefined;
  exchangedProfileDetail: { profileId: number };
  writeReview: { profileId: number };
  cosmicTest: undefined;
  profileStep1: ProfileStepParams;
  profileStep2: ProfileStepParams;
  profileStep3: ProfileStepParams;
  profileStep4: ProfileStepParams;
  profileStep5: ProfileStepParams;
  profileStep6: ProfileStepParams;
  profileComplete: ProfileStepParams;
  appSetting: undefined;
  accountEdit: undefined;
  withdrawalReason: undefined;
  withdrawalConfirm: { reason: string };
  playground: undefined;
  apiLog: undefined;
  safeAreaTest: undefined;
}

/** useNavigation 제네릭 타입 */
export type NavigationPropType = NativeStackNavigationProp<NavigatorType>
