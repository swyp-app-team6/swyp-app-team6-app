import React, { useRef, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { Badge, BottomCTA, Button, SafeBottomSheetModal, Textbox } from '@/shared/ui';
import { ChevronDownIcon } from '@/shared/ui/icons';
import { MOCK_STORAGE_PROFILE_DETAILS } from '@/entities/storage';
import InterestTag from '@/features/register/ui/InterestTag';

/** 만남 후기 만족도 옵션 */
const REVIEW_OPTIONS = [
  { label: '매우 좋았어요', value: 'very_good' },
  { label: '좋았어요', value: 'good' },
  { label: '나쁘지 않았어요', value: 'not_bad' },
  { label: '잘 모르겠어요', value: 'not_sure' },
];

interface Props {
  /** 프로필 ID */
  profileId: number;
  /** 후기 등록 콜백 */
  onSubmit: (rating: string, reviewText: string) => void;
  /** 등록 중 로딩 상태 */
  loading?: boolean;
}

/**
 * # WriteReviewView
 * ---
 * - 간단설명: 만남 후기 작성 폼 뷰 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 상단 프로필 카드 표시
 *   - 만족도 드롭다운 셀렉트 (매우 좋았어요/좋았어요/나쁘지 않았어요/잘 모르겠어요)
 *   - Textbox로 후기 내용 입력 (최대 500자)
 *   - 만족도 미선택 시 "등록하기" 버튼 비활성화
 * ---
 * @param profileId 대상 프로필 ID
 * @param onSubmit 후기 등록 콜백 (만족도, 후기 텍스트)
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
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const ratingSheetRef = useRef<BottomSheetModal>(null);

  const profile = useMemo(
    () => MOCK_STORAGE_PROFILE_DETAILS.find((p) => p.id === profileId),
    [profileId],
  );

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
                />
              ) : (
                <View className="absolute w-full h-full items-center justify-center">
                  <Text className="text-6xl">👤</Text>
                </View>
              )}
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
            </View>
          </View>
        )}

        {/* 만족도 셀렉트 트리거 */}
        <View className="px-5 pb-4">
          <Pressable
            className="flex-row items-center justify-between p-4 bg-[#F5F5F5] rounded-xl"
            style={{ borderWidth: 1, borderColor: '#E3E3E3' }}
            onPress={() => ratingSheetRef.current?.present()}
          >
            <Text
              className="flex-1 text-sm font-medium"
              style={{ color: selectedLabel ? '#1A1A1A' : '#71717A' }}
            >
              {selectedLabel ?? '만남은 어떠셨나요?'}
            </Text>
            <ChevronDownIcon size={24} color="#111111" />
          </Pressable>
        </View>

        {/* 후기 텍스트 입력 */}
        <View className="px-5 pb-6">
          <Textbox
            label="후기 작성"
            value={reviewText}
            onChangeText={setReviewText}
            placeholder="상대방과의 만남은 어떠셨나요? 나만 보는 후기를 작성해보세요."
            maxLength={500}
            minHeight={150}
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

      {/* 만족도 선택 바텀시트 */}
      <SafeBottomSheetModal ref={ratingSheetRef}>
        <View className="px-5 pt-2 pb-2">
          <Text className="text-lg font-bold text-[#1A1A1A]">
            만남은 어떠셨나요?
          </Text>
        </View>
        {REVIEW_OPTIONS.map((option) => {
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
                ratingSheetRef.current?.dismiss();
              }}
            >
              <Text
                className="text-sm font-medium"
                style={{
                  color: isSelected ? '#8C39FB' : '#18181B',
                }}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </SafeBottomSheetModal>
    </View>
  );
}
