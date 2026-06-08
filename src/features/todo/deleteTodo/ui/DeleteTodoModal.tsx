import useModal from '@/shared/lib/useModal';
import React from 'react'
import { Button, Text, View } from 'react-native';
import useDeleteTodoMutation from '../api/useDeleteTodoMutation';

/**
 * # DeleteTodoModal
 * ---
 * - 간단설명: Todo 삭제 확인 모달 컴포넌트
 * ---
 * @param todoId 삭제할 Todo의 ID
 * @example
 * <DeleteTodoModal todoId={1} />
 */
export default function DeleteTodoModal({ todoId }: {
  todoId: number;
}) {
  const { openModal, closeModal, Modal } = useModal();
  const { mutate, isPending, error } = useDeleteTodoMutation();
  return (
    <Modal>
      <View className="w-full flex flex-col gap-2">
        <Text>삭제하시겠습니까?</Text>
        <View>
          <Button
            onPress={async () => {
              await mutate(todoId);
            }}
            disabled={isPending}
            title="확인" />
          <Button onPress={closeModal}
            disabled={isPending}
            title="취소" />
        </View>
      </View>
    </Modal>
  )
}
