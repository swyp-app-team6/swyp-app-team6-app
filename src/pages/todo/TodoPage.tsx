import React from 'react'
import TodoInput from '@/widgets/todos/TodoInput'
import TodoList from '@/widgets/todos/TodoList'
import ErrorBoundary from '@/shared/ui/ErrorBoundary'
import LoadSuspense from '@/shared/ui/LoadSuspense'
import { Header, Layout } from '@/shared/ui'
import withLayout from '@/shared/hoc/withLayout'

/**
 * # TodoPage
 * ---
 * - 간단설명: Todo 목록 조회·추가 메인 화면
 * ---
 * @example
 * <TodoPage />
 */
function TodoPage() {
  return (
    <>
      <Header title="Todo" />
      <Layout.Body>
        <TodoInput />
        <ErrorBoundary>
          <LoadSuspense>
            <TodoList />
          </LoadSuspense>
        </ErrorBoundary>
      </Layout.Body>
    </>
  )
}

export default withLayout(TodoPage);
