import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/entities/todo/api/todoApi';
import type { Todo } from '@/entities/todo';
import { todoKeys } from '@/features/todo/todoList/api/todoKeys';

type UpdateTodoVariables = {
  id: number;
  data: Partial<Pick<Todo, 'title' | 'description' | 'completed'>>;
};

/** todo update */
export default function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTodoVariables) => updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(todoKeys.all);
    },
  });
}
