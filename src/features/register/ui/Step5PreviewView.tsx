import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { BottomCTA, Button } from '@/shared/ui';
import UserProfileCard from '@/shared/ui/ProfileCard/UserProfileCard';
import useRegisterFormStore from '../model/useRegisterFormStore';
import { getInterestLabel, REGION_OPTIONS } from '../model/types';
import { resolveRegionEnum, getRegionLabel } from '@/shared/lib/regionLabel';
import BasicInfoSection from './BasicInfoSection';
import InterestsSection from './InterestsSection';
import BioSection from './BioSection';
import TmiSection from './TmiSection';

/** 탭 목록 */
const TABS = ['기본정보', '관심사', '자기소개', '나만의 TMI'] as const;
type TabType = typeof TABS[number];

interface Props {
  /** 폼 모드 (register: 신규 등록, edit: 수정) */
  mode?: 'register' | 'edit';
  /** 등록 완료 버튼 콜백 */
  onSubmit: () => void;
  /** API 호출 중 로딩 상태 */
  loading?: boolean;
}

/**
 * # Step5PreviewView
 * ---
 * - 간단설명: 프로필 등록 마지막 단계 - 미리보기 (Figma 디자인 시안 기반)
 * - 제약사항 및 특이사항:
 *   - 프로필 카드 + 탭 메뉴 + 정보 섹션 구성
 *   - 탭: 기본정보, 관심사, 자기소개, 나만의 TMI
 *   - 각 섹션은 공용 Section 컴포넌트(BasicInfoSection, InterestsSection 등) 사용
 *   - "프로필 등록 완료하기" CTA 버튼
 * ---
 * @param mode 폼 모드 (register | edit)
 * @param onSubmit 등록 완료 버튼 콜백
 * @param loading API 호출 중 로딩 상태
 * @example
 * <Step5PreviewView onSubmit={handleSubmit} loading={false} />
 */
export default function Step5PreviewView({ mode = 'register', onSubmit, loading }: Props) {
  const { form } = useRegisterFormStore();
  const [activeTab, setActiveTab] = useState<TabType>('기본정보');
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* 프로필 카드 */}
        <View className="items-center pt-6 pb-4">
          <UserProfileCard
            profileImageUri={form.profileImageUri}
            nickname={form.nickname}
            interests={form.interests.map((i) => getInterestLabel(i))}
          />
        </View>

        {/* 탭 바 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="border-b border-gray-100"
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        >
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="py-3"
            >
              <Text
                className={`text-base font-semibold ${
                  activeTab === tab ? 'text-primary' : 'text-text-gray4'
                }`}
                style={{ letterSpacing: -0.4 }}
              >
                {tab}
              </Text>
              {activeTab === tab && (
                <View className="h-0.5 bg-primary mt-1 rounded-full" />
              )}
            </Pressable>
          ))}
        </ScrollView>

        {/* 정보 섹션 */}
        <View className="px-5 pt-6 pb-6 gap-6">
          {activeTab === '기본정보' && (
            <BasicInfoSection
              age={form.age}
              region={{
                group: REGION_OPTIONS.find((o) => o.value === form.region)?.label ?? '',
                detail: resolveRegionEnum(form.region, form.subArea),
                label: getRegionLabel(resolveRegionEnum(form.region, form.subArea)),
              }}
              jobField={form.jobField}
            />
          )}

          {activeTab === '관심사' && (
            <InterestsSection interests={form.interests} />
          )}

          {activeTab === '자기소개' && (
            <BioSection bio={form.bio} />
          )}

          {activeTab === '나만의 TMI' && (
            <TmiSection
              tmiAnswers={form.tmiAnswers.map((tmi) => ({
                question: tmi.question,
                answer: tmi.answer,
              }))}
            />
          )}
        </View>

        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title={mode === 'edit' ? '프로필 수정 완료하기' : '프로필 등록 완료하기'}
          onPress={onSubmit}
          loading={loading}
        />
      </BottomCTA>
    </View>
  );
}
