import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomCTA, Button } from '@/shared/ui';
import type { NavigationPropType } from '@/shared/types';

interface Props {
  /** 폼 모드 (register: 등록 완료, edit: 수정 완료) */
  mode?: 'register' | 'edit';
}

/**
 * # RegisterCompleteView
 * ---
 * - 간단설명: 프로필 등록 완료 축하 화면 (Figma 디자인 시안 기반)
 * - 제약사항 및 특이사항:
 *   - 상단: 축하 일러스트 (플레이스홀더, 200x167)
 *   - 중앙: 축하 타이틀 + 서브 메시지
 *   - 하단 CTA: "프로필 보기"(secondary) + "홈으로"(primary) 가로 배치
 *   - 프로필 보기 → profileDetail 화면, 홈으로 → home 화면
 * ---
 * @example
 * <RegisterCompleteView />
 * <RegisterCompleteView mode="edit" />
 */
export default function RegisterCompleteView({ mode = 'register' }: Props) {
  const navigation = useNavigation<NavigationPropType>();
  const isEdit = mode === 'edit';

  /** 프로필 상세 화면으로 이동 (home을 스택에 포함하여 뒤로가기 지원) */
  const handleViewProfile = () => {
    navigation.reset({ index: 1, routes: [{ name: 'home' }, { name: 'profileDetail' }] });
  };

  /** 홈 화면으로 이동 */
  const handleGoHome = () => {
    navigation.reset({ index: 0, routes: [{ name: 'home' }] });
  };
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-5">
        {/* 축하 일러스트 플레이스홀더 */}
        <View className="w-[200px] h-[167px] items-center justify-center mb-10">
          <Image
            source={require('@/assets/characters/profile-created.png')}
            className="w-[200px] h-[167px]"
            resizeMode="contain"
          />
        </View>

        {/* 축하 메시지 */}
        <Text
          className="text-xl font-bold text-text-gray2 text-center mb-3"
          style={{ lineHeight: 28 }}
        >
          {isEdit
            ? '프로필 카드 수정이 완료되었습니다.'
            : '축하드립니다\n프로필 카드를 작성했어요!'}
        </Text>
        {
          !isEdit && (
            <Text
              className="text-base font-medium text-text-gray4 text-center"
              style={{ lineHeight: 22.4 }}
            >
              {'이제 새로운 만남을 시작할\n모든 준비가 끝났어요'}
            </Text>
          )
        }
      </View>

      {/* 하단 CTA: 프로필 보기(회색) + 홈으로(보라) */}
      <BottomCTA>
        <View className="flex-row gap-3">
          <View className="w-1/3">
            <Button title="프로필 보기" variant="secondary" onPress={handleViewProfile} />
          </View>
          <View className="w-2/3">
            <Button title="홈으로" onPress={handleGoHome} />
          </View>
        </View>
      </BottomCTA>
    </View>
  );
}
