import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

/**
 * # QRGenerateTab
 * ---
 * - 간단설명: 텍스트 입력을 받아 QR 코드 SVG를 즉시 렌더링하는 생성 탭 컴포넌트
 * - 제약사항 및 특이사항: 입력값 없을 때 QRCode 미렌더링, 안내 문구 표시
 * ---
 * @example
 * <QRGenerateTab />
 */
export default function QRGenerateTab() {
  const [text, setText] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 32, gap: 24 }}>
      <TextInput
        style={{ width: '100%', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16 }}
        placeholder="QR로 만들 문구 입력"
        value={text}
        onChangeText={setText}
      />
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        {text ? (
          <QRCode value={text} size={200} testID="qr-code" />
        ) : (
          <Text style={{ color: '#9ca3af', fontSize: 16 }}>문구를 입력하세요</Text>
        )}
      </View>
    </View>
  );
}
