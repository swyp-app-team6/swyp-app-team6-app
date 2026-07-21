import { Alert, View } from 'react-native';
import UserProfileCard from '@/shared/ui/ProfileCard/UserProfileCard';
import Section from './Section';

/**
 * # UserProfileCardExample
 * ---
 * - 간단설명: UserProfileCard 유저 사진+정보 프로필 카드를 확인하는 예제
 * ---
 * @example
 * <UserProfileCardExample />
 */
export default function UserProfileCardExample() {
  return (
    <Section title="UserProfileCard — 유저 사진+정보 프로필 카드">
      <View className="items-center">
        <UserProfileCard
          profileImageUri="https://picsum.photos/284/392"
          nickname="이영희"
          age="28"
          interests={['운동', '독서', '요리']}
          badgeLevel="solar"
          onPress={() => Alert.alert('UserProfileCard', '카드 클릭')}
        />
      </View>
    </Section>
  );
}
