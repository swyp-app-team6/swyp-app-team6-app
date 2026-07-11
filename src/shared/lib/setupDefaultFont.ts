import { Platform, StyleSheet, Text, TextInput } from 'react-native';

/**
 * # fontWeight → Pretendard fontFamily 매핑
 * ---
 * - 간단설명: fontWeight 값에 대응하는 Pretendard 폰트 파일명 매핑
 */
const WEIGHT_TO_FAMILY: Record<string, string> = {
  '400': 'Pretendard-Regular',
  normal: 'Pretendard-Regular',
  '500': 'Pretendard-Medium',
  '600': 'Pretendard-SemiBold',
  '700': 'Pretendard-Bold',
  bold: 'Pretendard-Bold',
};

/**
 * # resolvePretendardFamily
 * ---
 * - 간단설명: 스타일에서 fontWeight를 읽어 대응하는 Pretendard fontFamily로 변환
 * - 제약사항 및 특이사항:
 *   - 이미 Pretendard가 아닌 fontFamily가 지정된 경우 변환하지 않음
 *   - 배열·객체 스타일 모두 지원 (StyleSheet.flatten 사용)
 */
function resolvePretendardFamily(style: any): any {
  if (!style) return { fontFamily: 'Pretendard-Regular' };

  const flat = StyleSheet.flatten(style);
  const { fontWeight, fontFamily } = flat as any;

  // 다른 폰트가 명시적으로 지정된 경우 변환 스킵
  if (fontFamily && !String(fontFamily).startsWith('Pretendard')) {
    return flat;
  }

  const weight = fontWeight ? String(fontWeight) : '400';
  const resolved = WEIGHT_TO_FAMILY[weight] ?? 'Pretendard-Regular';

  return {
    ...flat,
    fontFamily: resolved,
    ...(Platform.OS === 'android' ? { fontWeight: undefined } : {}),
  };
}

/**
 * # setupDefaultFont
 * ---
 * - 간단설명: 앱 전체 기본 폰트를 Pretendard로 설정하고 fontWeight→fontFamily 자동 매핑
 * - 제약사항 및 특이사항:
 *   - Text, TextInput의 render를 래핑하여 fontWeight에 맞는 Pretendard 폰트 자동 적용
 *   - iOS: faux bold 방지 (Regular + bold weight → 합성 볼드 문제 해결)
 *   - Android: fontWeight를 제거하고 fontFamily만으로 weight 표현
 *   - 앱 진입점(App.tsx)에서 import 한 번만 수행
 * ---
 * @example
 * import '@/shared/lib/setupDefaultFont';
 */

// Text 래핑
const originalTextRender = (Text as any).render;
if (originalTextRender) {
  (Text as any).render = function (props: any, ref: any) {
    const newProps = {
      ...props,
      style: resolvePretendardFamily(props.style),
    };
    return originalTextRender.call(this, newProps, ref);
  };
} else {
  // fallback: defaultProps 방식
  // @ts-ignore
  if (Text.defaultProps == null) { (Text as any).defaultProps = {}; }
  (Text as any).defaultProps.style = { fontFamily: 'Pretendard-Regular' };
}

// TextInput 래핑
const originalTextInputRender = (TextInput as any).render;
if (originalTextInputRender) {
  (TextInput as any).render = function (props: any, ref: any) {
    const newProps = {
      ...props,
      style: resolvePretendardFamily(props.style),
    };
    return originalTextInputRender.call(this, newProps, ref);
  };
} else {
  // @ts-ignore
  if (TextInput.defaultProps == null) { (TextInput as any).defaultProps = {}; }
  (TextInput as any).defaultProps.style = { fontFamily: 'Pretendard-Regular' };
}
