import React from 'react';
import {
  Modal as RNModal,
  type ModalProps as RNModalProps,
  Pressable,
  Text,
  View,
} from 'react-native';

export type ModalProps = Omit<RNModalProps, 'children'> & {
  /** 배경 또는 안드로이드 back 버튼 탭 시 호출 */
  onClose?: () => void;
  /** 모달 상단 제목 (선택) */
  title?: string;
  /** 모달 본문 메시지 텍스트 */
  message?: string;
  children?: React.ReactNode;
};

/**
 * # Modal
 * FIXME: 이거 없애고 Alert dialog 형태로 변경, 함수호출로 노출시키는 방식으로 변경필요
 * ---
 * - 간단설명: 중앙 팝업 형태의 공용 모달 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 반투명 배경 오버레이 + 중앙 흰색 카드 (300px, 12px 라운드)
 *   - message: 16px medium 중앙정렬 본문
 *   - children: 260px 폭 하단 버튼 영역 (message와 40px 간격)
 *   - 배경 탭 시 onClose 호출
 * ---
 * @param message 모달 본문 메시지
 * @param onClose 배경 탭 또는 back 버튼 시 호출
 * @param children 하단 버튼 등 커스텀 콘텐츠 (260px 폭)
 * ---
 * @example
 * ```tsx
 * <Modal
 *   visible={visible}
 *   onClose={() => setVisible(false)}
 *   message="사용할 수 없는 계정입니다."
 * >
 *   <Button title="확인" onPress={() => setVisible(false)} />
 * </Modal>
 * ```
 */
export function Modal({ onClose, title, message, children, ...rest }: ModalProps) {
  return (
    <RNModal
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...rest}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/50"
        onPress={onClose}
      >
        <Pressable
          className="w-[300px] rounded-xl bg-white px-5 pb-7 pt-10"
          onPress={e => e.stopPropagation()}
        >
          {title && (
            <Text className="mb-1 text-center text-base font-bold text-text-black tracking-tight leading-[22.4px]">
              {title}
            </Text>
          )}
          {message && (
            <Text className="text-center text-base font-medium text-text-black tracking-tight leading-[22.4px]">
              {message}
            </Text>
          )}
          {rest.visible && children && (
            <View className={`${title ? 'mt-4' : 'mt-10'} w-[260px] self-center`}>
              {children}
            </View>
          )}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
