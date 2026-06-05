import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@/entities/todo/api/todoApi';
import { todoKeys } from '@/features/todo/todoList/api/todoKeys';

export default function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries(todoKeys.all);
    },
  });
}
