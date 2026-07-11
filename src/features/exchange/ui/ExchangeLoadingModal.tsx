import React from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 취소 콜백 */
  onCancel: () => void;
}

/**
 * # ExchangeLoadingModal
 * ---
 * - 간단설명: 프로필 교환 대기 중 로딩 오버레이
 * - 제약사항 및 특이사항:
 *   - 교환 완료 시 자동으로 result 단계로 전환
 *   - 취소하기 버튼으로 교환 취소 가능
 * ---
 * @param visible 모달 표시 여부
 * @param onCancel 취소 콜백
 * ---
 * @example
 * <ExchangeLoadingModal visible={true} onCancel={handleCancel} />
 */
export default function ExchangeLoadingModal({ visible, onCancel }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View className="w-[300px] items-center rounded-xl bg-white px-5 py-7 gap-4">
          <Text className="text-center text-base font-bold leading-[22.4px] text-[#1A1A1A]">
            상대방과 프로필 교환을{'\n'}기다리고 있어요!
          </Text>
          <View className="w-[260px] h-[180px] items-center justify-center overflow-hidden p-6">
            <Image
              source={require('@/assets/characters/profile-exchange-loading.png')}
              style={{ width: 200, height: 125 }}
              resizeMode="contain"
            />
          </View>
          <Pressable onPress={onCancel} hitSlop={8}>
            <Text className="text-sm text-[#999999] underline">취소하기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
