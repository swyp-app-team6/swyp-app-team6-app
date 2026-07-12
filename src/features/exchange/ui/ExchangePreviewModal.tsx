import React from 'react';
import { ActivityIndicator, Modal as RNModal, Pressable, Text, View } from 'react-native';
import { Button, ProfileCard } from '@/shared/ui';
import { getProfileImageUrl } from '@/shared/lib/getProfileImageUrl';
import { apiValueToCosmicType } from '@/entities/storage';
import useExchangeFlowStore from '../model/useExchangeFlowStore';

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 교환하기 콜백 */
  onExchange: () => void;
  /** 닫기 콜백 */
  onCancel: () => void;
}

/**
 * # ExchangePreviewModal
 * ---
 * - 간단설명: 교환할 상대방 프로필 카드를 미리보기하는 전체 화면 모달
 * - 제약사항 및 특이사항:
 *   - 스캔된 상대방 프로필 데이터를 스토어에서 가져와 표시
 *   - 상단 제목 + X 닫기 버튼
 *   - 하단 '교환하기' CTA 1개
 * ---
 * @param visible 모달 표시 여부
 * @param onExchange 교환하기 콜백
 * @param onCancel 닫기(X) 콜백
 * ---
 * @example
 * <ExchangePreviewModal visible={true} onExchange={handleExchange} onCancel={handleCancel} />
 */
export default function ExchangePreviewModal({ visible, onExchange, onCancel }: Props) {
  const profile = useExchangeFlowStore((s) => s.scannedProfile);

  return (
    <RNModal visible={visible} transparent animationType="slide">
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <Pressable
          className="w-[350px] rounded-xl bg-white px-5 pt-3 pb-7"
          onPress={(e) => e.stopPropagation()}
        >
          {/* 제목 + 닫기 버튼 */}
          <View className="flex-row items-center mb-6">
            <Text className="flex-1 text-center text-[16px] font-bold leading-[22px] text-text-black">
              상대방 프로필 미리보기
            </Text>
            <Pressable onPress={onCancel} hitSlop={8}>
              <Text className="text-2xl text-primary">✕</Text>
            </Pressable>
          </View>

          {/* 상대방 프로필 카드 */}
          <View className="items-center">
            {!profile ? (
              <ActivityIndicator size="large" />
            ) : (
              <ProfileCard
                variant="preview"
                profileImageUri={getProfileImageUrl(profile.image_key)}
                nickname={profile.nickname}
                age={String(profile.age)}
                interests={profile.interests.map((i) => i.label)}
                badgeLevel={profile.cosmic_type ? apiValueToCosmicType(profile.cosmic_type) : undefined}
              />
            )}
          </View>

          {/* 교환하기 CTA */}
          <View className="mt-6">
            <Button title="교환하기" variant="primary" onPress={onExchange} />
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
