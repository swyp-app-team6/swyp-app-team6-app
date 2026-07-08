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
export type NavigatorType = {
  onboarding: undefined;
  login: undefined;
  defaultLogin: undefined;
  registerProfile: undefined;
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
  editProfile: undefined;
  accountEdit: undefined;
  withdrawalReason: undefined;
  withdrawalConfirm: { reason: string };
  playground: undefined;
  apiLog: undefined;
  safeAreaTest: undefined;
}

/** useNavigation 제네릭 타입 */
export type NavigationPropType = NativeStackNavigationProp<NavigatorType>
