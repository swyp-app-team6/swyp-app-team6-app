import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '@/entities/todo/api/todoApi';
import { todoKeys } from '@/features/todo/todoList/api/todoKeys';

/**
 * # useDeleteTodoMutation
 * ---
 * - 간단설명: Todo를 삭제하고, 성공 시 목록 쿼리를 무효화하는 mutation 훅
 * ---
 * @example
 * const { mutate, isPending } = useDeleteTodoMutation();
 * mutate(todoId);
 */
export default function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
