import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Tag } from '@/shared/ui';
import { HeartIcon } from '@/shared/ui/icons';
import type { StorageProfile } from '@/entities/storage';
import { COSMIC_TYPE_LABEL } from '@/entities/storage';

interface ProfileCardProps {
  /** 프로필 데이터 */
  profile: StorageProfile;
  /** 즐겨찾기 토글 콜백 */
  onToggleFavorite: (id: number) => void;
}

/**
 * # ProfileCard
 * ---
 * - 간단설명: 보관함 2열 그리드에 표시되는 프로필 카드 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 이미지 높이 184px, rounded-lg
 *   - Tag outline 변형으로 코스믹 유형 표시
 *   - HeartIcon으로 즐겨찾기 토글
 * ---
 * @param profile 프로필 데이터
 * @param onToggleFavorite 즐겨찾기 토글 콜백
 * ---
 * @example
 * <ProfileCard profile={profile} onToggleFavorite={(id) => toggle(id)} />
 */
export default function ProfileCard({ profile, onToggleFavorite }: ProfileCardProps) {
  const typeLabel = COSMIC_TYPE_LABEL[profile.cosmicType];

  return (
    <View className="flex-1 overflow-hidden rounded-xl pb-3">
      {/* 프로필 이미지 */}
      <View className="h-[184px] overflow-hidden rounded-lg">
        <Image
          source={{ uri: profile.imageUri }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      {/* 카드 정보 */}
      <View className="mt-3 gap-2">
        {/* 코스믹 유형 태그 + 하트 */}
        <View className="flex-row items-center justify-between">
          <Tag
            label={typeLabel}
            variant="outline"
            styleClass={{ root: 'rounded px-2 py-1' }}
          />
          <Pressable hitSlop={8} onPress={() => onToggleFavorite(profile.id)}>
            <HeartIcon filled={profile.isFavorited} />
          </Pressable>
        </View>

        {/* 이름 + 나이 */}
        <View className="flex-row items-center gap-1">
          <Text className="text-base font-medium text-text-black">
            {profile.name}
          </Text>
          <Text className="text-base font-medium text-text-black">
            {profile.age}세
          </Text>
        </View>

        {/* 지역 + 직업 */}
        <View className="flex-row items-start gap-1">
          <Text className="text-sm font-medium text-text-gray3">
            {profile.location}
          </Text>
          <Text className="text-sm font-medium text-text-gray3" numberOfLines={1}>
            {profile.job}
          </Text>
        </View>
      </View>
    </View>
  );
}
