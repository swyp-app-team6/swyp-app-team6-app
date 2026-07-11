import React, { useCallback, useMemo, useRef } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Accordion, BottomCTA, Button, PopoverMenu, ProfileActionIcon, ReportIcon, BlockUserIcon, Badge, InterestTag } from '@/shared/ui';
import ProfileCardContainer from '@/shared/ui/ProfileCard/ProfileCardContainer';
import type { PopoverMenuItem } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';
import { openDialog } from '@/shared/ui/Dialog';
import { useExchangeArchiveDetailQuery, apiValueToCosmicType } from '@/entities/storage';
import type { ReportReasonCode, ReviewScore } from '@/entities/storage';
import { getProfileImageUrl } from '@/shared/lib/getProfileImageUrl';
import BasicInfoSection from '@/features/register/ui/BasicInfoSection';
import InterestsSection from '@/features/register/ui/InterestsSection';
import BioSection from '@/features/register/ui/BioSection';
import CosmicTypeSection from '@/features/register/ui/CosmicTypeSection';
import InfoCard from '@/features/register/ui/InfoCard';
import ReportBottomSheet from './ReportBottomSheet';
import useReportMutation from '../api/useReportMutation';
import useBlockMutation from '../api/useBlockMutation';
import ReviewReadView from './ReviewReadView';

interface Props {
  /** 프로필 ID */
  profileId: number;
  /** 만남후기 작성 버튼 콜백 */
  onNavigateToReview: () => void;
  /** 차단 성공 콜백 */
  onBlockSuccess?: () => void;
}

/**
 * # ExchangedProfileView
 * ---
 * - 간단설명: 교환한 프로필 상세 보기 뷰 컴포넌트
 * - 제약사항 및 특이사항:
 *   - useExchangeFlowStore의 scannedProfile, exchangeResult 데이터 사용
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
  onBlockSuccess,
}: Props) {
  const reportRef = useRef<BottomSheetHandle>(null);

  const { data: detail, isLoading } = useExchangeArchiveDetailQuery(profileId);
  const { mutate: submitReport } = useReportMutation();
  const { mutate: submitBlock } = useBlockMutation();

  const profile = detail?.profile;
  const matchedInterests = detail?.matched_interests ?? [];
  const imageUri = getProfileImageUrl(profile?.image_key);
  const cosmicType = profile?.cosmic_type ? apiValueToCosmicType(profile.cosmic_type) : undefined;

  const hasReview = (detail?.score ?? 0) > 0;

  const handleBlock = useCallback(() => {
    openDialog({
      type: 'confirm',
      title: `${profile?.nickname ?? ''} 님을 차단할까요?`,
      message: '차단하면 프로필이\n노출되지 않아요.',
      okLabel: '차단',
      cancelLabel: '취소',
      okFn: () => {
        submitBlock(profileId, {
          onSuccess: () => {
            openDialog({
              type: 'alert',
              title: '차단이 완료되었습니다.',
              message: '더 이상 서로의 프로필이\n보이지 않아요.',
              okFn: () => onBlockSuccess?.(),
            });
          },
          onError: () => {
            openDialog({
              type: 'alert',
              title: '차단에 실패했습니다',
              message: '잠시 후 다시 시도해주세요.',
            });
          },
        });
      },
    });
  }, [profile, submitBlock, profileId, onBlockSuccess]);

  /** 신고/차단 팝오버 메뉴 항목 */
  const popoverItems: PopoverMenuItem[] = useMemo(
    () => [
      {
        label: '차단하기',
        icon: <BlockUserIcon size={16} color="#1A1A1A" />,
        onPress: handleBlock,
      },
      {
        label: '신고하기',
        icon: <ReportIcon size={16} color="#E01619" />,
        onPress: () => reportRef.current?.open(),
      },
    ],
    [handleBlock],
  );

  const handleReport = useCallback(
    (reasonCodes: ReportReasonCode[], etcDetail?: string) => {
      submitReport(
        {
          profileExchangeId: profileId,
          reasonCodes,
          etcDetail,
        },
        {
          onSuccess: () => {
            openDialog({
              type: 'alert',
              message: '신고가 접수되었습니다',
            });
          },
          onError: () => {
            openDialog({
              type: 'alert',
              title: '신고 접수에 실패했습니다',
              message: '잠시 후 다시 시도해주세요.',
            });
          },
        },
      );
    },
    [submitReport, profileId],
  );


  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!detail || !profile) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-base text-[#888888]">
          프로필을 찾을 수 없습니다
        </Text>
      </View>
    );
  }


  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 프로필 카드 */}
        <View className="items-center pb-4">
          <View className="relative">
            <ProfileCardContainer className="border-primary-light p-0 overflow-hidden">
              {/* 프로필 사진 */}
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  className="absolute w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="absolute w-full h-full items-center justify-center">
                </View>
              )}

              {/* 상단: 배지 + 신고/차단 메뉴 */}
              <View className="absolute top-5 left-5 right-5 flex-row items-center justify-between">
                <View>{cosmicType && <Badge level={cosmicType} />}</View>
                <PopoverMenu items={popoverItems} align="right">
                  <View className="w-10 h-10 items-center justify-center">
                    <ProfileActionIcon size={12} color="#FFFFFF" orientation="vertical" />
                  </View>
                </PopoverMenu>
              </View>

              {/* 하단 어두운 그라데이션 오버레이 */}
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.4)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              />

              {/* 하단: 닉네임 + 나이 + 관심사 태그 */}
              <View className="absolute bottom-0 left-0 right-0 px-5 pb-5 gap-2">
                <View className="flex-row items-end gap-1">
                  <Text className="text-xl font-bold text-white" style={{ lineHeight: 28 }}>
                    {profile.nickname}
                  </Text>
                  <Text className="text-xl font-bold text-white" style={{ lineHeight: 28 }}>
                    {profile.age}세
                  </Text>
                </View>

                {profile.interests.length > 0 && (
                  <View className="flex-row flex-wrap gap-1">
                    {profile.interests.map((i) => (
                      <InterestTag key={i.type} label={i.label} variant="overlay" />
                    ))}
                  </View>
                )}
              </View>
            </ProfileCardContainer>
          </View>
        </View>

        {/* 기본정보 섹션 */}
        <View className="px-5 pb-4 gap-4">
          <BasicInfoSection
            age={String(profile.age)}
            region={profile.region}
            jobField={profile.job}
          />

          {/* 공통관심사 섹션 */}
          <InfoCard title="두 우주의 공통 관심사">
            {matchedInterests.length > 0 ? (
              <View className="flex-row flex-wrap gap-1">
                {matchedInterests.map((interest) => (
                  <InterestTag
                    key={interest.type}
                    label={interest.label}
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
              <InterestsSection interests={profile.interests.map((i) => i.type)} />
              <BioSection bio={profile.bio} />
              {profile.cosmic_type && (
                <CosmicTypeSection cosmicType={profile.cosmic_type} />
              )}
              {hasReview && (
                <ReviewReadView
                  score={detail.score as ReviewScore}
                  memo={detail.memo}
                />
              )}
            </Accordion.Item>
          </Accordion.Root>
        </View>

        {/* 하단 여백 (CTA 공간 확보) */}
        <View className="h-24" />
      </ScrollView>

      {!hasReview && (
        <BottomCTA>
          <Button
            title="만남후기 작성"
            onPress={onNavigateToReview}
          />
        </BottomCTA>
      )}

      <ReportBottomSheet ref={reportRef} nickname={profile.nickname} onSubmit={handleReport} />
    </View>
  );
}
