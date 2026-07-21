import React, { useCallback, useState } from 'react';
import { ActivityIndicator, BackHandler, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Header } from '@/shared/ui';
import { ArrowIcon } from '@/shared/ui/icons';
import { openDialog } from '@/shared/ui/Dialog';
import type { NavigatorType, NavigationPropType } from '@/shared/types';
import type { ReviewScore } from '@/entities/storage';
import { useExchangeArchiveDetailQuery } from '@/entities/storage';
import WriteReviewView from '@/features/storage/ui/WriteReviewView';
import useUpdateReviewMutation from '@/features/storage/api/useUpdateReviewMutation';
import { logReviewCompleted } from '@/shared/lib/analytics';
import { useAuthStore } from '@/entities/user';

/**
 * # WriteReviewPage
 * ---
 * - 간단설명: 만남 후기 작성/수정 페이지
 * - 제약사항 및 특이사항:
 *   - route params로 profileId(=exchangeId), mode('write'|'edit') 수신
 *   - PATCH /exchange/archive/{exchangeId}/review API 연동
 *   - 수정 모드: 기존 데이터 프리필, 뒤로가기/닫기 시 dirty 체크
 * ---
 * @example
 * navigation.navigate('writeReview', { profileId: 1 })
 * navigation.navigate('writeReview', { profileId: 1, mode: 'edit' })
 */
export default function WriteReviewPage() {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute<RouteProp<NavigatorType, 'writeReview'>>();
  const { profileId, mode = 'write' } = route.params;
  const isEdit = mode === 'edit';

  const { mutate: submitReview, isPending } = useUpdateReviewMutation();
  const { data: detail, isLoading: isDetailLoading } = useExchangeArchiveDetailQuery(profileId);

  const [isDirty, setIsDirty] = useState(false);

  const exitDialogTitle = isEdit ? '만남 후기 수정 중단' : '만남 후기 작성 중단';
  const exitDialogMessage = isEdit
    ? '이미 수정한 정보가 있어요\n만남 후기 수정을 그만두실건가요?'
    : '이미 입력한 정보가 있어요\n만남 후기 작성을 그만두실건가요?';

  /**
   * # showExitDialog
   * ---
   * - 간단설명: 작성/수정 중단 확인 팝업 표시
   * @param onExit 나가기 시 실행할 콜백
   */
  const showExitDialog = useCallback(
    (onExit: () => void) => {
      openDialog({
        type: 'confirm',
        title: exitDialogTitle,
        message: exitDialogMessage,
        cancelLabel: '계속 작성',
        okLabel: '나가기',
        okFn: onExit,
      });
    },
    [exitDialogTitle, exitDialogMessage],
  );

  /**
   * # handleBack
   * ---
   * - 간단설명: 뒤로가기 버튼 핸들러
   * - 변경사항 있으면 팝업, 없으면 교환 프로필 상세로 이동
   */
  const handleBack = useCallback(() => {
    if (isDirty) {
      showExitDialog(() => navigation.goBack());
    } else {
      navigation.goBack();
    }
  }, [isDirty, showExitDialog, navigation]);

  /**
   * # handleClose
   * ---
   * - 간단설명: 닫기(✕) 버튼 핸들러
   * - 변경사항 있으면 팝업, 없으면 교환함으로 이동
   */
  const handleClose = useCallback(() => {
    if (isDirty) {
      showExitDialog(() => navigation.navigate('storage'));
    } else {
      navigation.navigate('storage');
    }
  }, [isDirty, showExitDialog, navigation]);

  /** Android 하드웨어 백 버튼 처리 */
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        handleBack();
        return true;
      });
      return () => subscription.remove();
    }, [handleBack]),
  );

  const handleSubmit = (score: ReviewScore, review: string) => {
    submitReview(
      {
        exchangeId: profileId,
        score,
        review: review || undefined,
      },
      {
        onSuccess: () => {
          if (isEdit) {
            openDialog({
              type: 'confirm',
              message: '후기를 수정했습니다!',
              cancelLabel: '뒤로 가기',
              okLabel: '홈으로 가기',
              cancelFn: () => navigation.goBack(),
              okFn: () => navigation.navigate('home'),
              autoClose: false,
            });
          } else {
            logReviewCompleted();
            useAuthStore.getState().updateUser({ review_registered: true });
            openDialog({
              type: 'alert',
              message: '후기를 등록했습니다!',
              okFn: () => navigation.goBack(),
            });
          }
        },
        onError: () => {
          openDialog({
            type: 'alert',
            title: isEdit ? '후기 수정에 실패했습니다' : '후기 등록에 실패했습니다',
            message: '잠시 후 다시 시도해주세요.',
          });
        },
      },
    );
  };

  if (isEdit && isDetailLoading) {
    return (
      <>
        <Header title="만남 후기 수정하기" />
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  return (
    <>
      <Header
        left={
          <TouchableOpacity onPress={handleBack}>
            <ArrowIcon size={24} color="black" direction="left" />
          </TouchableOpacity>
        }
        title={isEdit ? '만남 후기 수정하기' : '만남 후기 작성하기'}
        right={
          <TouchableOpacity onPress={handleClose}>
            <Text className="text-2xl text-gray-400">✕</Text>
          </TouchableOpacity>
        }
      />
      <WriteReviewView
        profileId={profileId}
        onSubmit={handleSubmit}
        loading={isPending}
        initialScore={isEdit ? (detail?.score as ReviewScore) : undefined}
        initialMemo={isEdit ? detail?.memo : undefined}
        buttonTitle={isEdit ? '수정하기' : '등록하기'}
        onDirtyChange={setIsDirty}
      />
    </>
  );
}
