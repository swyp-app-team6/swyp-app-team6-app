import React, { memo } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Badge from '../Badge';
import Tag from '../Tag';
import { Checkbox } from '../Checkbox';
import { HeartIcon } from '../icons';
import InterestTag from '../InterestTag';
import type { BadgeLevel } from '../Badge';

/* ────────────────────────────────────────────────────────
 * Variant: preview
 * ──────────────────────────────────────────────────────── */

interface PreviewProps {
  variant: 'preview';
  /** 프로필 이미지 URI */
  profileImageUri?: string | null;
  /** 닉네임 */
  nickname?: string;
  /** 나이 (문자열) */
  age?: string;
  /** 관심사 라벨 목록 */
  interests: string[];
  /** 배지 레벨 */
  badgeLevel?: BadgeLevel;
  /** 우측 상단 슬롯 (QR 버튼 등) */
  topRightSlot?: React.ReactNode;
}

/* ────────────────────────────────────────────────────────
 * Variant: compact
 * ──────────────────────────────────────────────────────── */

interface CompactProps {
  variant: 'compact';
  /** 프로필 이미지 URI */
  profileImageUri?: string | null;
  /** 닉네임 */
  nickname?: string;
  /** 직업 */
  job?: string;
  /** 지역 */
  region?: string;
  /** 로딩 상태 */
  isLoading?: boolean;
}

/* ────────────────────────────────────────────────────────
 * Variant: grid
 * ──────────────────────────────────────────────────────── */

interface GridProps {
  variant: 'grid';
  /** 프로필 ID */
  id: number;
  /** 이름 */
  name: string;
  /** 나이 */
  age: number;
  /** 지역 */
  location: string;
  /** 직업 */
  job: string;
  /** 코스믹 유형 라벨 (변환된 한국어) */
  cosmicTypeLabel: string;
  /** 프로필 이미지 URI */
  imageUri: string;
  /** 즐겨찾기 여부 */
  isFavorited: boolean;
  /** 즐겨찾기 토글 콜백 */
  onToggleFavorite: (id: number) => void;
  /** 카드 클릭 콜백 */
  onPress?: (id: number) => void;
  /** 편집 모드 여부 */
  isEditMode?: boolean;
  /** 선택 여부 (편집 모드) */
  isSelected?: boolean;
  /** 선택 토글 콜백 (편집 모드) */
  onToggleSelect?: (id: number) => void;
}

type ProfileCardProps = PreviewProps | CompactProps | GridProps;

/**
 * # ProfileCard
 * ---
 * - 간단설명: 프로필 카드 통합 컴포넌트 (variant로 레이아웃 분기)
 * - 제약사항 및 특이사항:
 *   - variant="preview": 284x392 카드, 그라디언트 오버레이, 배지, 관심사 태그
 *   - variant="compact": 원형 아바타 + 닉네임 + 직업/지역
 *   - variant="grid": 보관함 2열 그리드 카드 (이미지 + 태그 + 하트 + 편집)
 *   - 내부 API 호출 없음 — 모든 데이터를 props로 전달
 * ---
 * @example
 * <ProfileCard variant="preview" nickname="홍길동" age="25" interests={['여행']} />
 * <ProfileCard variant="compact" nickname="홍길동" job="개발자" region="서울" />
 * <ProfileCard variant="grid" id={1} name="홍길동" age={25} ... />
 */
const ProfileCard = memo(function ProfileCard(props: ProfileCardProps) {
  switch (props.variant) {
    case 'preview':
      return <PreviewCard {...props} />;
    case 'compact':
      return <CompactCard {...props} />;
    case 'grid':
      return <GridCard {...props} />;
  }
});

export default ProfileCard;

/* ────────────────────────────────────────────────────────
 * PreviewCard (기존 features/register/ui/ProfileCard)
 * ──────────────────────────────────────────────────────── */

