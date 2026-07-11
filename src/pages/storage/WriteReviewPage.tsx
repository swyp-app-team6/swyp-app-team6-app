import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Header } from '@/shared/ui';
import { openDialog } from '@/shared/ui/Dialog';
import type { NavigatorType, NavigationPropType } from '@/shared/types';
import type { ReviewScore } from '@/entities/storage';
import WriteReviewView from '@/features/storage/ui/WriteReviewView';
import useUpdateReviewMutation from '@/features/storage/api/useUpdateReviewMutation';

/**
 * # WriteReviewPage
 * ---
 * - 간단설명: 만남 후기 작성 페이지
 * - 제약사항 및 특이사항:
 *   - route params로 profileId(=exchangeId) 수신
 *   - PATCH /exchange/archive/{exchangeId}/review API 연동
 *   - 후기 등록 후 이전 화면으로 복귀
 * ---
 * @example
 * navigation.navigate('writeReview', { profileId: 1 })
 */
export default function WriteReviewPage() {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute<RouteProp<NavigatorType, 'writeReview'>>();
  const { profileId } = route.params;

  const { mutate: submitReview, isPending } = useUpdateReviewMutation();

  const handleSubmit = (score: ReviewScore, review: string) => {
    submitReview(
      {
        exchangeId: profileId,
        score,
        review: review || undefined,
      },
      {
        onSuccess: () => {
          openDialog({
            type: 'alert',
            message: '후기를 등록했습니다!',
            okFn: () => navigation.goBack(),
          });
        },
        onError: () => {
          openDialog({
            type: 'alert',
            title: '후기 등록에 실패했습니다',
            message: '잠시 후 다시 시도해주세요.',
          });
        },
      },
    );
  };

  return (
    <>
      <Header title="교환한 프로필 보기" />
      <WriteReviewView
        profileId={profileId}
        onSubmit={handleSubmit}
        loading={isPending}
      />
    </>
  );
}
