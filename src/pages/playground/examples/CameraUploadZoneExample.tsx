import { Alert, View } from 'react-native';
import { CameraUploadZone } from '@/shared/ui';
import Section from './Section';

/**
 * # CameraUploadZoneExample
 * ---
 * - 간단설명: CameraUploadZone 프로필 사진 촬영/업로드 영역을 확인하는 예제
 * ---
 * @example
 * <CameraUploadZoneExample />
 */
export default function CameraUploadZoneExample() {
  return (
    <Section title="CameraUploadZone — 프로필 사진 촬영/업로드 영역">
      <View className="flex-row gap-3">
        <CameraUploadZone onPress={() => Alert.alert('카메라', '이미지 선택')} />
        <CameraUploadZone
          imageUri="https://picsum.photos/120/148"
          onPress={() => Alert.alert('카메라', '이미지 변경')}
        />
      </View>
    </Section>
  );
}
