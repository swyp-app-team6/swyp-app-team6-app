import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

/**
 * # QRScanTab
 * ---
 * - 간단설명: 카메라로 QR 코드를 스캔하고 디코딩된 텍스트를 화면에 표시하는 스캔 탭 컴포넌트
 * - 제약사항 및 특이사항: 카메라 권한 미승인 시 안내 UI 표시, 권한 승인 후 Camera 렌더링, 후면 카메라 사용
 * ---
 * @example
 * <QRScanTab />
 */
export default function QRScanTab() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [scannedText, setScannedText] = useState('');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      if (codes.length > 0 && codes[0].value) {
        setScannedText(codes[0].value);
      }
    },
  });

  if (!hasPermission) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <Text style={{ color: '#6b7280', fontSize: 16 }}>카메라 권한이 필요합니다</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#3b82f6', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
          onPress={requestPermission}
        >
          <Text style={{ color: '#ffffff', fontWeight: '600' }}>권한 요청</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#6b7280', fontSize: 16 }}>카메라를 사용할 수 없습니다</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        testID="camera"
        style={{ flex: 1 }}
        device={device}
        isActive
        codeScanner={codeScanner}
      />
      {scannedText ? (
        <View style={{ padding: 16, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
          <Text style={{ color: '#6b7280', fontSize: 12, marginBottom: 4 }}>인식된 문구</Text>
          <Text style={{ fontSize: 16, color: '#111827' }}>{scannedText}</Text>
        </View>
      ) : null}
    </View>
  );
}
