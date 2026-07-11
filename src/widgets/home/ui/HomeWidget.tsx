import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileQRCodeIcon } from '@/shared/ui';
import { openDialog, closeDialog } from '@/shared/ui/Dialog';
import UserProfileCard from '@/shared/ui/ProfileCard/UserProfileCard';
import EmptyProfileCard from '@/shared/ui/ProfileCard/EmptyProfileCard';
import ProfileFlipWrapper from '@/shared/ui/ProfileCard/ProfileFlipWrapper';
import { ProfileShareQRModal, useExchangeWait } from '@/features/profileShare';
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
 *   - QR 모달이 닫혀도 교환 대기가 유지되어 상대방 교환 요청 수신 가능
 * ---
 * @example
 * <HomeWidget />
 */
export default function HomeWidget() {
  const navigation = useNavigation<NavigationPropType>();
  const [qrVisible, setQrVisible] = useState(false);
  const { data: profile, isLoading } = useMyProfileQuery();
  const hasProfile = !!profile;

  const {
    receivedProfile,
    modalStep,
    isWaiting,
    startWait,
    cancelWait,
    acceptExchange,
    declineExchange,
  } = useExchangeWait();

  /** QR 모달 열기 — wait가 활성 상태가 아니면 시작 */
  const handleOpenQR = useCallback(() => {
    setQrVisible(true);
    if (!isWaiting) {
      startWait();
    }
  }, [isWaiting, startWait]);

  /** QR 모달 닫기 — wait는 유지, 모달만 닫음 */
  const handleCloseQR = useCallback(() => {
    setQrVisible(false);
  }, []);

  /** 수락하기 핸들러 */
  const handleAccept = useCallback(() => {
    acceptExchange(navigation);
  }, [acceptExchange, navigation]);

  /** 거절하기 핸들러 */
  const handleDecline = useCallback(() => {
    declineExchange();
  }, [declineExchange]);

  /**
   * QR 모달이 닫힌 상태에서 교환 요청 수신 시 글로벌 다이얼로그 표시
   * — 모달 열린 상태에서는 모달 내부에서 PREVIEW 단계로 처리
   */
  useEffect(() => {
    if (receivedProfile && !qrVisible && modalStep === 'PREVIEW') {
      openDialog({
        type: 'confirm',
        title: '프로필 교환',
        message: '상대방이 교환을 요청했습니다.\n수락하시겠습니까?',
        okLabel: '수락하기',
        cancelLabel: '거절하기',
        okFn: () => {
          closeDialog();
          acceptExchange(navigation);
        },
        cancelFn: () => {
          closeDialog();
          declineExchange();
        },
        autoClose: false,
      });
    }
  }, [receivedProfile, qrVisible, modalStep, acceptExchange, declineExchange, navigation]);

  /** 컴포넌트 unmount 시 wait 정리 */
  useEffect(() => {
    return () => {
      cancelWait();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        interests={profile.interests.map((i) => i.label)}
        badgeLevel={profile.cosmic_type ? apiValueToCosmicType(profile.cosmic_type) : undefined}
        onPress={() => navigation.navigate('profileDetail')}
        topRightSlot={
          <Pressable
            hitSlop={8}
            onPress={handleOpenQR}
            accessibilityLabel="프로필 카드 QR 공유"
          >
            <ProfileQRCodeIcon size={24} color="#FFFFFF" />
          </Pressable>
        }
      />
      <ProfileShareQRModal
        visible={qrVisible}
        onClose={handleCloseQR}
        modalStep={qrVisible ? modalStep : 'QR'}
        receivedProfile={receivedProfile}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
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
      {/* 타이틀: 프로필 카드가 없어도 항상 표시, nickname 없으면 "사용자" */}
      <View className="w-full flex-row items-center justify-between mb-5">
        <View className="flex-row items-center gap-1">
          <Text className="text-[16px] font-semibold leading-[22px] tracking-tight text-primary">
            {profile?.nickname ?? '사용자'}
          </Text>
          <Text className="text-[16px] font-medium leading-[22px] tracking-tight text-text-black">
            님의 프로필 카드
          </Text>
        </View>
      </View>

      {/* 카드 영역 + flip 애니메이션 */}
      <ProfileFlipWrapper
        front={frontCard}
        back={backCard}
      />
    </View>
  );
}
