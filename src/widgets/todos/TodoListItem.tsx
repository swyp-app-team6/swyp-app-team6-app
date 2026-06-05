import React, { memo } from 'react'
import { Text, View } from 'react-native'
import { Button, Checkbox } from '@/shared/ui'
import { type Todo } from '@/entities/todo'
import UpdateTodoModal from '@/features/todo/updateTodo/ui/UpdateTodoModal';
import useDeleteTodoMutation from '@/features/todo/deleteTodo/api/useDeleteTodoMutation';
import useUpdateTodoMutation from '@/features/todo/updateTodo/api/useUpdateTodoMutation';

function TodoListItem({ title, completed, description, id }: Todo) {
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();

  return (
    <View className='flex flex-row items-center gap-2 px-4'>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <UpdateTodoModal todoId={id} title={title} description={description} />
      <Button
        title='삭제'
        variant='secondary'
        loading={isDeleting}
        onPress={() => deleteTodo(id)}
      />
      <Checkbox
        checked={completed}
        onValueChange={() => updateTodo({ id, data: { completed: !completed } })}
      />
    </View>
  );
}

export default memo(TodoListItem, (prev, next) =>
  prev.completed === next.completed &&
  prev.title === next.title &&
  prev.description === next.description
);
