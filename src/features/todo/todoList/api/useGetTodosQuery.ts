import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { todoKeys } from './todoKeys';
import { Todo } from '@/entities/todo';

/**
 * # useGetTodosQuery
 * ---
 * - 간단설명: Todo 전체 목록을 조회하는 Suspense 쿼리 훅
 * - 제약사항 및 특이사항: useSuspenseQuery 사용으로 Suspense 경계 필요, updateTodoQuery는 옵티미스틱 업데이트용 (미적용)
 * ---
 * @example
 * const { data: todos, refetch } = useGetTodosQuery();
 */
export function useGetTodosQuery() {
  const queryStates = useSuspenseQuery(todoKeys.all);
  const queryClient = useQueryClient();

  /** 
   * optimistic update위한 todo update 
   * TODO: 나중에 적용
   * */
  const updateTodoQuery = (todoId: number, data: {
    title: string;
    description: string;
    completed: boolean;
  }) => {
    queryClient.setQueryData<Todo[]>(todoKeys.all.queryKey, (oldData) => {
      return oldData?.map(t =>
        t.id === todoId ? { ...t, ...data } : t
      );
    });
  };

  return {
    ...queryStates,
    updateTodoQuery,
  }
}
