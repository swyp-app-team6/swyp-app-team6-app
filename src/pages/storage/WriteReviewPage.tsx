import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Header } from '@/shared/ui';
import { openDialog } from '@/shared/ui/Dialog';
import type { NavigatorType, NavigationPropType } from '@/shared/types';
import WriteReviewView from '@/features/storage/ui/WriteReviewView';

/**
 * # WriteReviewPage
 * ---
 * - 간단설명: 만남 후기 작성 페이지
 * - 제약사항 및 특이사항:
 *   - route params로 profileId 수신
 *   - 후기 등록 후 이전 화면으로 복귀
 *   - mock 처리 (API 미연동)
 * ---
 * @example
 * navigation.navigate('writeReview', { profileId: 1 })
 */
export default function WriteReviewPage() {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute<RouteProp<NavigatorType, 'writeReview'>>();
  const { profileId } = route.params;

  const handleSubmit = (_reviewText: string) => {
    // TODO: API 연동 시 실제 등록 처리
    openDialog({
      type: 'alert',
      title: '후기가 등록되었습니다',
      okFn: () => navigation.goBack(),
    });
  };

  return (
    <>
      <Header title="만남후기 작성" />
      <WriteReviewView profileId={profileId} onSubmit={handleSubmit} />
    </>
  );
}
