import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import type { NavigationPropType } from '@/shared/types';

/**
 * # HomePage
 * ---
 * - 간단설명: 로그인 후 진입하는 홈 화면 — Orbits 로고, 환영 메시지, 프로필 카드 영역 표시
 * - 제약사항 및 특이사항:
 *   - 프로필 카드가 없는 경우 빈 카드(추가 유도) UI 표시
 *   - 하단 네비게이션은 withLayout HOC가 자동 제공
 * ---
 */
function HomePage() {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <>
      <Header
        left={
          <Image
            source={require('@/assets/orbits-name-icon.png')}
            className="h-[21px] w-[68px]"
            resizeMode="contain"
          />
        }
        right={
          <Pressable hitSlop={8}>
            <Text className="text-2xl text-text-gray4">⚙</Text>
          </Pressable>
        }
      />
      <Layout.Body styleClass={{ root: 'px-5 pt-6' }}>
        {/* 환영 메시지 */}
        <Text className="text-[20px] font-semibold leading-[30px] tracking-tight text-text-black">
          {'오르비츠와 함께 새로운 만남을\n시작할 준비가 되셨나요?'}
        </Text>

        {/* 프로필 카드 섹션 */}
        <View className="mt-8 items-center">
          {/* 레이블 */}
          <View className="w-full flex-row items-center gap-1">
            <Text className="text-[16px] font-semibold leading-[22px] tracking-tight text-primary">
              사용자
            </Text>
            <Text className="text-[16px] font-medium leading-[22px] tracking-tight text-text-black">
              님의 프로필 카드
            </Text>
          </View>

          {/* 빈 프로필 카드 */}
          <Pressable
            onPress={() => navigation.navigate('registerProfile')}
            className="mt-5 h-[392px] w-[284px] items-center justify-center rounded-xl border-2 border-primary-light bg-primary-lightest">
            <View className="items-center">
              <View className="mb-3 h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary-lightest">
                <Text className="text-[16px] font-bold text-primary">+</Text>
              </View>
              <Text className="text-center text-[14px] font-medium leading-[20px] tracking-tight text-primary">
                {'새로운 프로필 카드를\n추가하세요'}
              </Text>
            </View>
          </Pressable>

          {/* 뒷면보기 버튼 */}
          <Pressable className="mt-4 flex-row items-center gap-1 rounded-[20px] px-3 py-2">
            <Text className="text-[16px] text-text-gray4">↻</Text>
            <Text className="text-[12px] tracking-tight text-text-gray4">
              뒷면보기
            </Text>
          </Pressable>
        </View>
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(HomePage));
