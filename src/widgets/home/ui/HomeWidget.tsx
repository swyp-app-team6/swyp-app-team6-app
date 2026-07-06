import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileCard, ProfileQRCodeIcon } from '@/shared/ui';
import { ProfileCreatePlusIcon, FlipIcon } from '@/shared/ui/icons';
import { ProfileShareQRModal } from '@/features/profileShare';
import { getInterestLabel } from '@/features/register';
import { useMyProfileQuery } from '@/entities/user';
import { CosmicType } from '@/shared/enums';
import { getProfileImageUrl } from '@/shared/lib/getProfileImageUrl';
import type { NavigationPropType } from '@/shared/types';
import HomeCardBack from './HomeCardBack';

/**
 * # HomeWidget
 * ---
 * - 간단설명: 홈 화면 프로필 카드 섹션 위젯 — 프로필 유무/앞뒤면 분기 렌더링
 * - 제약사항 및 특이사항:
 *   - 프로필 미등록: 빈 카드 + 생성하기 유도만 표시
 *   - 프로필 등록: 앞면(ProfileCard) ↔ 뒷면(HomeCardBack) 전환 + QR공유 + 전체보기
 * ---
 * @example
 * <HomeWidget />
 */
export default function HomeWidget() {
  const navigation = useNavigation<NavigationPropType>();
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  const { data: profile, isLoading } = useMyProfileQuery();
  const hasProfile = !!profile;

  if (isLoading) {
    return (
      <View className="mt-8 items-center justify-center h-[392px]">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="mt-8 items-center">
      {/* 프로필 존재 시: 타이틀 */}
      {hasProfile && (
        <View className="w-full flex-row items-center justify-between mb-5">
          <View className="flex-row items-center gap-1">
            <Text className="text-[16px] font-semibold leading-[22px] tracking-tight text-primary">
              {profile.nickname}
            </Text>
            <Text className="text-[16px] font-medium leading-[22px] tracking-tight text-text-black">
              님의 프로필 카드
            </Text>
          </View>
        </View>
      )}

      {/* 카드 영역 */}
      {!hasProfile ? (
        /* 빈 프로필 카드 */
        <Pressable
          onPress={() => navigation.navigate('registerProfile')}
          className="h-[392px] w-[284px] items-center justify-center rounded-xl border-2 border-primary-light bg-primary-lightest"
        >
          <View className="items-center">
            <View className="mb-3">
              <ProfileCreatePlusIcon size={40} />
            </View>
            <Text className="text-center text-[14px] font-medium leading-[20px] tracking-tight text-primary">
              {'새로운 프로필 카드를\n추가하세요'}
            </Text>
          </View>
        </Pressable>
      ) : !isFlipped ? (
        /* 프로필 카드 앞면 */
        <Pressable
          onPress={() => navigation.navigate('profileDetail')}
        >
          <ProfileCard
            variant="preview"
            profileImageUri={getProfileImageUrl(profile.image_key)}
            nickname={profile.nickname}
            age={String(profile.age)}
            interests={profile.interests.map((i) => getInterestLabel(i.type))}
            topRightSlot={
              <Pressable
                hitSlop={8}
                onPress={() => setQrVisible(true)}
                accessibilityLabel="프로필 카드 QR 공유"
              >
                <ProfileQRCodeIcon size={24} color="#FFFFFF" />
              </Pressable>
            }
          />
          <ProfileShareQRModal visible={qrVisible} onClose={() => setQrVisible(false)} />
        </Pressable>
      ) : (
        /* 프로필 카드 뒷면 */
        <HomeCardBack cosmicType={profile.cosmic_type ?? CosmicType.SHOOTING_STAR} />
      )}

      {/* 프로필 존재 시: 뒷면 보기 + 전체보기 버튼 */}
      {hasProfile && (
        <>
          {/* 뒷면 보기 버튼 */}
          <Pressable
            onPress={() => setIsFlipped((prev) => !prev)}
            className="mt-4 flex-row items-center gap-1 rounded-[20px] px-3 py-2"
          >
            <FlipIcon size={20} color="#888888" />
            <Text className="text-[12px] tracking-tight text-text-gray4">
              뒷면 보기
            </Text>
          </Pressable>
        </>
      )}

    </View>
  );
}
