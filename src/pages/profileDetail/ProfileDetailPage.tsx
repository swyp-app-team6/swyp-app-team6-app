import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Header, ProfileCard } from '@/shared/ui';
import { getInterestLabel } from '@/features/register';
import { useMyProfileQuery } from '@/entities/user';
import BasicInfoSection from '@/features/register/ui/BasicInfoSection';
import InterestsSection from '@/features/register/ui/InterestsSection';
import BioSection from '@/features/register/ui/BioSection';
import CosmicTypeSection from '@/features/register/ui/CosmicTypeSection';
import TmiSection from '@/features/register/ui/TmiSection';

/**
 * # ProfileDetailPage
 * ---
 * - 간단설명: 내 프로필 카드 상세보기 페이지
 * - 제약사항 및 특이사항:
 *   - 프로필 카드 + 모든 정보 섹션을 탭 없이 세로로 나열
 *   - 뒤로가기 버튼으로 이전 화면 복귀
 *   - withLayout 미적용 (독립 스택 화면)
 * ---
 */
export default function ProfileDetailPage() {
  const { data: profile, isLoading } = useMyProfileQuery();

  if (isLoading || !profile) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Header title="내 프로필 카드" showBack />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const interests = profile.interests.map((i) => i.type);
  const tmiAnswers = [
    ...(profile.choice_template ?? []).map((t) => ({
      question: t.question,
      answer: t.answer,
    })),
    ...(profile.short_template ?? []).map((t) => ({
      question: t.question,
      answer: t.answer,
    })),
  ];

  return (
    <View className="flex-1 bg-white">
      <Header title="내 프로필 카드" showBack />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* ── 프로필 카드 ── */}
        <View className="items-center pt-6 pb-4">
          <ProfileCard
            variant="preview"
            profileImageUri={profile.image_key}
            nickname={profile.nickname}
            age={String(profile.age)}
            interests={interests.map((i) => getInterestLabel(i))}
          />
        </View>

        {/* ── 정보 섹션 (모두 세로 나열) ── */}
        <View className="px-5 pb-10 gap-5">
          <BasicInfoSection
            age={String(profile.age)}
            region={profile.region}
            jobField={profile.job}
          />
          <InterestsSection interests={interests} />
          <BioSection bio={profile.bio} />
          <CosmicTypeSection
            cosmicType={profile.cosmic_type}
          />
          <TmiSection tmiAnswers={tmiAnswers} />
        </View>
      </ScrollView>
    </View>
  );
}
