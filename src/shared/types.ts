import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 * stack navigator type 목록
 * - login = 로그인
 * - register = 회원가입
 * - home = 홈
 * - profileCard = 프로필카드
 * - mypage = 마이페이지
 * - withdrawal = 회원탈퇴
 */
export type NavigatorType = {
  login: undefined;
  register: undefined;
  home: undefined;
  profileCard: undefined;
  mypage: undefined;
  withdrawal: undefined;
}

/** useNavigation 제네릭 타입 */
export type NavigationPropType = NativeStackNavigationProp<NavigatorType>
