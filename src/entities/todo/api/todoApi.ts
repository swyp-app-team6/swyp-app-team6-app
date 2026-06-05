import { API } from '@/shared/api';
import type { Todo } from '@/entities/todo/model/types';

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await API.get<Todo[]>('/api/todos');
  return data;
};

export const createTodo = async (body: {
  title: string;
  description: string;
}): Promise<Todo> => {
  const { data } = await API.post<Todo>('/api/todos', body);
  return data;
};

export const updateTodo = async (
  id: number,
  body: Partial<Pick<Todo, 'title' | 'description' | 'completed'>>,
): Promise<Todo> => {
  const { data } = await API.patch<Todo>(`/api/todos/${id}`, body);
  return data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await API.delete(`/api/todos/${id}`);
};
