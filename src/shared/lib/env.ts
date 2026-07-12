/**
 * # PROJECT_ENV
 * ---
 * - 간단설명: 현재 환경이 로컬(개발)인지 여부를 나타내는 상수
 * - 제약사항 및 특이사항:
 *   - 배포 시 false로 변경할 것
 * ---
 * @example
 * import { PROJECT_ENV } from '@/shared/lib/env';
 * if (PROJECT_ENV) { showDebugTools(); }
 */
export const PROJECT_ENV = false;
