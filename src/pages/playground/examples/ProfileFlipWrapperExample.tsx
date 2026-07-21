import { Text, View } from 'react-native';
import UserProfileCard from '@/shared/ui/ProfileCard/UserProfileCard';
import ProfileFlipWrapper from '@/shared/ui/ProfileCard/ProfileFlipWrapper';
import ProfileCardGradientBackground from '@/shared/ui/ProfileCard/ProfileCardGradientBackground';
import Section from './Section';

/**
 * # ProfileFlipWrapperExample
 * ---
 * - 간단설명: ProfileFlipWrapper 앞/뒤 플립 전환을 확인하는 예제
 * ---
 * @example
 * <ProfileFlipWrapperExample />
 */
export default function ProfileFlipWrapperExample() {
  return (
    <Section title="ProfileFlipWrapper — 앞/뒤 플립 전환">
      <View className="items-center">
        <ProfileFlipWrapper
          front={
            <UserProfileCard
              profileImageUri="https://picsum.photos/284/392"
              nickname="플립 앞면"
              age="26"
              interests={['여행', '사진']}
              badgeLevel="luna"
            />
          }
          back={
            <ProfileCardGradientBackground>
              <View className="flex-1 items-center justify-center p-5">
                <Text className="text-lg font-bold text-white">플립 뒷면</Text>
                <Text className="mt-2 text-sm text-white/80 text-center">
                  코스믹 유형 결과나{'\n'}기타 정보를 표시하는 뒷면입니다.
                </Text>
              </View>
            </ProfileCardGradientBackground>
          }
        />
      </View>
    </Section>
  );
}
