import React, { useEffect } from 'react';
import { View, Text, Linking } from 'react-native';
import usePermissionStore from '../model/usePermissionStore';
import { Button } from '../../../shared/ui/Button';

/**
 * # CameraPermissionRequiredFallbackView
 * ---
 * - 간단설명: 카메라 권한이 없을 때 표시하는 안내 fallback 컴포넌트
 * - 제약사항 및 특이사항:
 *   - denied 상태: onRequestPermission으로 OS 권한 팝업 재요청
 *   - blocked 상태: onRequestPermission으로 설정 앱 이동 유도
 * ---
 * @param onRequestPermission 권한 재요청 또는 설정 이동 콜백
 * ---
 * @example
 * <CameraPermissionRequiredFallbackView onRequestPermission={requestCameraPermission} />
 */
export default function CameraPermissionRequiredFallbackView() {
  const { cameraStatus, requestCameraPermission } = usePermissionStore();
  useEffect(() => {
    requestCameraPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Text>QR코드 인식을 위해서 카메라 권한이 필요합니다</Text>
      {cameraStatus === 'blocked' &&
        <View>
          <Text>옵션에서 권한 허용해주세요.</Text>
          <Button className='w-full' title='옵션에서 권한 허용' onPress={() => Linking.openSettings()} />
        </View>}
      <Button className='w-full' title="권한 허용하기"
        onPress={requestCameraPermission}
      />
    </View>
  );
}
