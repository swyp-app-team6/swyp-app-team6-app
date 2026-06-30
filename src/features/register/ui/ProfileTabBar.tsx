import React, { memo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

/** 탭 목록 */
export const TABS = ['기본정보', '관심사', '자기소개', '유형테스트', '나만의 TMI'] as const;
export type TabType = (typeof TABS)[number];

/**
 * # ProfileTabBar
 * ---
 * - 간단설명: 프로필 미리보기 탭 바 (가로 스크롤)
 * ---
 * @param activeTab 현재 활성 탭
 * @param onTabChange 탭 변경 콜백
 * ---
 * @example
 * <ProfileTabBar activeTab="기본정보" onTabChange={setActiveTab} />
 */
const ProfileTabBar = memo(function ProfileTabBar({
  activeTab,
  onTabChange,
}: {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      className="py-6"
    >
      {TABS.map((tab) => (
        <Pressable key={tab} onPress={() => onTabChange(tab)}>
          <Text
            className={`text-base ${
              activeTab === tab
                ? 'font-semibold text-primary'
                : 'font-medium text-text-gray4'
            }`}
            style={{ lineHeight: 22.4 }}
          >
            {tab}
          </Text>
          {activeTab === tab && (
            <View className="h-0.5 bg-primary mt-1 rounded-full" />
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
});

export default ProfileTabBar;
