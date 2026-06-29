import React from 'react';
import { View, Text, Image } from 'react-native';
import useRegisterFormStore from '../model/useRegisterFormStore';
import { INTEREST_OPTIONS } from '../model/types';

/**
 * # ProfilePreviewCard
 * ---
 * - 간단설명: 프로필 미리보기 카드 (284x394, Figma 디자인 시안 기반)
 * - 제약사항 및 특이사항:
 *   - 프로필 사진이 카드 전체를 채움
 *   - 하단 그라디언트 오버레이(View 레이어)로 이름/관심사 태그 표시
 *   - 좌상단에 유형 배지 (추후 유형 테스트 결과 연동)
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

  return (
    <View
      className="w-[284px] h-[394px] rounded-xl overflow-hidden self-center"
      style={{ backgroundColor: '#a6a6a6' }}
    >
      {/* 프로필 사진 (카드 전체 채움) */}
      {form.profileImageUri ? (
        <Image
          source={{ uri: form.profileImageUri }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <View className="absolute w-full h-full items-center justify-center bg-gray-400">
          <Text className="text-6xl">👤</Text>
        </View>
      )}

      {/* 하단 그라디언트 오버레이 (View 레이어로 대체) */}
      <View
        className="absolute bottom-0 left-0 right-0 h-[232px] rounded-b-xl"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      />

      {/* 좌상단 유형 배지 */}
      <View
        className="absolute top-4 left-4 rounded-lg px-3 py-1"
        style={{ backgroundColor: 'rgba(120,50,213,0.8)' }}
      >
        <Text
          className="text-white text-[13px] font-semibold"
          style={{ letterSpacing: -0.4 }}
        >
          유형 미설정
        </Text>
      </View>

      {/* 하단 정보 (이름 + 태그) */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-4">
        {/* 이름 */}
        <View className="flex-row items-end gap-1 mb-2">
          <Text
            className="text-white text-2xl font-semibold"
            style={{ letterSpacing: -0.4, lineHeight: 33.6 }}
          >
            {form.nickname || '이름'}
          </Text>
        </View>

        {/* 관심사 태그 (카드 위) */}
        {form.interests.length > 0 && (
          <View className="flex-row flex-wrap gap-1">
            {form.interests.map((interest) => (
              <View
                key={interest}
                className="rounded px-2 py-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
              >
                <Text
                  className="text-white text-sm font-medium"
                  style={{ letterSpacing: -0.4, lineHeight: 16.8 }}
                >
                  {getInterestLabel(interest)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
