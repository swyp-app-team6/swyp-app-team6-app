/**
 * # handlers
 * ---
 * - 간단설명: MSW 요청 핸들러 목록 — 모든 mock API 핸들러를 여기에 등록
 * - 제약사항 및 특이사항:
 *   - 도메인별 핸들러는 별도 파일로 분리 후 스프레드로 병합
 * ---
 * @example
 * import { handlers } from '@/shared/api/mocks/handlers';
 */
import { HttpHandler } from 'msw';

export const handlers: HttpHandler[] = [
  // 도메인별 핸들러를 여기에 추가
  // ...exampleHandlers,
];
