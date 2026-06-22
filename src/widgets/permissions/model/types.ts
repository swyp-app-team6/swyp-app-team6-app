import type { PermissionStatus } from 'react-native-permissions';

/**
 * 권한 스토어 상태
 * - cameraStatus: 카메라 권한 현재 상태
| 상태                    | 의미                | 다시 요청 가능 |
| --------------------- | ----------------- | -------- |
| `RESULTS.UNAVAILABLE` | 해당 기기/OS에서 지원 안 함 | ❌        |
| `RESULTS.DENIED`      | 아직 승인 안 했거나 거절함   | ✅        |
| `RESULTS.GRANTED`     | 승인됨               | -        |
| `RESULTS.BLOCKED`     | 영구 거부됨            | ❌        |
| `RESULTS.LIMITED`     | 제한적 승인(iOS)       | 부분       |

 * 
 * import { RESULTS } from 'react-native-permissions';
 */
export interface PermissionState {
  /** 카메라 권한 상태 */
  cameraStatus: PermissionStatus;
  /** 갤러리 권한 상태 */
  galleryStatus: PermissionStatus;
}

/**
 * 권한 스토어 액션
 * - checkCameraPermission: 현재 카메라 권한 상태 조회 (팝업 없음)
 * - requestCameraPermission: 카메라 권한 요청 (팝업 표시)
 * - checkGalleryPermission: 현재 갤러리 권한 상태 조회 (팝업 없음)
 * - requestGalleryPermission: 갤러리 권한 요청 (팝업 표시)
 */
export interface PermissionActions {
  /** 현재 카메라 권한 상태 조회 (팝업 없음) */
  checkCameraPermission: () => Promise<void>;
  /** 카메라 권한 요청 팝업 표시 */
  requestCameraPermission: () => Promise<void>;
  /** 현재 갤러리 권한 상태 조회 (팝업 없음) */
  checkGalleryPermission: () => Promise<void>;
  /** 갤러리 권한 요청 팝업 표시 */
  requestGalleryPermission: () => Promise<void>;
}

/** PermissionStore 전체 인터페이스 */
export type PermissionStore = PermissionState & PermissionActions;
