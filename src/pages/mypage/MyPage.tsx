import React from 'react';
import { Linking, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Header, Layout, MenuList, AppVersion } from '@/shared/ui';
import ArrowIcon from '@/shared/ui/icons/ArrowIcon';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import useAuthStore from '@/entities/user/model/authStore';
import type { NavigationPropType } from '@/shared/types';

/**
 * # MyPage
 * ---
 * - 간단설명: 메뉴 구성 및 계정 정보 수정 진입을 제공하는 마이페이지 메인 화면
 * - 제약사항 및 특이사항:
 *   - 설정 메뉴(신고하기, 공지사항)에서 공지사항은 노션 링크로 이동
 *   - 약관 메뉴(이용 약관, 개인정보 처리방침)는 노션 링크로 이동
 *   - 계정 정보 수정 버튼 클릭 시 accountEdit 페이지로 이동
 * ---
 * @example
 * <MyPage />
 */
/** 이용약관 노션 링크 */
const TERMS_URL = 'https://real-jellyfish-10c.notion.site/39144f56101180ab915eed4b439d5233?pvs=74';
/** 개인정보 처리방침 노션 링크 */
const PRIVACY_URL = 'https://real-jellyfish-10c.notion.site/39144f5610118006bc88d377d1b92aa3';

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
          <Button
            title="계정 정보 수정"
            variant="secondary"
            onPress={() => navigation.navigate('accountEdit')}
          />
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
              label="신고하기"
              right={chevronRight}
              styleClass={{ root: 'px-5 h-14', label: 'text-[14px] font-medium text-[#1A1A1A]' }}
            />
            <MenuList.Item
              label="공지사항"
              right={chevronRight}
              showDivider={false}
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
              onPress={() => Linking.openURL(TERMS_URL)}
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

        {/* 앱 버전 */}
        <View className="py-6">
          <AppVersion />
        </View>
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(MyPage));
