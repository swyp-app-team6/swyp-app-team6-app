import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '@/entities/todo/api/todoApi';
import type { Todo } from '@/entities/todo';
import { todoKeys } from '@/features/todo/todoList/api/todoKeys';

/**
 * Todo 수정 요청 변수
 * - id: 수정할 Todo ID
 * - data: 수정할 필드 (title, description, completed 중 일부)
 */
type UpdateTodoVariables = {
  id: number;
  data: Partial<Pick<Todo, 'title' | 'description' | 'completed'>>;
};

/**
 * # useUpdateTodoMutation
 * ---
 * - 간단설명: Todo를 수정하고, 성공 시 목록 쿼리를 무효화하는 mutation 훅
 * ---
 * @example
 * const { mutate, isPending } = useUpdateTodoMutation();
 * mutate({ id: 1, data: { title: '새 제목' } });
 */
export default function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateTodoVariables) => updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
