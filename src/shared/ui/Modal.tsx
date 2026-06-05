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
  /** 모달 상단 제목 텍스트 */
  title?: string;
  children: React.ReactNode;
};

/**
 * 공용 모달 컴포넌트.
 *
 * @example
 * ```tsx
 * const [visible, setVisible] = useState(false);
 *
 * <Modal
 *   visible={visible}
 *   onClose={() => setVisible(false)}
 *   title="삭제 확인"
 * >
 *   <Text>정말 삭제하시겠습니까?</Text>
 *   <Button title="삭제" variant="primary" onPress={handleDelete} />
 * </Modal>
 * ```
 */
export function Modal({ onClose, title, children, ...rest }: ModalProps) {
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
          className="w-4/5 rounded-2xl bg-white p-5"
          onPress={e => e.stopPropagation()}
        >
          {title && (
            <Text className="mb-3 text-lg font-bold text-gray-900">{title}</Text>
          )}
          {rest.visible && children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}