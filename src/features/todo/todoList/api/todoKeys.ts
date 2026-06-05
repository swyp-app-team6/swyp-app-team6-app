import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getTodos } from '@/entities/todo/api/todoApi';

export const todoKeys = createQueryKeys('todos', {
  all: {
    queryKey: null,
    queryFn: getTodos,
  },
});
