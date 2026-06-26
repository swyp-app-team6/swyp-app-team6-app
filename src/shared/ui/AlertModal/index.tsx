import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Modal } from '@/shared/ui/Modal';

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 모달 제목 */
  title?: string;
  /** 알림 메시지 */
  message: string;
  /** 확인 버튼 텍스트. 기본값: '확인' */
  confirmText?: string;
  /** 취소 버튼 텍스트. 미지정 시 취소 버튼 숨김 */
  cancelText?: string;
  /** 확인 버튼 콜백 */
  onConfirm: () => void;
  /** 취소 버튼 또는 배경 탭 콜백 */
  onCancel?: () => void;
}

/**
 * # AlertModal
 * ---
 * - 간단설명: 확인/취소 알림 다이얼로그
 * - 제약사항 및 특이사항:
 *   - cancelText 미지정 시 확인 버튼만 표시
 *   - 기존 Modal 컴포넌트 기반
 * ---
 * @param visible 모달 표시 여부
 * @param title 모달 제목
 * @param message 알림 메시지
 * @param confirmText 확인 버튼 텍스트
 * @param cancelText 취소 버튼 텍스트
 * @param onConfirm 확인 콜백
 * @param onCancel 취소 콜백
 * ---
 * @example
 * ```tsx
 * <AlertModal
 *   visible={showAlert}
 *   title="삭제 확인"
 *   message="정말 삭제하시겠습니까?"
 *   confirmText="삭제"
 *   cancelText="취소"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowAlert(false)}
 * />
 * ```
 */
export default function AlertModal({
  visible,
  title,
  message,
  confirmText = '확인',
  cancelText,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} onClose={onCancel} title={title}>
      <Text className="text-base text-gray-700 mb-5">{message}</Text>
      <View className="flex-row justify-end gap-3">
        {cancelText && (
          <Pressable
            onPress={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            <Text className="text-sm font-semibold text-gray-700">{cancelText}</Text>
          </Pressable>
        )}
        <Pressable
          onPress={onConfirm}
          className="rounded-lg bg-blue-600 px-4 py-2"
        >
          <Text className="text-sm font-semibold text-white">{confirmText}</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
