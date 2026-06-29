import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Tag } from '@/shared/ui';
import useRegisterFormStore from '../model/useRegisterFormStore';
import { INTEREST_OPTIONS } from '../model/types';
import { TMI_QUESTIONS } from '../model/tmiData';

/**
 * # ProfilePreviewCard
 * ---
 * - 간단설명: 프로필 등록 5단계에서 사용하는 프로필 카드 미리보기
 * - 제약사항 및 특이사항:
 *   - useRegisterFormStore에서 폼 데이터를 읽어 표시
 *   - 사진 + 그라디언트 오버레이 + 이름/성별
 *   - 관심사 태그, TMI 답변 표시
 * ---
 * @example
 * <ProfilePreviewCard />
 */
export default function ProfilePreviewCard() {
  const { form } = useRegisterFormStore();

  /** Interest 값을 한국어 라벨로 변환 */
  const getInterestLabel = (value: string) => {
    return INTEREST_OPTIONS.find((o) => o.value === value)?.label ?? value;
  };

  /** TMI 질문 ID로 질문 텍스트 가져오기 */
  const getQuestionText = (questionId: string) => {
    return TMI_QUESTIONS.find((q) => q.id === questionId)?.question ?? '';
  };

  return (
    <View className="w-[284px] rounded-3xl overflow-hidden bg-white shadow-lg self-center">
      {/* 상단 프로필 사진 영역 */}
      <View className="h-[200px] bg-gray-200">
        {form.profileImageUri ? (
          <ImageBackground
            source={{ uri: form.profileImageUri }}
            className="w-full h-full justify-end"
          >
            <View className="bg-black/40 px-4 py-3">
              <Text className="text-white text-lg font-bold">
                {form.nickname}
              </Text>
              <Text className="text-white/80 text-xs">
                {form.gender === 'M' ? '남성' : form.gender === 'F' ? '여성' : ''}
              </Text>
            </View>
          </ImageBackground>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-4xl text-gray-300">👤</Text>
            <Text className="text-white text-lg font-bold mt-2">
              {form.nickname}
            </Text>
          </View>
        )}
      </View>

      {/* 자기소개 */}
      {form.bio.length > 0 && (
        <View className="px-4 pt-4 pb-2">
          <Text className="text-xs font-semibold text-text-gray3 mb-1">자기소개</Text>
          <Text className="text-sm text-text-black">{form.bio}</Text>
        </View>
      )}

      {/* 관심사 */}
      {form.interests.length > 0 && (
        <View className="px-4 pt-2 pb-2">
          <Text className="text-xs font-semibold text-text-gray3 mb-2">관심사</Text>
          <View className="flex-row flex-wrap gap-1.5">
            {form.interests.map((interest) => (
              <Tag key={interest} label={getInterestLabel(interest)} variant="primary" />
            ))}
          </View>
        </View>
      )}

      {/* TMI */}
      {form.tmiAnswers.length > 0 && (
        <View className="px-4 pt-2 pb-4">
          <Text className="text-xs font-semibold text-text-gray3 mb-2">나만의 TMI</Text>
          <View className="gap-2">
            {form.tmiAnswers.slice(0, 3).map((tmi) => (
              <View key={tmi.questionId} className="bg-gray-50 rounded-lg p-2.5">
                <Text className="text-xs text-text-gray4 mb-0.5">
                  {getQuestionText(tmi.questionId)}
                </Text>
                <Text className="text-sm text-text-black font-medium">
                  {tmi.answer}
                </Text>
              </View>
            ))}
            {form.tmiAnswers.length > 3 && (
              <Text className="text-xs text-text-gray4 text-center">
                +{form.tmiAnswers.length - 3}개 더
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
