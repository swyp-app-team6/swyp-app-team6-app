/**
 * # server
 * ---
 * - 간단설명: MSW 서버 인스턴스 생성 — React Native 환경용
 * - 제약사항 및 특이사항:
 *   - setupServer는 Node.js 기반 인터셉트 방식으로 동작
 *   - React Native의 네트워크 요청을 인터셉트하여 mock 응답 반환
 * ---
 * @example
 * import { server } from '@/shared/api/mocks/server';
 * server.listen();
 */
import { setupServer } from 'msw/native';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
