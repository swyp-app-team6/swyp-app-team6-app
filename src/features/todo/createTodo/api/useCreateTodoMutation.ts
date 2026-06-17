import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '@/entities/todo/api/todoApi';
import type { Todo } from '@/entities/todo';
import { todoKeys } from '@/features/todo/todoList/api/todoKeys';

/**
 * Todo 생성 요청 변수
 * - title: Todo 제목
 * - description: Todo 설명
 */
type CreateTodoVariables = Pick<Todo, 'title' | 'description'>;

/**
 * # useCreateTodoMutation
 * ---
 * - 간단설명: Todo를 생성하고, 성공 시 목록 쿼리를 무효화하는 mutation 훅
 * ---
 * @example
 * const { mutate, isPending } = useCreateTodoMutation();
 * mutate({ title: '제목', description: '설명' });
 */
export default function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: CreateTodoVariables) => createTodo(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