function PreviewCard({
  profileImageUri,
  nickname,
  age,
  interests,
  badgeLevel = 'star',
  topRightSlot,
}: PreviewProps) {
  return (
    <View
      className="w-[284px] h-[392px] rounded-xl overflow-hidden"
      style={{
        backgroundColor: '#F5EDFF',
        borderWidth: 2,
        borderColor: '#EADCFF',
      }}
    >
      {/* 프로필 사진 */}
      {profileImageUri ? (
        <Image
          source={{ uri: profileImageUri }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <View className="absolute w-full h-full items-center justify-center">
          <Text className="text-6xl">👤</Text>
        </View>
      )}

      {/* 하단 그라디언트 오버레이 */}
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

      {/* 상단: 유형 배지 + 우측 슬롯 */}
      <View className="absolute top-5 left-5 right-5 flex-row items-center justify-between">
        <Badge level={badgeLevel} />
        {topRightSlot}
      </View>

      {/* 하단 정보 (이름 + 나이 + 관심사 태그) */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-5 gap-2">
        <View className="flex-row items-end gap-1">
          <Text
            className="text-xl font-bold text-white"
            style={{ lineHeight: 28 }}
          >
            {nickname || '이름'}
          </Text>
          {age ? (
            <Text
              className="text-xl font-bold text-white"
              style={{ lineHeight: 28 }}
            >
              {age}세
            </Text>
          ) : null}
        </View>

        {interests.length > 0 && (
          <View className="flex-row flex-wrap gap-1">
            {interests.map((label) => (
              <InterestTag key={label} label={label} variant="overlay" />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

/* ────────────────────────────────────────────────────────
 * CompactCard (기존 widgets/profile/ProfileCard)
 * ──────────────────────────────────────────────────────── */

function CompactCard({
  profileImageUri,
  nickname,
  job,
  region,
  isLoading,
}: CompactProps) {
  if (isLoading) {
    return (
      <View className="items-center justify-center p-6 bg-white rounded-2xl w-full h-40">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="items-center gap-4 p-6 bg-white rounded-2xl w-full">
      <View className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
        {profileImageUri ? (
          <Image
            source={{ uri: profileImageUri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-2xl text-gray-500">
            {nickname ?? ''}
          </Text>
        )}
      </View>
      <View className="items-center gap-1">
        <Text className="text-xl font-bold text-gray-900">
          {nickname ?? '-'}
        </Text>
        <Text className="text-sm text-gray-500">
          {job ?? '-'} · {region ?? '-'}
        </Text>
      </View>
    </View>
  );
}

/* ────────────────────────────────────────────────────────
 * GridCard (기존 widgets/storage/ui/ProfileCard)
 * ──────────────────────────────────────────────────────── */

function GridCard({
  id,
  name,
  age,
  location,
  job,
  cosmicTypeLabel,
  imageUri,
  isFavorited,
  onToggleFavorite,
  onPress,
  isEditMode = false,
  isSelected = false,
  onToggleSelect,
}: GridProps) {
  return (
    <Pressable
      className="flex-1 overflow-hidden rounded-xl pb-3"
      onPress={() => onPress?.(id)}
      disabled={isEditMode}
    >
      {/* 프로필 이미지 */}
      <View className="h-[184px] overflow-hidden rounded-lg">
        <Image
          source={{ uri: imageUri }}
          className="h-full w-full"
          resizeMode="cover"
        />
        {isEditMode && (
          <View className="absolute left-2 top-2">
            <Checkbox
              checked={isSelected}
              onValueChange={() => onToggleSelect?.(id)}
            />
          </View>
        )}
      </View>

      {/* 카드 정보 */}
      <View className="mt-3 gap-2">
        {/* 코스믹 유형 태그 + 하트 */}
        <View className="flex-row items-center justify-between">
          <Tag
            label={cosmicTypeLabel}
            variant="outline"
            styleClass={{ root: 'rounded px-2 py-1' }}
          />
          <Pressable hitSlop={8} onPress={() => onToggleFavorite(id)}>
            <HeartIcon filled={isFavorited} />
          </Pressable>
        </View>

        {/* 이름 + 나이 */}
        <View className="flex-row items-center gap-1">
          <Text className="text-base font-medium text-text-black">
            {name}
          </Text>
          <Text className="text-base font-medium text-text-black">
            {age}세
          </Text>
        </View>

        {/* 지역 + 직업 */}
        <View className="flex-row items-start gap-1">
          <Text className="text-sm font-medium text-text-gray3">
            {location}
          </Text>
          <Text className="text-sm font-medium text-text-gray3" numberOfLines={1}>
            {job}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
