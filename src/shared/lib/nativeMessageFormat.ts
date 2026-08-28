/**
 * # nativeMessageFormat
 * ---
 * - 간단설명: Native ↔ WebView 메시지 프로토콜 상수 및 유틸
 * - 제약사항 및 특이사항:
 *   - 메시지 포맷: `__APP_NATIVE__//{JSON}`
 *   - 웹 앱과 동일한 프로토콜 사용 필수
 * ---
 */

/** 메시지 접두어 */
export const MESSAGE_PREFIX = '__APP_NATIVE__//';

/**
 * Native ↔ Web 메시지 타입 상수
 * - UPDATE_CUR_POSITION = Native→Web 위치 전송
 * - UPDATE_CUR_DEGREE = Native→Web 나침반 방향 전송
 * - START_FOREGROUND_SERVICE = Web→Native 서비스 시작
 * - STOP_FOREGROUND_SERVICE = Web→Native 서비스 중지
 * - WEBVIEW_READY = Native→Web 초기화 완료
 */
export const NATIVE_MSG_ID = {
  /** Native→Web: 현재 위치 업데이트 */
  UPDATE_CUR_POSITION: 'UPDATE_CUR_POSITION',
  /** Native→Web: 나침반 방향 업데이트 */
  UPDATE_CUR_DEGREE: 'UPDATE_CUR_DEGREE',
  /** Web→Native: Foreground Service 시작 요청 */
  START_FOREGROUND_SERVICE: 'START_FOREGROUND_SERVICE',
  /** Web→Native: Foreground Service 중지 요청 */
  STOP_FOREGROUND_SERVICE: 'STOP_FOREGROUND_SERVICE',
  /** Native→Web: WebView 준비 완료 */
  WEBVIEW_READY: 'WEBVIEW_READY',
} as const;

export type NativeMsgId = (typeof NATIVE_MSG_ID)[keyof typeof NATIVE_MSG_ID];

/**
 * # buildNativeMessage
 * ---
 * - 간단설명: Native→Web 메시지 문자열 생성
 * ---
 * @param key 메시지 타입
 * @param data 전송 데이터
 * @example
 * buildNativeMessage('UPDATE_CUR_POSITION', '37.5/127.0/true')
 * // => '__APP_NATIVE__//{"key":"UPDATE_CUR_POSITION","data":"37.5/127.0/true"}'
 */
export function buildNativeMessage(key: NativeMsgId, data: unknown): string {
  return `${MESSAGE_PREFIX}${JSON.stringify({ key, data })}`;
}

/**
 * # parseWebMessage
 * ---
 * - 간단설명: Web→Native 메시지 문자열 파싱
 * ---
 * @param raw 수신된 원본 문자열
 * @returns 파싱된 { key, data } 또는 null
 */
export function parseWebMessage(raw: string): { key: string; data: unknown } | null {
  if (!raw.startsWith(MESSAGE_PREFIX)) return null;
  try {
    return JSON.parse(raw.slice(MESSAGE_PREFIX.length));
  } catch {
    return null;
  }
}
