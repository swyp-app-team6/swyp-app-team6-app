import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { BottomCTA, Button, Textbox } from '@/shared/ui';
import { ChevronDownIcon } from '@/shared/ui/icons';
import UserProfileCard from '@/shared/ui/ProfileCard/UserProfileCard';
import { getProfileImageUrl } from '@/shared/lib/getProfileImageUrl';
import { useExchangeArchiveDetailQuery } from '@/entities/storage';
import type { ReviewScore } from '@/entities/storage';

/** 만남 후기 만족도 옵션 (value = API score 1-4) */
const REVIEW_OPTIONS: { label: string; value: ReviewScore }[] = [
  { label: '매우 좋았어요', value: 4 },
  { label: '좋았어요', value: 3 },
  { label: '나쁘지 않았어요', value: 2 },
  { label: '잘 모르겠어요', value: 1 },
];

interface Props {
  /** 프로필 ID */
  profileId: number;
  /** 후기 등록 콜백 */
  onSubmit: (score: ReviewScore, review: string) => void;
  /** 등록 중 로딩 상태 */
  loading?: boolean;
}

/**
 * # WriteReviewView
 * ---
 * - 간단설명: 만남 후기 작성 폼 뷰 컴포넌트
 * - 제약사항 및 특이사항:
 *   - useExchangeArchiveDetailQuery로 프로필 데이터 조회
 *   - 만족도 드롭다운 셀렉트
 *   - Textbox로 후기 내용 입력 (최대 300자)
 *   - 만족도 미선택 시 "등록하기" 버튼 비활성화
 * ---
 * @param profileId 대상 프로필 ID
 * @param onSubmit 후기 등록 콜백 (score, review)
 * @param loading 로딩 상태
 * ---
 * @example
 * <WriteReviewView profileId={1} onSubmit={(rating, text) => submit(rating, text)} />
 */
export default function WriteReviewView({
  profileId,
  onSubmit,
  loading,
}: Props) {
  const [selectedRating, setSelectedRating] = useState<ReviewScore | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: detail } = useExchangeArchiveDetailQuery(profileId);
  const profile = detail?.profile;

  const selectedLabel = REVIEW_OPTIONS.find(
    (o) => o.value === selectedRating,
  )?.label;

  const isDisabled = !selectedRating;

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 프로필 카드 */}
        {profile && (
          <View className="items-center pt-6 pb-6">
            <UserProfileCard
              profileImageUri={getProfileImageUrl(profile.image_key)}
              nickname={profile.nickname}
              age={String(profile.age)}
              interests={profile.interests.map((i) => i.label)}
            />
          </View>
        )}

        {/* 만족도 셀렉트 */}
        <View className="px-5 pb-6 gap-3">
          <Text className="text-base font-medium text-[#18181B]">
            전체적인 만남은 어떠셨나요?
          </Text>
          <View
            className="rounded-xl py-3"
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#E3E3E3',
            }}
          >
            {/* 셀렉트 트리거 */}
            <Pressable
              className="flex-row items-center justify-between mx-3 p-4 bg-[#F5F5F5] rounded-xl"
              onPress={() => setIsDropdownOpen((prev) => !prev)}
            >
              <Text
                className="flex-1 text-sm font-medium"
                style={{ color: selectedLabel ? '#1A1A1A' : '#888888' }}
              >
                {selectedLabel ?? '만남은 어떠셨나요?'}
              </Text>
              <ChevronDownIcon size={24} color="#111111" />
            </Pressable>

            {/* 드롭다운 옵션 목록 */}
            {isDropdownOpen &&
              REVIEW_OPTIONS.map((option) => {
                const isSelected = selectedRating === option.value;
                return (
                  <Pressable
                    key={option.value}
                    className="px-6 py-4"
                    style={{
                      backgroundColor: isSelected ? '#F5EDFF' : '#FFFFFF',
                    }}
                    onPress={() => {
                      setSelectedRating(option.value);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text
                      className="text-sm font-medium"
                      style={{
                        color: isSelected ? '#8C39FB' : '#1A1A1A',
                      }}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
          </View>
        </View>

        {/* 메모 입력 */}
        <View className="px-5 pb-6">
          <View className="flex-row items-center gap-1 mb-3">
            <Text className="text-base font-medium text-[#18181B]">
              메모를 남겨주세요
            </Text>
            <Text className="text-sm font-medium text-[#71717A]">
              (나만 볼 수 있어요)
            </Text>
          </View>
          <Textbox
            value={reviewText}
            onChangeText={setReviewText}
            placeholder="나만 볼 수 있으니 편하게 남겨주세요!"
            maxLength={300}
            minHeight={112}
          />
        </View>

        {/* 하단 여백 (CTA 공간 확보) */}
        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title="등록하기"
          onPress={() => onSubmit(selectedRating!, reviewText.trim())}
          disabled={isDisabled}
          loading={loading}
        />
      </BottomCTA>

    </View>
  );
}
