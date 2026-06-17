import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useCameraDevice } from 'react-native-vision-camera';
import QRScanView from './QRScanView';

/**
 * # QRScanTab
 * ---
 * - 간단설명: 카메라로 QR 코드를 스캔하고 디코딩된 텍스트를 화면에 표시하는 스캔 탭 컴포넌트
 * - 제약사항 및 특이사항: 카메라 권한 미승인 시 안내 UI 표시, 권한 승인 후 Camera 렌더링, 후면 카메라 사용, 스캔 완료 후 초기화하여 재스캔 가능
 * ---
 * @example
 * <QRScanTab />
 */
export default function QRScanTab() {
  const device = useCameraDevice('back');
  const [scannedText, setScannedText] = useState('');

  /** 카메라 이상 발생 경우 */
  if (!device) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#6b7280', fontSize: 16 }}>카메라를 사용할 수 없습니다</Text>
      </View>
    );
  }

  return (
    <View className='flex-1'>
      <QRScanView
        isActive={!scannedText}
        onScanned={(value) => {
          if (!scannedText && value != null) setScannedText(value);
        }}
        onError={(error) => {
          console.error(`Error scanning barcodes:`, error)
        }}
      />
      {scannedText ? (
        <View style={{ padding: 16, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#e5e7eb', width: '80%' }}>
          <Text style={{ color: '#6b7280', fontSize: 12, marginBottom: 4 }}>인식된 문구</Text>
          <Text style={{ fontSize: 16, color: '#111827', marginBottom: 12 }}>{scannedText}</Text>
          <TouchableOpacity
            style={{ backgroundColor: '#3b82f6', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8, alignItems: 'center' }}
            onPress={() => setScannedText('')}
          >
            <Text style={{ color: '#ffffff', fontWeight: '600' }}>다시 스캔</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
