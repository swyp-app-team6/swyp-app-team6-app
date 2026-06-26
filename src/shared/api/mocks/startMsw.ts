/**
 * # startMsw
 * ---
 * - 간단설명: MSW mock 서버를 초기화하고 시작하는 함수
 * - 제약사항 및 특이사항:
 *   - MSW_ENABLED 환경변수가 'true'일 때만 실행
 *   - 앱 진입점(index.js)에서 앱 등록 전에 호출해야 함
 *   - onUnhandledRequest: 'bypass'로 미등록 요청은 그대로 통과
 * ---
 * @example
 * await startMsw();
 */
import Config from 'react-native-config';

/**
 * # startMsw
 * ---
 * - 간단설명: MSW_ENABLED가 true이면 mock 서버를 시작
 * ---
 */
export async function startMsw(): Promise<void> {
  if (Config.MSW_ENABLED !== 'true') {
    return;
  }

  const { server } = await import('./server');

  server.listen({ onUnhandledRequest: 'bypass' });
  console.log('[MSW] Mock server started');
}
