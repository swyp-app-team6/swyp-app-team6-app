import React, { useState } from 'react'
import { View } from 'react-native';
import useModal from '@/shared/lib/useModal'
import { Button, Modal, TextField } from '@/shared/ui';
import useUpdateTodoMutation from '../api/useUpdateTodoMutation';

/** 업데이트 */
function UpdateTodoModal({ todoId, title: initTitle, description: initDescription }: { todoId: number }) {
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