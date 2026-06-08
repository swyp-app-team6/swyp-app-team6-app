import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import TodoInput from '@/widgets/todos/TodoInput'
import TodoList from '@/widgets/todos/TodoList'
import ErrorBoundary from '@/shared/ui/ErrorBoundary'
import LoadSuspense from '@/shared/ui/LoadSuspense'
import { GalleryIcon, Header, Layout, PlaygroundIcon, ProfileIcon, TodoIcon } from '@/shared/ui'
import { NAV_NAME } from '@/shared/enums'

const ACTIVE_COLOR = '#3b82f6';
const INACTIVE_COLOR = '#9ca3af';

const NAV_ITEMS = [
  { name: NAV_NAME.HOME, label: 'Todo', icon: (active: boolean) => <TodoIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: NAV_NAME.PROFILE, label: '프로필', icon: (active: boolean) => <ProfileIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: NAV_NAME.GALLERY, label: '갤러리', icon: (active: boolean) => <GalleryIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: NAV_NAME.PLAYGROUND, label: 'UI', icon: (active: boolean) => <PlaygroundIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
];

/**
 * 페이지 공통 레이아웃
 */
export default function AppLayout() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  return (
    <Layout>
      <Header title="Todo" />
      <Layout.Body>
        <TodoInput />
        <ErrorBoundary>
          <LoadSuspense>
            <TodoList />
          </LoadSuspense>
        </ErrorBoundary>
      </Layout.Body>
      <Layout.BottomNav
        items={NAV_ITEMS}
        activeRoute={route.name}
        onPress={(name) => navigation.navigate(name)}
      />
    </Layout>
  )
}
