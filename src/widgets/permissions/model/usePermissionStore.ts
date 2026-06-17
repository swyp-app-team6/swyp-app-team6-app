import { create } from 'zustand';
import { Platform } from 'react-native';
import { check, request, PERMISSIONS } from 'react-native-permissions';
import type { PermissionStore } from './types';

/**
 * 플랫폼별 카메라 권한 상수
 * - iOS: PERMISSIONS.IOS.CAMERA
 * - Android: PERMISSIONS.ANDROID.CAMERA
 */
const CAMERA_PERMISSION =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.CAMERA
    : PERMISSIONS.ANDROID.CAMERA;

/**
 * # usePermissionStore
 * ---
 * - 간단설명: 권한 상태를 중앙에서 관리하는 Zustand 스토어
 * - 제약사항 및 특이사항:
 *   - react-native-permissions으로 플랫폼별 권한 처리 통일
 *   - 카메라 권한만 관리 (추후 필드/액션 추가로 확장)
 * ---
 * @example
 * const { cameraStatus, requestCameraPermission } = usePermissionStore();
 */
const usePermissionStore = create<PermissionStore>((set) => ({
  cameraStatus: 'unavailable',

  checkCameraPermission: async () => {
    const status = await check(CAMERA_PERMISSION);
    set({ cameraStatus: status });
  },

  requestCameraPermission: async () => {
    const status = await request(CAMERA_PERMISSION);
    set({ cameraStatus: status });
  },
}));

export default usePermissionStore;
