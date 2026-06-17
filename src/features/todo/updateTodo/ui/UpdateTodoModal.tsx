import React, { useState } from 'react'
import { View } from 'react-native';
import useModal from '@/shared/lib/useModal'
import { Button, Modal, TextField } from '@/shared/ui';
import useUpdateTodoMutation from '../api/useUpdateTodoMutation';

/**
 * # UpdateTodoModal
 * ---
 * - 간단설명: Todo 제목/내용을 수정하는 모달 컴포넌트
 * ---
 * @param todoId 수정할 Todo의 ID
 * @param title 초기 제목 값
 * @param description 초기 내용 값
 * @example
 * <UpdateTodoModal todoId={1} title="기존 제목" description="기존 내용" />
 */
function UpdateTodoModal({ todoId, title: initTitle, description: initDescription }: { todoId: number; title?: string; description?: string }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const { mutate, isPending } = useUpdateTodoMutation();

  return (
    <>
      <Modal visible={isOpen} onClose={closeModal} title="수정">
        <View>
          <TextField label="제목" value={title} onChangeText={setTitle} />
          <TextField label="내용" value={description} onChangeText={setDescription} />
          <Button
            title='수정하기'
            loading={isPending}
            onPress={() => {
              mutate(
                { id: todoId, data: { title, description } },
                { onSuccess: closeModal },
              );
            }}
          />
        </View>
      </Modal>
      <Button title="수정" onPress={openModal} />
    </>
  );
}
UpdateTodoModal.displayName = "UpdateTodoModal"

export default UpdateTodoModal;