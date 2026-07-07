import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Accordion, BottomCTA, Button, PopoverMenu, ProfileActionIcon, ReportIcon, BlockUserIcon } from '@/shared/ui';
import UserProfileCard from '@/shared/ui/ProfileCard/UserProfileCard';
import type { PopoverMenuItem } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';
import { openDialog } from '@/shared/ui/Dialog';
import { MOCK_STORAGE_PROFILE_DETAILS } from '@/entities/storage';
import type { StorageProfileDetail } from '@/entities/storage';
import BasicInfoSection from '@/features/register/ui/BasicInfoSection';
import InterestsSection from '@/features/register/ui/InterestsSection';
import BioSection from '@/features/register/ui/BioSection';
import CosmicTypeSection from '@/features/register/ui/CosmicTypeSection';
import InfoCard from '@/features/register/ui/InfoCard';
import { InterestTag } from '@/shared/ui';
import { getInterestLabel } from '@/features/register';
import ReportBottomSheet from './ReportBottomSheet';
import { useNavigation } from '@react-navigation/native';

interface Props {
  /** 프로필 ID */
  profileId: number;
  /** 만남후기 작성 버튼 콜백 */
  onNavigateToReview: () => void;
}

/**
 * # ExchangedProfileView
 * ---
 * - 간단설명: 교환한 프로필 상세 보기 뷰 컴포넌트
 * - 제약사항 및 특이사항:
 *   - MyProfileView 구조 기반으로 교환 프로필 데이터 표시
 *   - 상단 신고/차단 텍스트 버튼
 *   - 프로필 카드 + 기본정보 + 공통관심사 기본 표시
 *   - "프로필 전체보기" 아코디언으로 나머지 섹션 접기/펼치기
 *   - 차단 시 프로필 이미지 블러 처리
 *   - 하단 "만남후기 작성" CTA
 * ---
 * @param profileId 교환 프로필 ID
 * @param onNavigateToReview 만남후기 작성 네비게이션 콜백
 * ---
 * @example
 * <ExchangedProfileView profileId={1} onNavigateToReview={() => navigate('writeReview')} />
 */
export default function ExchangedProfileView({
  profileId,
  onNavigateToReview,
}: Props) {
  const navigation = useNavigation();
  const reportRef = useRef<BottomSheetHandle>(null);
  const [isBlocked, _setIsBlocked] = useState(false);

  const profile: StorageProfileDetail | undefined = useMemo(
    () => MOCK_STORAGE_PROFILE_DETAILS.find((p) => p.id === profileId),
    [profileId],
  );

  const handleBlock = useCallback(() => {
    openDialog({
      type: 'confirm',
      title: '김실명 님을 차단할까요?',
      message: '더 이상 서로의 프로필이 보이지 않아요.',
      okLabel: '차단',
      cancelLabel: '취소',
      okFn: () => {
        navigation.goBack();
      },
    });
  }, [navigation]);

  /** 신고/차단 팝오버 메뉴 항목 */
  const popoverItems: PopoverMenuItem[] = useMemo(
    () => [
      {
        label: '신고',
        icon: <ReportIcon size={16} color="#888888" />,
        onPress: () => reportRef.current?.open(),
      },
      {
        label: '차단',
        icon: <BlockUserIcon size={16} color="#888888" />,
        onPress: handleBlock,
        destructive: true,
      },
    ],
    [handleBlock],
  );

  if (!profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-base text-[#888888]">
          프로필을 찾을 수 없습니다
        </Text>
      </View>
    );
  }

  const handleReport = (_reportTypes: string[], _detail?: string) => {
    openDialog({
      type: 'alert',
      title: '신고가 접수되었습니다',
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 프로필 카드 */}
        <View className="items-center pb-4">
          <View className="relative">
            <UserProfileCard
              profileImageUri={profile.imageUri}
              nickname={profile.name}
              age={String(profile.age)}
              interests={profile.interests.map((i) => getInterestLabel(i))}
              badgeLevel={profile.cosmicType}
              topRightSlot={
                !isBlocked ? (
                  <PopoverMenu items={popoverItems} align="right">
                    <View className="w-10 h-10 items-center justify-center">
                      <ProfileActionIcon size={28} color="#FFFFFF" orientation="vertical" />
                    </View>
                  </PopoverMenu>
                ) : undefined
              }
            />
            {/* 차단 오버레이 */}
            {isBlocked && (
              <View className="absolute w-full h-full items-center justify-center bg-black/40 rounded-xl">
                <Text className="text-base font-medium text-white">
                  차단된 프로필입니다
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 기본정보 섹션 */}
        <View className="px-5 pb-4 gap-4">
          <BasicInfoSection
            age={String(profile.age)}
            region={profile.region}
            subArea={profile.subArea}
            jobField={profile.jobField}
          />

          {/* 공통관심사 섹션 */}
          <InfoCard title="공통 관심사">
            {profile.commonInterests.length > 0 ? (
              <View className="flex-row flex-wrap gap-1">
                {profile.commonInterests.map((interest) => (
                  <InterestTag
                    key={interest}
                    label={getInterestLabel(interest)}
                    variant="outlined"
                  />
                ))}
              </View>
            ) : (
              <Text className="text-sm text-text-gray4">
                공통 관심사가 없습니다
              </Text>
            )}
          </InfoCard>
        </View>

        {/* 프로필 전체보기 아코디언 */}
        <View className="pb-6">
          <Accordion.Root>
            <Accordion.Item
              itemKey="fullProfile"
              title="프로필 전체보기"
              styleClass={{ content: 'gap-4' }}
            >
              <InterestsSection interests={profile.interests} />
              <BioSection bio={profile.bio} />
              <CosmicTypeSection />
            </Accordion.Item>
          </Accordion.Root>
        </View>

        {/* 하단 여백 (CTA 공간 확보) */}
        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title="만남후기 작성"
          onPress={onNavigateToReview}
          disabled={isBlocked}
        />
      </BottomCTA>

      <ReportBottomSheet ref={reportRef} onSubmit={handleReport} />
    </View>
  );
}
