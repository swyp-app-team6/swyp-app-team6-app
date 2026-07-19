import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, Layout, SettingIcon } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import { HomeWidget } from '@/widgets/home';
import type { NavigationPropType } from '@/shared/types';

/**
 * # HomePage
 * ---
 * - 간단설명: 로그인 후 진입하는 홈 화면 — Orbits 로고, 환영 메시지, 프로필 카드 위젯 표시
 * - 제약사항 및 특이사항:
 *   - 프로필 카드 영역은 HomeWidget에 위임
 *   - 우측 상단: 알림 아이콘 + 마이페이지 아이콘
 *   - 하단 네비게이션은 withLayout HOC가 자동 제공
 * ---
 */
function HomePage() {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <>
      <Header
        left={
          <View className="flex-row items-center gap-2">
            <Image
              source={require('@/assets/characters/home-logo-icon.png')}
              className="h-[21px] w-[68px]"
              resizeMode="contain"
            />
          </View>
        }
        right={
          <View className="flex-row items-center gap-3">
            <Pressable hitSlop={8} onPress={() => navigation.navigate('mypage')} testID="mypage-button" accessibilityLabel="마이페이지">
              <SettingIcon size={24} color="#8C39FB" />
            </Pressable>
          </View>
        }
      />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-5 pt-2"
          showsVerticalScrollIndicator={false}
        >
          {/* 홈화면 타이틀 */}
          <Text className="text-[20px] font-semibold leading-[30px] tracking-tight text-text-black">
            {'오르비츠와 함께 새로운 만남을\n시작할 준비가 되셨나요?'}
          </Text>

          {/* 프로필 카드 섹션 */}
          <HomeWidget />
        </ScrollView>
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(HomePage));
