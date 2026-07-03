import React from 'react'
import { Header, Layout } from '@/shared/ui'
import withLayout from '@/shared/hoc/withLayout'
import { QRScanWidget } from '@/widgets/qr'

/**
 * # QRPage
 * ---
 * - 간단설명: QR 코드 스캔 및 프로필 교환 기능을 제공하는 메인 화면
 * - 제약사항 및 특이사항:
 *   - withLayout 적용
 *   - 카메라로 QR 직접 스캔 → 교환 플로우 진행
 * ---
 * @example
 * <QRPage />
 */
function QRPage() {
  return (
    <>
      <Header title="QR 스캔" />
      <Layout.Body styleClass={{ root: 'flex-1' }}>
        <QRScanWidget />
      </Layout.Body>
    </>
  )
}

export default withLayout(QRPage);
