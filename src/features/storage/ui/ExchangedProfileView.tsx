import React, { useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Accordion, Badge, BottomCTA, Button } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';
import { openDialog } from '@/shared/ui/Dialog';
import { MOCK_STORAGE_PROFILE_DETAILS } from '@/entities/storage';
import type { StorageProfileDetail } from '@/entities/storage';
import BasicInfoSection from '@/features/register/ui/BasicInfoSection';
import InterestsSection from '@/features/register/ui/InterestsSection';
import BioSection from '@/features/register/ui/BioSection';
import CosmicTypeSection from '@/features/register/ui/CosmicTypeSection';
import InfoCard from '@/features/register/ui/InfoCard';
import InterestTag from '@/features/register/ui/InterestTag';
import ReportBottomSheet from './ReportBottomSheet';

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
  const reportRef = useRef<BottomSheetHandle>(null);
  const [isBlocked, setIsBlocked] = useState(false);

  const profile: StorageProfileDetail | undefined = useMemo(
    () => MOCK_STORAGE_PROFILE_DETAILS.find((p) => p.id === profileId),
    [profileId],
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

  const handleBlock = () => {
    openDialog({
      type: 'confirm',
      title: '차단할까요?',
      message: '차단하면 서로의 프로필이 블러 처리됩니다.',
      okLabel: '차단',
      cancelLabel: '취소',
      okFn: () => setIsBlocked(true),
    });
  };

  const handleReport = (_reportTypes: string[], _detail?: string) => {
    openDialog({
      type: 'alert',
      title: '신고가 접수되었습니다',
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 신고/차단 텍스트 버튼 */}
        <View className="flex-row justify-end gap-3 px-5 pt-3 pb-1">
          <Pressable hitSlop={8} onPress={() => reportRef.current?.open()}>
            <Text className="text-sm text-[#888888]">신고</Text>
          </Pressable>
          <Pressable hitSlop={8} onPress={handleBlock}>
            <Text className="text-sm text-[#888888]">차단</Text>
          </Pressable>
        </View>

        {/* 프로필 카드 */}
        <View className="items-center pb-4">
          <View
            className="w-[284px] h-[392px] rounded-xl overflow-hidden"
            style={{
              backgroundColor: '#F5EDFF',
              borderWidth: 2,
              borderColor: '#EADCFF',
            }}
          >
            {profile.imageUri ? (
              <Image
                source={{ uri: profile.imageUri }}
                className="absolute w-full h-full"
                resizeMode="cover"
                blurRadius={isBlocked ? 20 : 0}
              />
            ) : (
              <View className="absolute w-full h-full items-center justify-center">
                <Text className="text-6xl">👤</Text>
              </View>
            )}

            {/* 블러 오버레이 */}
            {isBlocked && (
              <View className="absolute w-full h-full items-center justify-center bg-black/40">
                <Text className="text-base font-medium text-white">
                  차단된 프로필입니다
                </Text>
              </View>
            )}

            {/* 하단 그라디언트 */}
            {!isBlocked && (
              <>
                <LinearGradient
                  colors={[
                    'rgba(255,255,255,0)',
                    'rgba(56,56,56,0.45)',
                    'rgba(0,0,0,1)',
                  ]}
                  locations={[0, 0.29, 1]}
                  className="absolute bottom-0 left-0 right-0 rounded-b-xl"
                  style={{ height: 232 }}
                />
                <View className="absolute top-5 left-5">
                  <Badge level={profile.cosmicType} />
                </View>
                <View className="absolute bottom-0 left-0 right-0 px-5 pb-5 gap-2">
                  <View className="flex-row items-end gap-1">
                    <Text
                      className="text-xl font-bold text-white"
                      style={{ lineHeight: 28 }}
                    >
                      {profile.name}
                    </Text>
                    <Text
                      className="text-xl font-bold text-white"
                      style={{ lineHeight: 28 }}
                    >
                      {profile.age}세
                    </Text>
                  </View>
                  {profile.interests.length > 0 && (
                    <View className="flex-row flex-wrap gap-1">
                      {profile.interests.map((interest) => (
                        <InterestTag
                          key={interest}
                          value={interest}
                          variant="overlay"
                        />
                      ))}
                    </View>
                  )}
                </View>
              </>
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
                    value={interest}
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
