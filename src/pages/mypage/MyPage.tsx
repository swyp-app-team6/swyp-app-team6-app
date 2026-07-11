import React from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, Layout, MenuList } from '@/shared/ui';
import ArrowIcon from '@/shared/ui/icons/ArrowIcon';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import useAuthStore from '@/entities/user/model/authStore';
import type { NavigationPropType } from '@/shared/types';
import { NOTICE_URL, PRIVACY_URL, SERVICE_URL } from '../../shared/constants';

/**
 * # MyPage
 * ---
 * - 간단설명: 메뉴 구성 및 계정 정보 수정 진입을 제공하는 마이페이지 메인 화면
 * - 제약사항 및 특이사항:
 *   - 설정 메뉴(앱 설정, 공지사항)
 *   - 약관 메뉴(이용 약관, 개인정보 처리방침)는 노션 링크로 이동
 *   - 계정 정보 수정 버튼 클릭 시 accountEdit 페이지로 이동
 * ---
 * @example
 * <MyPage />
 */

function MyPage() {
  const navigation = useNavigation<NavigationPropType>();
  const user = useAuthStore((state) => state.user);

  /** 메뉴 아이템 오른쪽 chevron */
  const chevronRight = <ArrowIcon direction="right" size={24} color="#8C39FB" />;

  return (
    <>
      <Header title="마이페이지" />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        {/* 사용자 정보 */}
        <View className="px-5 py-4 gap-3">
          <Text className="text-[16px] font-semibold text-[#1A1A1A] leading-[22.4px]">
            {user?.email?.split('@')[0] || '사용자'}
          </Text>
          <Text className="text-[14px] font-medium text-[#1A1A1A] leading-[19.6px]">
            오늘도 새로운 인연을 만나보세요!
          </Text>
        </View>

        {/* 계정 정보 수정 버튼 */}
        <View className="mx-5">
          <Pressable
            className="h-12 rounded-xl bg-[#F5F5F5] items-center justify-center active:opacity-80"
            onPress={() => navigation.navigate('accountEdit')}
          >
            <Text className="text-[14px] font-medium text-[#8C39FB] leading-[19.6px]">
              계정 정보 수정
            </Text>
          </Pressable>
        </View>

        {/* 설정 섹션 */}
        <View className="mt-4">
          <MenuList.Section
            title="설정"
            styleClass={{
              root: 'mb-0 border-t border-black/10',
              title: 'px-5 py-3 text-[14px] font-semibold text-[#888888]',
            }}
          >
            <MenuList.Item
              label="앱 설정"
              right={chevronRight}
              onPress={() => navigation.navigate('appSetting')}
              styleClass={{ root: 'px-5 h-14', label: 'text-[14px] font-medium text-[#1A1A1A]' }}
            />
            <MenuList.Item
              label="공지사항"
              right={chevronRight}
              showDivider={false}
              onPress={() => Linking.openURL(NOTICE_URL)}
              styleClass={{ root: 'px-5 h-14', label: 'text-[14px] font-medium text-[#1A1A1A]' }}
            />
          </MenuList.Section>

          {/* 약관 섹션 */}
          <MenuList.Section
            styleClass={{
              root: 'mb-0 border-t border-black/10',
            }}
          >
            <MenuList.Item
              label="이용 약관"
              right={chevronRight}
              onPress={() => Linking.openURL(SERVICE_URL)}
              styleClass={{ root: 'px-5 h-14', label: 'text-[14px] font-medium text-[#1A1A1A]' }}
            />
            <MenuList.Item
              label="개인정보 처리방침"
              right={chevronRight}
              showDivider={false}
              onPress={() => Linking.openURL(PRIVACY_URL)}
              styleClass={{ root: 'px-5 h-14', label: 'text-[14px] font-medium text-[#1A1A1A]' }}
            />
          </MenuList.Section>
        </View>

      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(MyPage));
