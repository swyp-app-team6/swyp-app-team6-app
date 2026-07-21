import { Alert, View } from 'react-native';
import { useAuthStore } from '@/entities/user';
import { Button } from '@/shared/ui';
import Section from './Section';

/**
 * # TokenTestExample
 * ---
 * - 간단설명: 토큰 재발급 테스트를 위한 accessToken/refreshToken 교체 버튼 예제
 * ---
 * @example
 * <TokenTestExample />
 */
export default function TokenTestExample() {
  const { setTokens } = useAuthStore();

  return (
    <Section title="토큰 재발급 테스트용 버튼">
      <View className="gap-3">
        <Button
          title="accessToken → abcde 로 교체"
          variant="secondary"
          onPress={() => {
            const { refreshToken } = useAuthStore.getState();
            setTokens({ accessToken: 'abcde', refreshToken: refreshToken ?? '' });
            Alert.alert('토큰 교체', 'accessToken을 abcde로 교체했습니다.');
          }}
        />
        <Button
          title="access + refresh Token → abcde 로 교체"
          variant="secondary"
          onPress={() => {
            setTokens({ accessToken: 'abcde', refreshToken: 'abcde' });
            Alert.alert('토큰 교체', 'accessToken, refreshToken 모두 abcde로 교체했습니다.');
          }}
        />
      </View>
    </Section>
  );
}
