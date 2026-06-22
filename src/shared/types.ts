import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 * stack navigator type 목록
 * - onboarding = 권한 안내 온보딩
 * - login = 로그인
 * - register = 회원가입 + 프로필 등록
 * - qr = QR 코드 생성/스캔
 * - profile = 프로필 탭
 * - gallery = 갤러리 탭
 * - editProfile = 회원정보 수정
 * - withdrawal = 회원탈퇴
 * - playground = UI 플레이그라운드
 * - noti = 알림 테스트
 */
export type NavigatorType = {
  onboarding: undefined;
  login: undefined;
  register: undefined;
  qr: undefined;
  profile: undefined;
  gallery: undefined;
  editProfile: undefined;
  withdrawal: undefined;
  playground: undefined;
  noti: undefined;
}

/** useNavigation 제네릭 타입 */
export type NavigationPropType = NativeStackNavigationProp<NavigatorType>
