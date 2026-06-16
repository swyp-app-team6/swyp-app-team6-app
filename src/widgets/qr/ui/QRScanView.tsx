import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { CodeScanner } from 'react-native-vision-camera-barcode-scanner';

export default function QRScanView({ isActive, isScanned, onScanned, onError }) {

  return (
    <View className='flex-1 justify-center items-center'>
      <CodeScanner
        style={{ width: '80%', height: '50%' }}
        isActive={isActive}
        barcodeFormats={['qr-code']}
        onBarcodeScanned={(barcodes) => {
          // 가장 마지막 스캔 데이터를 리턴 (문제발생시 조정)
          const lastBarcode = barcodes[barcodes.length - 1];
          onScanned(lastBarcode.rawValue)
        }}
        onError={onError}
      />
    </View>
  )
}