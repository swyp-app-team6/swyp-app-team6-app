import { Alert, Text, View } from 'react-native';
import { PopoverMenu } from '@/shared/ui';
import Section from './Section';

/**
 * # PopoverMenuExample
 * ---
 * - 간단설명: PopoverMenu 드롭다운 메뉴의 right/left 정렬을 확인하는 예제
 * ---
 * @example
 * <PopoverMenuExample />
 */
export default function PopoverMenuExample() {
  return (
    <Section title="PopoverMenu — 버튼 클릭 시 드롭다운 메뉴">
      <View className="flex-row gap-4">
        <PopoverMenu
          items={[
            { label: '수정', onPress: () => Alert.alert('수정') },
            { label: '공유', onPress: () => Alert.alert('공유') },
            { label: '삭제', onPress: () => Alert.alert('삭제'), destructive: true },
          ]}
        >
          <View className="rounded-lg border border-gray-300 px-4 py-2">
            <Text className="text-sm text-gray-700">⋮ 메뉴 (right)</Text>
          </View>
        </PopoverMenu>
        <PopoverMenu
          align="left"
          items={[
            { label: '프로필 보기', onPress: () => Alert.alert('프로필') },
            { label: '신고', onPress: () => Alert.alert('신고'), destructive: true },
          ]}
        >
          <View className="rounded-lg border border-gray-300 px-4 py-2">
            <Text className="text-sm text-gray-700">⋮ 메뉴 (left)</Text>
          </View>
        </PopoverMenu>
      </View>
    </Section>
  );
}
