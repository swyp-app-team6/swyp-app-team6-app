import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, PopoverMenu, openDialog } from '@/shared/ui';
import { ProfileActionIcon } from '@/shared/ui';
import UserProfileCard from '@/shared/ui/ProfileCard/UserProfileCard';
import { getInterestLabel } from '@/features/register';
import { useDeleteProfileMutation, useMyProfileQuery } from '@/entities/user';
import type { NavigationPropType } from '@/shared/types';
import BasicInfoSection from '@/features/register/ui/BasicInfoSection';
import InterestsSection from '@/features/register/ui/InterestsSection';
import BioSection from '@/features/register/ui/BioSection';
import CosmicTypeSection from '@/features/register/ui/CosmicTypeSection';
import TmiSection from '@/features/register/ui/TmiSection';
import { getProfileImageUrl } from '@/shared/lib/getProfileImageUrl';
import { apiValueToCosmicType } from '@/entities/storage';

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
  const navigation = useNavigation<NavigationPropType>();
  const { data: profile, isLoading } = useMyProfileQuery();
  const { mutate: deleteProfile } = useDeleteProfileMutation();

  const handleEdit = () => {
    navigation.navigate('editProfile');
  };

  const handleDelete = () => {
    openDialog({
      type: 'confirm',
      title: '프로필 삭제',
      message: '삭제하시겠습니까?',
      okLabel: '삭제',
      cancelLabel: '취소',
      okFn: () => {
        deleteProfile(undefined, {
          onSuccess: () => {
            navigation.goBack();
          },
        });
      },
    });
  };

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
      <Header
        title="내 프로필 카드"
        showBack
        right={
          <PopoverMenu
            items={[
              { label: '수정', onPress: handleEdit },
              { label: '삭제', destructive: true, onPress: handleDelete },
            ]}
          >
            <View className="items-center justify-center">
              <ProfileActionIcon size={12} color="#000000" orientation="vertical" />
            </View>
          </PopoverMenu>
        }
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* ── 프로필 카드 ── */}
        <View className="items-center pt-6 pb-4">
          <UserProfileCard
            profileImageUri={getProfileImageUrl(profile.image_key)}
            nickname={profile.nickname}
            age={String(profile.age)}
            interests={interests.map((i) => getInterestLabel(i))}
            badgeLevel={profile.cosmic_type ? apiValueToCosmicType(profile.cosmic_type) : undefined}
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
          {profile.cosmic_type && (
            <CosmicTypeSection cosmicType={profile.cosmic_type} showRetestButton />
          )}
          <TmiSection tmiAnswers={tmiAnswers} />
        </View>
      </ScrollView>
    </View>
  );
}
