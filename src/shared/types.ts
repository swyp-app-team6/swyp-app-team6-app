import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 * stack navigator type 목록
 * - login = 로그인
 * - register = 회원가입
 * - home = 홈(Todo) 탭
 * - profile = 프로필 탭
 * - gallery = 갤러리 탭
 * - playground = UI 플레이그라운드
 * - noti = 알림 테스트
 */
export type NavigatorType = {
  login: undefined;
  register: undefined;
  home: undefined;
  profile: undefined;
  gallery: undefined;
  playground: undefined;
  noti: undefined;
}

/** useNavigation 제네릭 타입 */
export type NavigationPropType = NativeStackNavigationProp<NavigatorType>