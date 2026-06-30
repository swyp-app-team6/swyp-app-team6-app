import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@/shared/ui';
import { MyProfileView } from '@/features/register';
import type { NavigationPropType } from '@/shared/types';

/**
 * # ProfileDetailPage
 * ---
 * - 간단설명: 내 프로필 카드 상세보기 페이지
 * - 제약사항 및 특이사항:
 *   - MyProfileView를 읽기 전용으로 표시
 *   - 뒤로가기 버튼으로 이전 화면 복귀
 *   - withLayout 미적용 (독립 스택 화면)
 * ---
 */
export default function ProfileDetailPage() {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <>
      <Header title="내 프로필 카드" showBack />
      <MyProfileView
        onSubmit={() => navigation.goBack()}
        loading={false}
      />
    </>
  );
}
