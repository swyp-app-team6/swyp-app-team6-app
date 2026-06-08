import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getTodos } from '@/entities/todo/api/todoApi';

/**
 * Todo 쿼리 키 팩토리
 * - all: 전체 Todo 목록 조회 쿼리 키 및 queryFn 포함
 */
export const todoKeys = createQueryKeys('todos', {
  all: {
    queryKey: null,
    queryFn: getTodos,
  },
});
