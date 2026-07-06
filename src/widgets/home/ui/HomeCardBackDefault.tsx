import React, { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationPropType } from '@/shared/types';

/**
 * # HomeCardBackDefault
 * ---
 * - 간단설명: 홈 카드 뒷면 디폴트 뷰 — 유형테스트 미완료 시 안내 표시
 * - 제약사항 및 특이사항:
 *   - 284x392 크기, HomeCardBack과 동일한 보라색 배경/테두리
 *   - 누르면 독립 유형테스트 페이지(cosmicTest)로 이동
 * ---
 * @example
 * <HomeCardBackDefault />
 */
const HomeCardBackDefault = memo(function HomeCardBackDefault() {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <Pressable
      onPress={() => navigation.navigate('cosmicTest')}
    >
      <View
        className="w-[284px] h-[392px] rounded-xl overflow-hidden items-center justify-center px-5"
        style={{
          backgroundColor: 'rgba(124, 58, 237, 0.8)',
          borderWidth: 2,
          borderColor: '#E9D5FF',
        }}
      >
        <Text className="text-4xl mb-4">🔮</Text>
        <Text
          className="text-base font-semibold text-white text-center"
          style={{ lineHeight: 22 }}
        >
          {'유형 테스트를 통해\n나의 유형을 찾아보세요!'}
        </Text>
      </View>
    </Pressable>
  );
});

export default HomeCardBackDefault;
