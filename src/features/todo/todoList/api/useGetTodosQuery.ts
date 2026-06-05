import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { todoKeys } from './todoKeys';
import { Todo } from '@/entities/todo';

/** get todo list */
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
