import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileQRCodeIcon } from '@/shared/ui';
import UserProfileCard from '@/shared/ui/ProfileCard/UserProfileCard';
import EmptyProfileCard from '@/shared/ui/ProfileCard/EmptyProfileCard';
import ProfileFlipWrapper from '@/shared/ui/ProfileCard/ProfileFlipWrapper';
import { ProfileShareQRModal } from '@/features/profileShare';
import { getInterestLabel } from '@/features/register';
import { useMyProfileQuery } from '@/entities/user';
import { getProfileImageUrl } from '@/shared/lib/getProfileImageUrl';
import { apiValueToCosmicType } from '@/entities/storage';
import type { NavigationPropType } from '@/shared/types';
import HomeCardBack from './HomeCardBack';

/**
 * # HomeWidget
 * ---
 * - 간단설명: 홈 화면 프로필 카드 섹션 위젯 — 프로필 유무/앞뒤면 분기 렌더링
 * - 제약사항 및 특이사항:
 *   - 프로필 미등록: 빈 카드 앞뒤 + 생성하기/유형테스트 유도
 *   - 프로필 등록: 앞면(UserProfileCard) ↔ 뒷면(HomeCardBack) flip 전환 + QR공유
 * ---
 * @example
 * <HomeWidget />
 */
export default function HomeWidget() {
  const navigation = useNavigation<NavigationPropType>();
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

  /** 앞면 카드 */
  const frontCard = !hasProfile ? (
    <EmptyProfileCard
      text={'새로운 프로필 카드를\n추가하세요'}
      onPress={() => navigation.navigate('registerProfile')}
    />
  ) : (
    <View>
      <UserProfileCard
        profileImageUri={getProfileImageUrl(profile.image_key)}
        nickname={profile.nickname}
        age={String(profile.age)}
        interests={profile.interests.map((i) => getInterestLabel(i.type))}
        badgeLevel={profile.cosmic_type ? apiValueToCosmicType(profile.cosmic_type) : undefined}
        onPress={() => navigation.navigate('profileDetail')}
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
    </View>
  );

  /** 뒷면 카드 */
  const backCard = (hasProfile && profile.cosmic_type) ? (
    <HomeCardBack cosmicType={profile.cosmic_type} />
  ) : (
    <EmptyProfileCard
      text={'유형 테스트를 통해\n나의 유형을 찾아보세요!'}
      onPress={() => navigation.navigate('cosmicTest')}
    />
  );

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

      {/* 카드 영역 + flip 애니메이션 */}
      <ProfileFlipWrapper
        front={frontCard}
        back={backCard}
      />
    </View>
  );
}
