import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Checkbox, Header, Layout, openErrorDialog } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import useAuthStore from '@/entities/user/model/authStore';
import { UserAPI } from '@/entities/user/api/userApi';
import type { NavigationPropType } from '@/shared/types';
import { useQueryClient } from '@tanstack/react-query';

/**
 * # WithdrawalConfirmPage
 * ---
 * - 간단설명: 탈퇴 전 안내 확인 및 최종 탈퇴 실행 화면
 * - 제약사항 및 특이사항:
 *   - 체크박스 체크 시에만 탈퇴하기 버튼 활성화
 *   - 탈퇴 성공 시 인증 초기화 후 홈 화면으로 이동
 *   - 탈퇴 실패 시 에러 다이얼로그 표시
 * ---
 * @example
 * <WithdrawalConfirmPage />
 */
function WithdrawalConfirmPage() {
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationPropType>();
  const clearAuth = useAuthStore((state) => state.clear);
  const [confirmed, setConfirmed] = useState(false);

  /**
   * # handleWithdraw
   * ---
   * - 간단설명: 회원 탈퇴 API 호출 후 인증 초기화 및 홈 화면 이동
   * ---
   */
  const handleWithdraw = async () => {
    try {
      await UserAPI.deleteUser();
      await clearAuth();
      queryClient.resetQueries();
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' }],
      });
    } catch (e) {
      console.error(e);
      openErrorDialog({ message: '회원탈퇴에 실패했습니다' });
    }
  };

  return (
    <>
      <Header title="탈퇴하기" showBack />
      <Layout.Body styleClass={{ root: 'px-5' }}>
        {/* 제목 */}
        <View className="pt-4 gap-5">
          <Text className="text-[16px] font-semibold text-[#1A1A1A] leading-[22.4px]">
            탈퇴 전, 하단 내용을 확인해주세요.
          </Text>
        </View>

        {/* 안내 내용 */}
        <View className="mt-3">
          {/* 소제목 */}
          <Text className="text-[16px] font-medium text-[#40403F] leading-[22.4px]">
            회원 정보 및 이용 기록 삭제 안내
          </Text>

          <View className="mt-2 gap-2">
            {/* 설명 */}
            <Text className="text-[14px] text-[#40403F] leading-[19.6px] text-justify">
              회원 탈퇴 시 계정 정보와 서비스 이용 기록이 삭제되며 복구할 수 없습니다.
            </Text>

            {/* 삭제되는 정보 */}
            <View className="gap-1">
              <Text className="text-[14px] font-medium text-[#E01619] leading-[16.8px]">
                삭제되는 정보
              </Text>
              <Text className="text-[14px] text-[#E01619] leading-[19.6px]">
                {'계정 정보 (닉네임, 프로필 이미지 등)\n생성한 프로필 카드\n프로필 카드 교환 내역\n관심 등록 내역\n문의 및 활동 기록'}
              </Text>
            </View>

            {/* 유의사항 */}
            <View className="gap-1">
              <Text className="text-[14px] font-medium text-[#40403F] leading-[16.8px]">
                유의사항
              </Text>
              <Text className="text-[14px] text-[#40403F] leading-[19.6px]">
                {'• 탈퇴 후 동일한 계정으로도 기존 정보를 복구할 수 없습니다.\n• 관련 법령에 따라 일부 정보는 일정 기간 보관될 수 있습니다.\n• 탈퇴를 진행하면 서비스 이용이 즉시 중단됩니다.'}
              </Text>
            </View>
          </View>
        </View>

        {/* 동의 체크박스 + 탈퇴 버튼 */}
        <View className="mt-auto pb-6 gap-3">
          <Checkbox
            checked={confirmed}
            onValueChange={setConfirmed}
            label="위 내용을 모두 확인하였으며, 회원 탈퇴에 동의합니다."
          />
          <Button
            title="탈퇴하기"
            variant="primary"
            disabled={!confirmed}
            onPress={handleWithdraw}
          />
        </View>
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(WithdrawalConfirmPage));
