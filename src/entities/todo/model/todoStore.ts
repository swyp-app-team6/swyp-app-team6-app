import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/entities/todo/api/todoApi';
import type { Todo } from '@/entities/todo/model/types';

interface TodoStore {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (todo: Pick<Todo, 'title' | 'description'>) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  toggleStatus: (id: number) => Promise<void>;
  updateTodo: (id: number, data: Pick<Todo, 'title' | 'description'>) => Promise<void>;
}

const todoStore = create<TodoStore>()(
  immer((set, get) => ({
    todos: [],
    isLoading: false,
    error: null,

    fetchTodos: async () => {
      set(state => {
        state.isLoading = true;
        state.error = null;
      });
      try {
        const todos = await getTodos();
        set(state => {
          state.todos = todos;
        });
      } catch {
        set(state => {
          state.error = '목록을 불러오지 못했습니다.';
        });
      } finally {
        set(state => {
          state.isLoading = false;
        });
      }
    },

    addTodo: async (todo) => {
      const created = await createTodo(todo);
      set(state => {
        state.todos.unshift(created);
      });
    },

    removeTodo: async (id) => {
      await deleteTodo(id);
      set(state => {
        state.todos = state.todos.filter(t => t.id !== id);
      });
    },

    toggleStatus: async (id) => {
      const todo = get().todos.find(t => t.id === id);
      if (!todo) return;
      const updated = await updateTodo(id, { completed: !todo.completed });
      set(state => {
        const target = state.todos.find(t => t.id === id);
        if (target) {
          target.completed = updated.completed;
        }
      });
    },

    updateTodo: async (id, data) => {
      const updated = await updateTodo(id, data);
      set(state => {
        const target = state.todos.find(t => t.id === id);
        if (target) {
          target.title = updated.title;
          target.description = updated.description;
        }
      });
    },
  })),
);

export default todoStore;
