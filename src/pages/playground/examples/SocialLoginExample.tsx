import { View } from 'react-native';
import { KakaoLoginButton, GoogleLoginButton, AppleLoginButton } from '@/shared/ui';
import Section from './Section';

/**
 * # SocialLoginExample
 * ---
 * - 간단설명: 카카오/구글/애플 소셜 로그인 버튼을 확인하는 예제
 * ---
 * @example
 * <SocialLoginExample />
 */
export default function SocialLoginExample() {
  return (
    <Section title="소셜 로그인 — 카카오/구글/애플 로그인 버튼">
      <View className="gap-2">
        <KakaoLoginButton onPress={() => { }} />
        <GoogleLoginButton onPress={() => { }} />
        <AppleLoginButton onPress={() => { }} />
      </View>
    </Section>
  );
}
