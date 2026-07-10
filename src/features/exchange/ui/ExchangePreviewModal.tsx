import React from 'react';
import { ActivityIndicator, Modal as RNModal, Pressable, Text, View } from 'react-native';
import { Button, ProfileCard } from '@/shared/ui';
import { useMyProfileQuery } from '@/entities/user';
import { getProfileImageUrl } from '@/shared/lib/getProfileImageUrl';

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 교환하기 콜백 */
  onExchange: () => void;
  /** 취소하기 콜백 */
  onCancel: () => void;
}

/**
 * # ExchangePreviewModal
 * ---
 * - 간단설명: 상대에게 보이는 내 프로필 카드를 미리보기하는 전체 화면 모달
 * - 제약사항 및 특이사항:
 *   - 실제 프로필 데이터로 내 프로필 카드 표시
 *   - 하단 '취소하기' / '교환하기' CTA로 교환 진행 또는 취소
 * ---
 * @param visible 모달 표시 여부
 * @param onExchange 교환하기 콜백
 * @param onCancel 취소하기 콜백
 * ---
 * @example
 * <ExchangePreviewModal visible={true} onExchange={handleExchange} onCancel={handleCancel} />
 */
export default function ExchangePreviewModal({ visible, onExchange, onCancel }: Props) {
  const { data: profile, isLoading } = useMyProfileQuery();

  return (
    <RNModal visible={visible} transparent animationType="slide">
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <Pressable
          className="w-[320px] rounded-2xl bg-white px-4 py-6"
          onPress={(e) => e.stopPropagation()}
        >
          {/* 타이틀 */}
          <Text className="mb-5 text-center text-[16px] font-bold leading-[22px] text-text-black">
            상대에게 보이는 내 프로필
          </Text>

          {/* 내 프로필 카드 */}
          <View className="items-center">
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <ProfileCard
                variant="preview"
                profileImageUri={getProfileImageUrl(profile?.image_key)}
                nickname={profile?.nickname}
                age={profile ? String(profile.age) : undefined}
                interests={profile?.interests.map((i) => i.label) ?? []}
              />
            )}
          </View>

          {/* 취소하기 / 교환하기 CTA */}
          <View className="mt-5 flex-row gap-3">
            <View className="flex-1">
              <Button title="취소하기" variant="secondary" onPress={onCancel} />
            </View>
            <View className="flex-1">
              <Button title="교환하기" variant="primary" onPress={onExchange} />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
