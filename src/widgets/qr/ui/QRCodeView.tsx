import React from 'react';
import { View } from 'react-native';

/**
 * 데이터 기반으로 생성된 QR코드
 * qrData: 생성할 데이터 (보통 직렬화된 객체 형식)
 */
export default function QRCodeView({ qrData = '' }: {
  qrData: string | null;
}) {

  if (!qrData) {
    return <View>데이터를 입력해주세요</View>
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {/* <QRCode value={qrData} size={200} testID="qr-code" /> */}
    </View>
  )
}
