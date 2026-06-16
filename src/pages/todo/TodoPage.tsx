import React from 'react'
import TodoInput from '@/widgets/todos/TodoInput'
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
      </Layout.Body>
    </>
  )
}

export default withLayout(TodoPage);
