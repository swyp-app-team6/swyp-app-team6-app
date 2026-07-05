import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileCard from '@/features/register/ui/ProfileCard';
import { ProfileCreatePlusIcon, FlipIcon } from '@/shared/ui/icons';
import type { NavigationPropType } from '@/shared/types';
import HomeCardBack from './HomeCardBack';
import { HAS_PROFILE, MOCK_HOME_PROFILE } from '../model/mockData';

/**
 * # HomeWidget
 * ---
 * - 간단설명: 홈 화면 프로필 카드 섹션 위젯 — 프로필 유무/앞뒤면 분기 렌더링
 * - 제약사항 및 특이사항:
 *   - 프로필 미등록: 빈 카드 + 생성하기 유도만 표시
 *   - 프로필 등록: 앞면(ProfileCard) ↔ 뒷면(HomeCardBack) 전환 + QR공유 + 전체보기
 *   - 목 데이터 사용 (추후 API 연동 시 교체)
 * ---
 * @example
 * <HomeWidget />
 */
export default function HomeWidget() {
  const navigation = useNavigation<NavigationPropType>();
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <View className="mt-8 items-center">
      {/* 프로필 존재 시: 타이틀 */}
      {HAS_PROFILE && (
        <View className="w-full flex-row items-center justify-between mb-5">
          <View className="flex-row items-center gap-1">
            <Text className="text-[16px] font-semibold leading-[22px] tracking-tight text-primary">
              {MOCK_HOME_PROFILE.nickname}
            </Text>
            <Text className="text-[16px] font-medium leading-[22px] tracking-tight text-text-black">
              님의 프로필 카드
            </Text>
          </View>
        </View>
      )}

      {/* 카드 영역 */}
      {!HAS_PROFILE ? (
        /* 빈 프로필 카드 */
        <Pressable
          onPress={() => navigation.navigate('registerProfile')}
          className="h-[392px] w-[284px] items-center justify-center rounded-xl border-2 border-primary-light bg-primary-lightest"
        >
          <View className="items-center">
            <View className="mb-3">
              <ProfileCreatePlusIcon size={40} />
            </View>
            <Text className="text-center text-[14px] font-medium leading-[20px] tracking-tight text-primary">
              {'새로운 프로필 카드를\n추가하세요'}
            </Text>
          </View>
        </Pressable>
      ) : !isFlipped ? (
        /* 프로필 카드 앞면 */
        <ProfileCard
          profileImageUri={MOCK_HOME_PROFILE.profileImageUri}
          nickname={MOCK_HOME_PROFILE.nickname}
          age={MOCK_HOME_PROFILE.age}
          interests={MOCK_HOME_PROFILE.interests}
          showQR
        />
      ) : (
        /* 프로필 카드 뒷면 */
        <HomeCardBack cosmicType={MOCK_HOME_PROFILE.cosmicType} />
      )}

      {/* 프로필 존재 시: 뒷면 보기 + 전체보기 버튼 */}
      {HAS_PROFILE && (
        <>
          {/* 뒷면 보기 버튼 */}
          <Pressable
            onPress={() => setIsFlipped((prev) => !prev)}
            className="mt-4 flex-row items-center gap-1 rounded-[20px] px-3 py-2"
          >
            <FlipIcon size={20} color="#888888" />
            <Text className="text-[12px] tracking-tight text-text-gray4">
              뒷면 보기
            </Text>
          </Pressable>

          {/* 프로필 전체보기 버튼 */}
          <Pressable
            onPress={() => navigation.navigate('profileDetail')}
            className="mt-2 flex-row items-center gap-1 rounded-[20px] px-3 py-2"
          >
            <Text className="text-[12px] font-medium tracking-tight text-primary">
              프로필 전체보기
            </Text>
          </Pressable>
        </>
      )}

    </View>
  );
}
