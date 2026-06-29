import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BottomCTA, Button } from '@/shared/ui';
import ProfilePreviewCard from './ProfilePreviewCard';

interface Props {
  /** 등록 완료 버튼 콜백 */
  onSubmit: () => void;
  /** API 호출 중 로딩 상태 */
  loading?: boolean;
}

/**
 * # Step5PreviewView
 * ---
 * - 간단설명: 프로필 등록 5단계 - 프로필 미리보기 및 등록 완료
 * - 제약사항 및 특이사항:
 *   - ProfilePreviewCard로 입력한 정보를 카드 형태로 미리보기
 *   - "등록 완료하기" 버튼으로 서버에 프로필 등록
 * ---
 * @param onSubmit 등록 완료 버튼 콜백
 * @param loading API 호출 중 로딩 상태
 * @example
 * <Step5PreviewView onSubmit={handleSubmit} loading={false} />
 */
export default function Step5PreviewView({ onSubmit, loading }: Props) {
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 pt-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <Text className="text-xl font-bold text-text-black mb-2">
          프로필을 확인해주세요
        </Text>
        <Text className="text-sm text-text-gray3 mb-6">
          등록 후 마이페이지에서 수정할 수 있어요
        </Text>

        <ProfilePreviewCard />

        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title="등록 완료하기"
          onPress={onSubmit}
          loading={loading}
        />
      </BottomCTA>
    </View>
  );
}
