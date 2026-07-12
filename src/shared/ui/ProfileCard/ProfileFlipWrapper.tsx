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
 *   - cardRef를 전달하면 카드 영역(뒷면보기 버튼 제외)만 참조 가능
 * ---
 * @param front 앞면 ReactNode
 * @param back 뒷면 ReactNode
 * @param onFlip flip 상태 변경 콜백
 * @param cardRef 카드 영역만 참조하는 ref (이미지 저장 등에 활용)
 * ---
 * @example
 * <ProfileFlipWrapper
 *   front={<UserProfileCard ... />}
 *   back={<HomeCardBack ... />}
 *   cardRef={viewRef}
 * />
 */
function ProfileFlipWrapper({ front, back, onFlip, cardRef }: {
  front: React.ReactNode;
  back: React.ReactNode;
  onFlip?: (isFlipped: boolean) => void;
  cardRef?: React.RefObject<View | null>;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    onFlip?.(next);
  };

  return (
    <View className="items-center">
      <View ref={cardRef} collapsable={false}>
        {isFlipped ? back : front}
      </View>

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
