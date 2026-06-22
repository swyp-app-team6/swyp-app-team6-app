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
 * 플랫폼별 갤러리(사진 라이브러리) 권한 상수
 * - iOS: PERMISSIONS.IOS.PHOTO_LIBRARY
 * - Android 13+: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
 */
const GALLERY_PERMISSION =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

/**
 * # usePermissionStore
 * ---
 * - 간단설명: 권한 상태를 중앙에서 관리하는 Zustand 스토어
 * - 제약사항 및 특이사항:
 *   - react-native-permissions으로 플랫폼별 권한 처리 통일
 *   - 카메라, 갤러리 권한 관리
 * ---
 * @example
 * const { cameraStatus, galleryStatus, requestCameraPermission, requestGalleryPermission } = usePermissionStore();
 */
const usePermissionStore = create<PermissionStore>((set) => ({
  cameraStatus: 'unavailable',
  galleryStatus: 'unavailable',

  checkCameraPermission: async () => {
    const status = await check(CAMERA_PERMISSION);
    set({ cameraStatus: status });
  },

  requestCameraPermission: async () => {
    const status = await request(CAMERA_PERMISSION);
    set({ cameraStatus: status });
  },

  checkGalleryPermission: async () => {
    const status = await check(GALLERY_PERMISSION);
    set({ galleryStatus: status });
  },

  requestGalleryPermission: async () => {
    const status = await request(GALLERY_PERMISSION);
    set({ galleryStatus: status });
  },
}));

export default usePermissionStore;
