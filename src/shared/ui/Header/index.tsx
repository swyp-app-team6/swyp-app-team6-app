import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Layout from '@/shared/ui/Layout';
import { ArrowIcon } from '@/shared/ui/icons';

/**
 * 앱 공통 헤더 컴포넌트. iOS 노치(safe area)를 자동 처리합니다.
 * 좌·중앙·우 3개 슬롯을 자유롭게 커스텀할 수 있습니다.
 *
 * @example
 * ```tsx
 * // 문자열 제목
 * <Header title="홈" />
 *
 * // 뒤로가기 + 오른쪽 버튼
 * <Header title="설정" showBack right={<Button title="저장" variant="ghost" />} />
 *
 * // 완전 커스텀
 * <Header
 *   left={<Logo />}
 *   center={<SearchBar />}
 *   right={<NotificationIcon />}
 * />
 * ```
 */
interface Props {
  /** 왼쪽 슬롯. `showBack`이 true이면 무시됨 */
  left?: React.ReactNode;
  /** 중앙 슬롯. `title`보다 우선 적용 */
  center?: React.ReactNode;
  /** 오른쪽 슬롯 */
  right?: React.ReactNode;
  /** 중앙에 표시할 텍스트 제목. `center` prop이 없을 때 사용 */
  title?: string;
  /** true이면 왼쪽에 뒤로가기 버튼 자동 표시 */
  showBack?: boolean;
}

export default function Header({ left, center, right, title, showBack = false }: Props) {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  const leftContent = showBack ? (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <ArrowIcon size={24} color="black" direction="left" />
    </TouchableOpacity>
  ) : (
    left ?? null
  );

  const centerContent = center ?? (title ? <Text className="text-base font-bold">{title}</Text> : null);

  return (
    <Layout.Header
      styleClass={{ root: 'flex-row items-center px-4 bg-white' }}
      style={{ paddingTop: top, height: 56 + top }}
    >
      <Layout styleClass={{ root: 'flex-1 items-start' }}>
        {leftContent}
      </Layout>

      <Layout styleClass={{ root: 'items-center' }}>
        {centerContent}
      </Layout>

      <Layout styleClass={{ root: 'flex-1 items-end' }}>
        {right ?? null}
      </Layout>
    </Layout.Header>
  );
}
