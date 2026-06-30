import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Badge } from '@/shared/ui';
import InterestTag from './InterestTag';

/**
 * # ProfileCard
 * ---
 * - 간단설명: 프로필 미리보기 상단 이미지 카드 (284x392)
 * - 제약사항 및 특이사항:
 *   - 프로필 이미지가 카드 전체를 채움
 *   - 하단에 LinearGradient 오버레이로 이름/나이/관심사 표시
 *   - 좌상단에 유형 배지 표시
 *   - 배경색: #F5EDFF, 테두리: #EADCFF
 * ---
 * @param profileImageUri 프로필 이미지 URI
 * @param nickname 닉네임
 * @param age 나이
 * @param interests 관심사 목록
 * ---
 * @example
 * <ProfileCard profileImageUri="..." nickname="홍길동" age={25} interests={['TRAVEL']} />
 */
const ProfileCard = memo(function ProfileCard({
  profileImageUri,
  nickname,
  age,
  interests,
}: {
  profileImageUri?: string | null;
  nickname?: string;
  age?: string;
  interests: string[];
}) {
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

      {/* 좌상단 유형 배지 */}
      <View className="absolute top-5 left-5">
        <Badge level="star" />
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
            {interests.map((interest) => (
              <InterestTag key={interest} value={interest} variant="overlay" />
            ))}
          </View>
        )}
      </View>
    </View>
  );
});

export default ProfileCard;
