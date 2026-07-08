import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';

/**
 * # SafeAreaTestPage
 * ---
 * - 간단설명: withLayout 적용 상태에서 SafeArea 적용 여부를 시각적으로 확인하는 테스트 페이지
 * - 제약사항 및 특이사항:
 *   - local 환경에서만 접근 가능 (playground)
 *   - 상단(빨강), 하단(초록) 영역이 노치/홈 인디케이터에 가려지는지 확인
 *   - withLayout HOC 적용 (하단 탭 네비게이션 포함)
 * ---
 * @example
 * navigation.navigate('safeAreaTest')
 */
function SafeAreaTestPage() {
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* 상단 영역 — 노치/상태바 겹침 확인용 */}
      <View className="bg-red-400 px-4 py-2">
        <Text className="text-white font-bold text-lg">상단 영역 (빨간색)</Text>
        <Text className="text-white text-sm">이 텍스트가 상태바/노치에 가려지면 SafeArea 미적용</Text>
      </View>

      <Header title="SafeArea 테스트" showBack />

      <Layout.Body styleClass={{ root: 'px-4 pt-4' }}>
        {/* Insets 정보 표시 */}
        <View className="bg-gray-100 px-4 py-3 rounded-lg mb-4">
          <Text className="font-bold text-base mb-2">현재 SafeArea Insets</Text>
          <Text className="text-sm">top: {insets.top}px</Text>
          <Text className="text-sm">bottom: {insets.bottom}px</Text>
          <Text className="text-sm">left: {insets.left}px</Text>
          <Text className="text-sm">right: {insets.right}px</Text>
        </View>

        {/* 스크롤 콘텐츠 */}
        <ScrollView className="flex-1">
          {Array.from({ length: 20 }, (_, i) => (
            <View key={i} className="bg-blue-100 rounded-lg p-3 mb-2">
              <Text className="text-sm">콘텐츠 항목 #{i + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </Layout.Body>

      {/* 하단 영역 — 홈 인디케이터 겹침 확인용 */}
      <View className="bg-green-400 px-4 py-4">
        <Text className="text-white font-bold text-lg">하단 영역 (초록색)</Text>
        <Text className="text-white text-sm">이 텍스트가 홈 인디케이터에 가려지면 SafeArea 미적용</Text>
      </View>
    </>
  );
}

export default withLayout(SafeAreaTestPage);
