import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Card from '@/shared/ui/Card';

/**
 * 오른쪽 스와이프로 삭제할 수 있는 카드 컴포넌트.
 * `react-native-gesture-handler`의 `ReanimatedSwipeable`을 사용합니다.
 *
 * @example
 * ```tsx
 * <SwipeableCard onDelete={() => setItems(prev => prev.filter(i => i.id !== item.id))}>
 *   <Text>{item.title}</Text>
 * </SwipeableCard>
 * ```
 */
interface Props {
  children: React.ReactNode;
  /** 삭제 버튼 탭 시 호출 */
  onDelete: () => void;
}

function DeleteAction({ onDelete }: { onDelete: () => void }) {
  return (
    <TouchableOpacity
      onPress={onDelete}
      activeOpacity={0.8}
      className="bg-red-500 justify-center items-center px-6 rounded-2xl my-0.5"
    >
      <Text className="text-white font-semibold text-sm">삭제</Text>
    </TouchableOpacity>
  );
}

export default function SwipeableCard({ children, onDelete }: Props) {
  return (
    <ReanimatedSwipeable
      renderRightActions={() => <DeleteAction onDelete={onDelete} />}
      rightThreshold={40}
      overshootRight={false}
    >
      <Card>{children}</Card>
    </ReanimatedSwipeable>
  );
}
