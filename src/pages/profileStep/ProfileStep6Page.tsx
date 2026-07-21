import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { Header, Layout, ArrowIcon, ProgressBar, openErrorDialog } from '@/shared/ui';
import { useUpdateProfileMutation } from '@/entities/user';
import { useRegisterFormStore } from '@/features/register';
import useRegisterMutation from '@/features/register/api/useRegisterMutation';
import Step5PreviewView from '@/features/register/ui/Step5PreviewView';
import { buildRegisterRequest } from '@/features/register/lib/buildRegisterRequest';
import type { NavigatorType, NavigationPropType } from '@/shared/types';
import { logProfileCompleted } from '@/shared/lib/analytics';

/**
 * # ProfileStep6Page
 * ---
 * - 간단설명: 프로필 등록/수정 6단계 페이지 — 미리보기 + 등록/수정 완료
 * - 제약사항 및 특이사항:
 *   - 프로필 등록(POST) 또는 수정(PATCH) API 호출
 *   - 성공 시 profileComplete 페이지로 이동
 * ---
 * @example
 * navigation.navigate('profileStep6', { mode: 'register' })
 */
export default function ProfileStep6Page() {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute<RouteProp<NavigatorType, 'profileStep6'>>();
  const { mode } = route.params;
  const isEdit = mode === 'edit';

  const { mutateAsync: registerAsync, isPending: isRegistering } = useRegisterMutation();
  const { mutateAsync: updateAsync, isPending: isUpdating } = useUpdateProfileMutation();
  const isPending = isEdit ? isUpdating : isRegistering;

  /** 프로필 등록/수정 API 호출 */
  const handleSubmit = useCallback(async () => {
    const form = useRegisterFormStore.getState().form;
    const request = buildRegisterRequest(form);

    try {
      if (isEdit) {
        await updateAsync(request);
      } else {
        await registerAsync(request);
        logProfileCompleted();
      }
      navigation.navigate('profileComplete', { mode });
    } catch (e) {
      console.error(e);
      openErrorDialog({ message: '프로필 저장에 실패했습니다' });
    }
  }, [isEdit, registerAsync, updateAsync, navigation, mode]);

  return (
    <>
      <Header
        title={isEdit ? '프로필 수정' : '프로필 등록'}
        left={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowIcon direction="left" />
          </TouchableOpacity>
        }
      />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        <View className="px-5 pt-3 pb-2">
          <ProgressBar value={Math.round((6) * (100 / 6))} steps={6} />
        </View>
        <Step5PreviewView mode={mode} onSubmit={handleSubmit} loading={isPending} />
      </Layout.Body>
    </>
  );
}
