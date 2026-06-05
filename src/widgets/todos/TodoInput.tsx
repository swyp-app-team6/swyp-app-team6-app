import React, { memo, useState } from 'react';
import { View } from 'react-native';
import { Button, TextField } from '@/shared/ui';
import useCreateTodoMutation from '@/features/todo/createTodo/api/useCreateTodoMutation';

function TodoInput() {
  const { mutate, isPending } = useCreateTodoMutation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    mutate({ title, description }, {
      onSuccess: () => {
        setTitle('');
        setDescription('');
      },
    });
  };

  return (
    <View className="w-full flex flex-col items-center">
      <TextField label="제목" value={title} onChangeText={setTitle} />
      <TextField label="설명" value={description} onChangeText={setDescription} />
      <Button title="추가" onPress={handleAdd} loading={isPending} />
    </View>
  );
}

export default memo(TodoInput);
