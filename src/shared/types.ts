import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 * stack navigator type 목록
 * - onboarding = 온보딩
 * - login = 로그인
 * - register = 회원가입
 * - home = 홈
 * - profileCard = 프로필카드
 * - mypage = 마이페이지
 * - withdrawal = 회원탈퇴
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
  withdrawal: undefined;
  playground: undefined;
}

/** useNavigation 제네릭 타입 */
export type NavigationPropType = NativeStackNavigationProp<NavigatorType>
