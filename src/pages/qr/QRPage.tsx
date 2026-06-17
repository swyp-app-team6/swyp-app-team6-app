import React from 'react'
import { Header, Layout } from '@/shared/ui'
import withLayout from '@/shared/hoc/withLayout'
import { QRWidget } from '@/widgets/qr'

/**
 * # QRPage
 * ---
 * - 간단설명: QR 코드 생성 및 스캔 기능을 제공하는 메인 화면
 * - 제약사항 및 특이사항: withLayout 적용, 인증 불필요
 * ---
 * @example
 * <QRPage />
 */
function QRPage() {
  return (
    <>
      <Header title="QR 코드" />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
        <QRWidget />
      </Layout.Body>
    </>
  )
}

export default withLayout(QRPage);
