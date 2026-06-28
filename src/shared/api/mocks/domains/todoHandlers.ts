/**
 * # todoHandlers
 * ---
 * - 간단설명: Todo CRUD MSW mock 핸들러
 * - 제약사항 및 특이사항:
 *   - 인메모리 배열로 상태 관리 (앱 재시작 시 초기화)
 * ---
 */
import { http, HttpResponse } from 'msw';
import Config from 'react-native-config';
import type { Todo } from '@/entities/todo/model/types';

const BASE_URL = Config.API_URL;

/** mock todo 인메모리 저장소 */
let mockTodos: Todo[] = [
  { id: 1, title: 'MSW 핸들러 작성', description: 'mock API 핸들러 구현', completed: true },
  { id: 2, title: '화면 개발', description: 'UI 컴포넌트 구현', completed: false },
];
let nextId = 3;

export const todoHandlers = [
  /**
   * 전체 조회 — GET /api/todos
   */
  http.get(`${BASE_URL}/api/todos`, () => {
    return HttpResponse.json(mockTodos);
  }),

  /**
   * 생성 — POST /api/todos
   */
  http.post(`${BASE_URL}/api/todos`, async ({ request }) => {
    const body = (await request.json()) as { title: string; description: string };

    const newTodo: Todo = {
      id: nextId++,
      title: body.title,
      description: body.description,
      completed: false,
    };

    mockTodos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  /**
   * 수정 — PATCH /api/todos/:id
   */
  http.patch(`${BASE_URL}/api/todos/:id`, async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Partial<Todo>;
    const index = mockTodos.findIndex(t => t.id === id);

    if (index === -1) {
      return HttpResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    mockTodos[index] = { ...mockTodos[index], ...body };
    return HttpResponse.json(mockTodos[index]);
  }),

  /**
   * 삭제 — DELETE /api/todos/:id
   */
  http.delete(`${BASE_URL}/api/todos/:id`, ({ params }) => {
    const id = Number(params.id);
    const index = mockTodos.findIndex(t => t.id === id);

    if (index === -1) {
      return HttpResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    mockTodos.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
