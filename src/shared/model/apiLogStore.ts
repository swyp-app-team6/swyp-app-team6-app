import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/**
 * API 호출 로그 항목
 * - id = 고유 식별자
 * - timestamp = 요청 시작 시각 (ms)
 * - method = HTTP 메서드
 * - url = 요청 URL
 * - status = 응답 상태 코드 (에러 시 null)
 * - duration = 요청~응답 소요 시간 (ms)
 * - request = 요청 정보 (headers, params, data)
 * - response = 응답 정보 (headers, data) 또는 null
 * - error = 에러 메시지 또는 null
 */
export interface ApiLogEntry {
  /** 고유 식별자 */
  id: string;
  /** 요청 시작 시각 (ms) */
  timestamp: number;
  /** HTTP 메서드 */
  method: string;
  /** 요청 URL */
  url: string;
  /** 응답 상태 코드 (에러 시 null) */
  status: number | null;
  /** 요청~응답 소요 시간 (ms) */
  duration: number;
  /** 요청 정보 */
  request: {
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    data?: unknown;
  };
  /** 응답 정보 (에러 시 null) */
  response: {
    headers?: Record<string, string>;
    data?: unknown;
  } | null;
  /** 에러 메시지 (성공 시 null) */
  error: string | null;
}

/** 최대 로그 보관 개수 */
const MAX_LOG_COUNT = 100;

interface ApiLogState {
  logs: ApiLogEntry[];
}

interface ApiLogActions {
  addLog: (log: ApiLogEntry) => void;
  clearLogs: () => void;
}

/**
 * # useApiLogStore
 * ---
 * - 간단설명: API 호출 request/response 로그를 메모리에 보관하는 전역 스토어
 * - 제약사항 및 특이사항:
 *   - 최대 100개까지 보관, 초과 시 오래된 로그 자동 삭제
 *   - 개발 환경 전용 디버깅 목적
 *   - 영속화하지 않음 (앱 재시작 시 초기화)
 * ---
 * @example
 * const { logs, addLog, clearLogs } = useApiLogStore();
 */
const useApiLogStore = create<ApiLogState & ApiLogActions>()(
  immer((set) => ({
    logs: [],

    /**
     * 로그 항목 추가 (최신 항목이 배열 앞에 위치)
     * @param log 추가할 로그 항목
     */
    addLog: (log: ApiLogEntry) => {
      set((state) => {
        state.logs.unshift(log);
        if (state.logs.length > MAX_LOG_COUNT) {
          state.logs.length = MAX_LOG_COUNT;
        }
      });
    },

    /**
     * 모든 로그 삭제
     */
    clearLogs: () => {
      set((state) => {
        state.logs = [];
      });
    },
  })),
);

export default useApiLogStore;
