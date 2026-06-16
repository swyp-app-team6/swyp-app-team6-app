/**
 * # usePermission
 * ---
 * - 간단설명: 권한 스토어 진입점 — usePermissionStore를 re-export
 * - 제약사항 및 특이사항: 외부에서는 이 파일을 통해 스토어에 접근할 것
 * ---
 * @example
 * import usePermissionStore from '@/widgets/permissions/usePermission';
 * const { cameraStatus, requestCameraPermission } = usePermissionStore();
 */
export { default } from './model/usePermissionStore';
