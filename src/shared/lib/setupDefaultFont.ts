import { Text, TextInput } from 'react-native';

/**
 * # setupDefaultFont
 * ---
 * - 간단설명: 앱 전체 기본 폰트를 Pretendard로 설정
 * - 제약사항 및 특이사항:
 *   - Text, TextInput의 defaultProps에 fontFamily 적용
 *   - Android에서는 fontWeight별 fontFamily 자동 매핑 불가하므로 Regular로 통일
 *   - 앱 진입점(App.tsx)에서 import 한 번만 수행
 * ---
 * @example
 * import '@/shared/lib/setupDefaultFont';
 */

const defaultFontFamily = 'Pretendard-Regular';

// @ts-ignore — defaultProps는 React Native 내부 API
if (Text.defaultProps == null) {
  // @ts-ignore
  Text.defaultProps = {};
}
// @ts-ignore
Text.defaultProps.style = { fontFamily: defaultFontFamily };

// @ts-ignore
if (TextInput.defaultProps == null) {
  // @ts-ignore
  TextInput.defaultProps = {};
}
// @ts-ignore
TextInput.defaultProps.style = { fontFamily: defaultFontFamily };
