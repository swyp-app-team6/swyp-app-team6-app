import React, { memo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { FlipIcon } from '../icons';

/**
 * # ProfileFlipWrapper
 * ---
 * - 간단설명: 카드 앞면 ↔ 뒷면 전환 컨테이너
 * - 제약사항 및 특이사항:
 *   - 앞면/뒷면을 props로 받아 토글 버튼으로 전환
 *   - onFlip 콜백으로 부모에게 현재 상태 전달
 * ---
 * @param front 앞면 ReactNode
 * @param back 뒷면 ReactNode
 * @param onFlip flip 상태 변경 콜백
 * ---
 * @example
 * <ProfileFlipWrapper
 *   front={<UserProfileCard ... />}
 *   back={<HomeCardBack ... />}
 * />
 */
function ProfileFlipWrapper({ front, back, onFlip }: {
  front: React.ReactNode;
  back: React.ReactNode;
  onFlip?: (isFlipped: boolean) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    onFlip?.(next);
  };

  return (
    <View className="items-center">
      {isFlipped ? back : front}

      <Pressable
        onPress={handleFlip}
        className="mt-4 flex-row items-center self-center gap-1 rounded-[20px] px-3 py-2"
      >
        <FlipIcon size={20} color="#888888" />
        <Text className="text-[12px] tracking-tight text-text-gray4">
          {isFlipped ? '앞면 보기' : '뒷면 보기'}
        </Text>
      </Pressable>
    </View>
  );
}

export default memo(ProfileFlipWrapper);
