import React from 'react';
import { Modal as RNModal, Pressable, Text, View } from 'react-native';
import { Button } from '@/shared/ui';
import ProfileCard from '@/features/register/ui/ProfileCard';
import { MOCK_HOME_PROFILE } from '@/widgets/home/model/mockData';

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 교환하기 콜백 */
  onExchange: () => void;
}

/**
 * # ExchangePreviewModal
 * ---
 * - 간단설명: 상대에게 보이는 내 프로필 카드를 미리보기하는 전체 화면 모달
 * - 제약사항 및 특이사항:
 *   - MOCK_HOME_PROFILE 데이터로 내 프로필 카드 표시
 *   - 하단 '교환하기' CTA로 교환 진행
 * ---
 * @param visible 모달 표시 여부
 * @param onExchange 교환하기 콜백
 * ---
 * @example
 * <ExchangePreviewModal visible={true} onExchange={handleExchange} />
 */
export default function ExchangePreviewModal({ visible, onExchange }: Props) {
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
            <ProfileCard
              profileImageUri={MOCK_HOME_PROFILE.profileImageUri}
              nickname={MOCK_HOME_PROFILE.nickname}
              age={MOCK_HOME_PROFILE.age}
              interests={MOCK_HOME_PROFILE.interests}
            />
          </View>

          {/* 교환하기 CTA */}
          <View className="mt-5">
            <Button title="교환하기" variant="primary" onPress={onExchange} />
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
