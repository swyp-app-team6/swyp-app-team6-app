import React, { useState, useRef, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { BottomCTA, Button } from '@/shared/ui';
import UserProfileCard from '@/shared/ui/ProfileCard/UserProfileCard';
import { useProfileDataStore } from '@/entities/user';
import { INTEREST_LABEL, REGION_OPTIONS } from '../model/types';
import { resolveRegionEnum, getRegionLabel } from '@/shared/lib/regionLabel';
import ProfileTabBar, { type TabType } from './ProfileTabBar';
import BasicInfoSection from './BasicInfoSection';
import InterestsSection from './InterestsSection';
import BioSection from './BioSection';

import TmiSection from './TmiSection';

interface Props {
  /** 등록 완료 버튼 콜백 */
  onSubmit: () => void;
  /** API 호출 중 로딩 상태 */
  loading?: boolean;
}

/**
 * # MyProfileView
 * ---
 * - 간단설명: 프로필 등록 최종 미리보기 화면 (Figma 디자인 시안 기반)
 * - 제약사항 및 특이사항:
 *   - 상단 프로필 카드: 이미지 + 그라디언트 오버레이 + 유형 배지 + 이름/나이 + 관심사 태그
 *   - 탭 바: 기본정보, 관심사, 자기소개, 유형테스트, 나만의 TMI
 *   - 모든 정보 섹션을 세로로 나열하여 스크롤 가능
 *   - 하단 "등록 완료하기" CTA 버튼
 *   - useProfileDataStore에서 프로필 데이터를 읽어 표시
 * ---
 * @param onSubmit 등록 완료 버튼 콜백
 * @param loading API 호출 중 로딩 상태
 * ---
 * @example
 * <MyProfileView onSubmit={handleSubmit} loading={false} />
 */
export default function MyProfileView({ onSubmit, loading }: Props) {
  const { data: form } = useProfileDataStore();
  const [activeTab, setActiveTab] = useState<TabType>('기본정보');
  const scrollRef = useRef<ScrollView>(null);

  const tmiAnswersForDisplay = useMemo(
    () =>
      form.tmiAnswers.map((tmi) => ({
        question: tmi.question,
        answer: tmi.answer,
      })),
    [form.tmiAnswers],
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* ── 프로필 카드 ── */}
        <View className="items-center pt-6 pb-4">
          <UserProfileCard
            profileImageUri={form.profileImageUri}
            nickname={form.nickname}
            age={form.age}
            interests={form.interests.map((i) => INTEREST_LABEL[i] ?? i)}
          />
        </View>

        {/* ── 탭 바 ── */}
        <ProfileTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hiddenTabs={['유형테스트']}
        />

        {/* ── 정보 섹션 ── */}
        <View className="px-5 pb-6 gap-5">
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
            <TmiSection tmiAnswers={tmiAnswersForDisplay} />
          )}
        </View>

        {/* 하단 여백 (CTA 버튼 공간 확보) */}
        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title="등록 완료하기"
          onPress={onSubmit}
          loading={loading}
        />
      </BottomCTA>
    </View>
  );
}
