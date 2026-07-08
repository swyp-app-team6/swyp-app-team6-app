import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, Layout, MenuList, openErrorDialog } from '@/shared/ui';
import ArrowIcon from '@/shared/ui/icons/ArrowIcon';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import useAuthStore from '@/entities/user/model/authStore';
import { UserAPI } from '@/entities/user/api/userApi';
import type { NavigationPropType } from '@/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

/**
 * # 프로바이더 → 표시 텍스트 매핑
 * ---
 * - 간단설명: OAuth 프로바이더명을 한글 가입 방식으로 변환
 * ---
 */
const PROVIDER_LABEL: Record<string, string> = {
  google: '구글 간편 가입',
  kakao: '카카오 간편 가입',
  apple: '애플 간편 가입',
};

/**
 * # AccountEditPage
 * ---
 * - 간단설명: 계정 정보 확인, 로그아웃 및 탈퇴 진입을 제공하는 계정 정보 수정 화면
 * - 제약사항 및 특이사항:
 *   - 휴대폰 번호는 UI만 구성 (User 타입에 phone 없음, 데이터 연동 미구현)
 *   - 로그아웃 시 토큰 및 조건 플래그 초기화 후 홈 화면 이동
 *   - 탈퇴하기 클릭 시 withdrawalReason 페이지로 이동
 * ---
 * @example
 * <AccountEditPage />
 */
function AccountEditPage() {
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationPropType>();
  const user = useAuthStore((state) => state.user);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const clearAuth = useAuthStore((state) => state.clear);

  /** 메뉴 아이템 오른쪽 chevron */
  const chevronRight = <ArrowIcon direction="right" size={24} color="#8C39FB" />;

  /**
   * # handleLogout
   * ---
   * - 간단설명: 서버 로그아웃 API 호출 후 로컬 인증 초기화 및 홈 화면 이동
   * ---
   */
  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await UserAPI.logout(refreshToken);
      }
      try {
        await GoogleSignin.signOut();
      } catch {
        // Google 로그인이 아닌 경우 signOut 실패 무시
      }
      await clearAuth();
      queryClient.resetQueries();
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' }],
      });
    } catch (e) {
      console.error(e);
      openErrorDialog({ message: '로그아웃에 실패했습니다' });
    }
  };

  return (
    <>
      <Header title="계정 정보 수정" showBack />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        {/* 가입 정보 */}
        <View className="px-5 py-4 gap-3">
          <Text className="text-[16px] font-semibold text-[#1A1A1A] leading-[22.4px]">
            {PROVIDER_LABEL[user?.provider || ''] || user?.provider || '-'}
          </Text>
          <Text className="text-[14px] font-medium text-[#888888] leading-[19.6px]">
            {user?.email || '-'}
          </Text>
        </View>

        {/* 휴대폰 번호 (UI만 구성) */}
        {/* <View className="px-5 gap-1">
          <View className="h-[30px] justify-center">
            <Text className="text-[16px] font-medium text-[#1A1A1A] leading-[22.4px]">
              휴대폰 번호
            </Text>
          </View>
          <View className="h-12 flex-row items-center px-4 pr-3 rounded-lg border border-black/10">
            <Text className="flex-1 text-[14px] text-black leading-[19.6px]">
              -
            </Text>
            <Pressable className="h-8 px-[10px] bg-[#F5F5F5] rounded-lg items-center justify-center active:opacity-80">
              <Text className="text-[12px] font-medium text-[#8C39FB] leading-[12px]">
                수정
              </Text>
            </Pressable>
          </View>
        </View> */}

        {/* 계정 관리 섹션 */}
        <View className="mt-6">
          <MenuList.Section
            title="계정 관리"
            styleClass={{
              root: 'mb-0 border-t border-black/10',
              title: 'px-5 py-3 text-[14px] font-semibold text-[#888888]',
            }}
          >
            <MenuList.Item
              label="로그아웃"
              right={chevronRight}
              onPress={handleLogout}
              styleClass={{ root: 'px-5 h-14', label: 'text-[14px] font-medium text-[#1A1A1A]' }}
            />
            <MenuList.Item
              label="탈퇴하기"
              right={chevronRight}
              onPress={() => navigation.navigate('withdrawalReason')}
              showDivider={false}
              styleClass={{ root: 'px-5 h-14', label: 'text-[14px] font-medium text-[#1A1A1A]' }}
            />
          </MenuList.Section>
        </View>
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(AccountEditPage));
