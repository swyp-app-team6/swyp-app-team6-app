import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useQRTabStore from '../model/useQRTabStore';
import QRGenerateTab from './QRGenerateTab';
import QRScanTab from './QRScanTab';

/**
 * # QRWidget
 * ---
 * - 간단설명: 생성/스캔 탭 전환을 담당하는 QR 기능 컨테이너 위젯
 * - 제약사항 및 특이사항: 탭 상태는 useQRTabStore로 관리, 페이지에서는 이 위젯만 렌더링
 * ---
 * @example
 * <QRWidget />
 */
export default function QRWidget() {
  const { activeTab, setTab } = useQRTabStore();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
        <TouchableOpacity
          style={{ flex: 1, paddingVertical: 8, alignItems: 'center', backgroundColor: activeTab === 'generate' ? '#3b82f6' : '#ffffff' }}
          onPress={() => setTab('generate')}
        >
          <Text style={{ fontWeight: '600', color: activeTab === 'generate' ? '#ffffff' : '#6b7280' }}>
            생성
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, paddingVertical: 8, alignItems: 'center', backgroundColor: activeTab === 'scan' ? '#3b82f6' : '#ffffff' }}
          onPress={() => setTab('scan')}
        >
          <Text style={{ fontWeight: '600', color: activeTab === 'scan' ? '#ffffff' : '#6b7280' }}>
            스캔
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'generate' ? <QRGenerateTab /> : <QRScanTab />}
    </View>
  );
}
