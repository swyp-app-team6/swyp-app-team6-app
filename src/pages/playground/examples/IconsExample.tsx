import { Text, View } from 'react-native';
import {
  CameraIcon,
  ProfileIcon,
  GalleryIcon,
  PlaygroundIcon,
  SearchIcon,
  QRIcon,
  LoginIcon,
  HomeIcon,
  CardIcon,
  MyPageIcon,
  KakaoIcon,
  GoogleIcon,
  AppleIcon,
} from '@/shared/ui';
import Section from './Section';

/**
 * # IconsExample
 * ---
 * - 간단설명: SVG 아이콘 모음을 한눈에 확인하는 예제
 * ---
 * @example
 * <IconsExample />
 */
export default function IconsExample() {
  return (
    <Section title="Icons — SVG 아이콘 모음">
      <View className="flex-row flex-wrap gap-6">
        {[
          { label: 'CameraIcon', node: <CameraIcon size={28} color="#374151" /> },
          { label: 'ProfileIcon', node: <ProfileIcon size={28} color="#374151" /> },
          { label: 'GalleryIcon', node: <GalleryIcon size={28} color="#374151" /> },
          { label: 'PlaygroundIcon', node: <PlaygroundIcon size={28} color="#374151" /> },
          { label: 'SearchIcon', node: <SearchIcon size={28} color="#374151" /> },
          { label: 'QRIcon', node: <QRIcon size={28} color="#374151" /> },
          { label: 'LoginIcon', node: <LoginIcon size={28} color="#374151" /> },
          { label: 'HomeIcon', node: <HomeIcon size={28} color="#374151" /> },
          { label: 'CardIcon', node: <CardIcon size={28} color="#374151" /> },
          { label: 'MyPageIcon', node: <MyPageIcon size={28} color="#374151" /> },
          { label: 'KakaoIcon', node: <KakaoIcon size={28} color="#374151" /> },
          { label: 'GoogleIcon', node: <GoogleIcon size={28} /> },
          { label: 'AppleIcon', node: <AppleIcon size={28} color="#374151" /> },
        ].map(({ label, node }) => (
          <View key={label} className="items-center gap-1.5">
            {node}
            <Text className="text-xs text-gray-500">{label}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}
