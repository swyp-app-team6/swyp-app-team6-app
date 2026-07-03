import React from 'react';
import { Text, View } from 'react-native';
import { Button, Modal } from '@/shared/ui';

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 철회하기 콜백 */
  onCancel: () => void;
  /** 미리보기 콜백 */
  onPreview: () => void;
}

/**
 * # ExchangeConfirmModal
 * ---
 * - 간단설명: QR 스캔 후 프로필 교환 여부를 확인하는 모달
 * - 제약사항 및 특이사항:
 *   - 철회하기: 교환 취소 후 홈으로 이동
 *   - 미리보기: 상대에게 보이는 내 프로필 미리보기로 전환
 * ---
 * @param visible 모달 표시 여부
 * @param onCancel 철회하기 콜백
 * @param onPreview 미리보기 콜백
 * ---
 * @example
 * <ExchangeConfirmModal visible={true} onCancel={handleCancel} onPreview={handlePreview} />
 */
export default function ExchangeConfirmModal({ visible, onCancel, onPreview }: Props) {
  return (
    <Modal visible={visible} title="상대의 프로필과 교환하시겠습니까?">
      <Text className="text-center text-[13px] leading-[18px] text-text-gray4 -mt-6 mb-4">
        {'교환한 프로필은 보관함에서 삭제가 가능하며,\n프로필 카드는 재교환할 수 있습니다.'}
      </Text>
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Button title="철회하기" variant="secondary" onPress={onCancel} />
        </View>
        <View className="flex-1">
          <Button title="미리보기" variant="primary" onPress={onPreview} />
        </View>
      </View>
    </Modal>
  );
}
