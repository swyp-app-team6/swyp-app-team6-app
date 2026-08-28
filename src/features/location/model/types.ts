/**
 * 위치 상태 데이터
 * - lat = 위도
 * - lng = 경도
 * - degree = 나침반 방향각
 * - isEnabled = 디바이스 위치 서비스 활성화 여부
 * - isServiceRunning = Foreground Service 실행 여부
 */
export interface LocationState {
  /** 위도 */
  lat: number;
  /** 경도 */
  lng: number;
  /** 나침반 방향각 */
  degree: number;
  /** 디바이스 위치 서비스 활성화 여부 */
  isEnabled: boolean;
  /** Foreground Service 실행 여부 */
  isServiceRunning: boolean;
}

/**
 * 위치 스토어 액션
 */
export interface LocationActions {
  /** 위치 좌표 업데이트 */
  updatePosition: (lat: number, lng: number, isEnabled: boolean) => void;
  /** 나침반 방향 업데이트 */
  updateDegree: (degree: number) => void;
  /** 서비스 실행 상태 설정 */
  setServiceRunning: (running: boolean) => void;
  /** 상태 초기화 */
  reset: () => void;
}

export type LocationStore = LocationState & LocationActions;
