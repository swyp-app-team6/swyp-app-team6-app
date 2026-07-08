import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Header, Layout, MenuList, Textbox } from '@/shared/ui';
import ArrowIcon from '@/shared/ui/icons/ArrowIcon';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import { WITHDRAWAL_REASONS } from '@/features/withdrawal';
import type { NavigationPropType } from '@/shared/types';

/**
 * # WithdrawalReasonPage
 * ---
 * - 간단설명: 탈퇴 사유를 선택하는 화면
 * - 제약사항 및 특이사항:
 *   - 사유 1~4번 선택 시 바로 선택 상태 반영
 *   - '기타' 선택 시 텍스트 입력 영역 토글
 *   - 사유 선택 후 '다음' 버튼으로 withdrawalConfirm 페이지로 이동
 * ---
 * @example
 * <WithdrawalReasonPage />
 */
function WithdrawalReasonPage() {
  const navigation = useNavigation<NavigationPropType>();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState('');
  const [isOtherOpen, setIsOtherOpen] = useState(false);

  /** 사유 선택 핸들러 */
  const handleSelectReason = (reason: string) => {
    if (reason === '기타') {
      setIsOtherOpen((prev) => !prev);
      setSelectedReason('기타');
    } else {
      setSelectedReason(reason);
      setIsOtherOpen(false);
    }
  };

  /** 다음 버튼 활성화 여부 */
  const isNextEnabled =
    selectedReason !== null &&
    (selectedReason !== '기타' || customReason.trim().length > 0);

  /** 다음 페이지로 전달할 사유 */
  const finalReason =
    selectedReason === '기타' ? customReason.trim() : (selectedReason || '');

  /** 메뉴 아이템 오른쪽 chevron */
  const chevronRight = <ArrowIcon direction="right" size={24} color="#8C39FB" />;

  return (
    <>
      <Header title="탈퇴하기" showBack />
      <Layout.Body styleClass={{ root: '' }}>
        {/* 제목 */}
        <View className="px-5 py-4">
          <Text className="text-[16px] font-semibold text-[#1A1A1A] leading-[22.4px]">
            탈퇴 사유 선택
          </Text>
        </View>

        {/* 사유 목록 */}
        <MenuList.Section styleClass={{ root: 'mb-0' }}>
          {WITHDRAWAL_REASONS.map((reason) => (
            <MenuList.Item
              key={reason}
              label={reason}
              right={
                reason === '기타' ? (
                  <ArrowIcon
                    direction={isOtherOpen ? 'up' : 'down'}
                    size={24}
                    color="#8C39FB"
                  />
                ) : (
                  chevronRight
                )
              }
              onPress={() => handleSelectReason(reason)}
              showDivider={false}
              styleClass={{
                root: `px-5 h-14 ${selectedReason === reason ? 'bg-gray-50' : ''}`,
                label: 'text-[14px] font-medium text-[#1A1A1A]',
              }}
            />
          ))}
        </MenuList.Section>

        {/* 기타 사유 입력 */}
        {isOtherOpen && (
          <View className="px-5 mt-3 gap-3">
            <Textbox
              value={customReason}
              onChangeText={setCustomReason}
              placeholder="기타 사유를 입력해주세요."
              maxLength={300}
              minHeight={120}
              styleClass={{
                root: '',
                input: 'bg-[#F5F5F5] rounded-xl p-4',
              }}
            />
          </View>
        )}

        {/* 다음 버튼 */}
        <View className="px-5 mt-auto pb-6">
          <Button
            title="다음"
            variant="secondary"
            disabled={!isNextEnabled}
            onPress={() =>
              navigation.navigate('withdrawalConfirm', { reason: finalReason })
            }
          />
        </View>
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(WithdrawalReasonPage));
