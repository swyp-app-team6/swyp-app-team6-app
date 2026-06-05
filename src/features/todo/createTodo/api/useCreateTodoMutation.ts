import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '@/entities/todo/api/todoApi';
import type { Todo } from '@/entities/todo';
import { todoKeys } from '@/features/todo/todoList/api/todoKeys';

type CreateTodoVariables = Pick<Todo, 'title' | 'description'>;

export default function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: CreateTodoVariables) => createTodo(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(todoKeys.all);
    },
  });
}
