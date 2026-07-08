import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import Badge from '../Badge';
import InterestTag from '../InterestTag';
import type { BadgeLevel } from '../Badge';
import ProfileCardContainer from './ProfileCardContainer';

interface UserProfileCardProps {
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

/**
 * # UserProfileCard
 * ---
 * - 간단설명: 유저 사진+정보 프로필 카드 (284x392)
 * - 제약사항 및 특이사항:
 *   - 홈, 프로필 상세, 프로필 미리보기 등에서 사용
 *   - 프로필 사진이 카드 전체를 채움
 *   - 상단: 코스믹 유형 배지 + 우측 슬롯 (QR 버튼 등)
 *   - 하단: 닉네임 + 나이 + 관심사 태그 오버레이
 *   - 내부 API 호출 없음 — 모든 데이터를 props로 전달
 * ---
 * @param profileImageUri 프로필 이미지 URI
 * @param nickname 닉네임
 * @param age 나이 (문자열)
 * @param interests 관심사 라벨 목록
 * @param badgeLevel 배지 레벨 (기본값: 'star')
 * @param topRightSlot 우측 상단 슬롯 (QR 버튼 등)
 * ---
 * @example
 * <UserProfileCard
 *   profileImageUri="https://..."
 *   nickname="홍길동"
 *   age="25"
 *   interests={['여행', '음악']}
 *   badgeLevel="galaxy"
 *   topRightSlot={<QRButton />}
 * />
 */
function UserProfileCard({
  profileImageUri,
  nickname,
  age,
  interests,
  badgeLevel = 'star',
  topRightSlot,
}: UserProfileCardProps) {
  return (
    <ProfileCardContainer >
      {/* 프로필 사진 */}
      {profileImageUri ? (
        <Image
          source={{ uri: profileImageUri }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <View className="absolute w-full h-full items-center justify-center">
          사진이 없습니다
        </View>
      )}

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
    </ProfileCardContainer>
  );
}

export default memo(UserProfileCard);
