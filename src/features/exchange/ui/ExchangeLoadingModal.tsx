import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
}

/**
 * # ExchangeLoadingModal
 * ---
 * - 간단설명: 프로필 교환 대기 중 로딩 오버레이
 * - 제약사항 및 특이사항:
 *   - dismiss 불가 — store가 상태 전환을 관리
 *   - 교환 완료 시 자동으로 result 단계로 전환
 * ---
 * @param visible 모달 표시 여부
 * ---
 * @example
 * <ExchangeLoadingModal visible={true} />
 */
export default function ExchangeLoadingModal({ visible }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View className="w-[200px] items-center rounded-2xl bg-white px-5 py-8">
          <ActivityIndicator size="large" color="#8C39FB" />
          <Text className="mt-4 text-center text-base font-bold leading-[24px] text-text-black">
            상대방과 프로필 교환을 기다리고 있어요!
          </Text>
        </View>
      </View>
    </Modal>
  );
}
