import type { PermissionStatus } from 'react-native-permissions';

/**
 * 권한 스토어 상태
 * - cameraStatus: 카메라 권한 현재 상태
 */
export interface PermissionState {
  /** 카메라 권한 상태 */
  cameraStatus: PermissionStatus;
}

/**
 * 권한 스토어 액션
 * - checkCameraPermission: 현재 카메라 권한 상태 조회 (팝업 없음)
 * - requestCameraPermission: 카메라 권한 요청 (팝업 표시)
 */
export interface PermissionActions {
  /** 현재 카메라 권한 상태 조회 (팝업 없음) */
  checkCameraPermission: () => Promise<void>;
  /** 카메라 권한 요청 팝업 표시 */
  requestCameraPermission: () => Promise<void>;
}

/** PermissionStore 전체 인터페이스 */
export type PermissionStore = PermissionState & PermissionActions;
