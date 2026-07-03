import React from 'react'
import { Layout } from '@/shared/ui'
import withLayout from '@/shared/hoc/withLayout'
import { QRScanWidget } from '@/widgets/qr'

/**
 * # QRPage
 * ---
 * - 간단설명: QR 코드 스캔 및 프로필 교환 기능을 제공하는 전체 화면 카메라 페이지
 * - 제약사항 및 특이사항:
 *   - Header 없음 — 카메라가 전체 화면을 채움
 *   - 안내 텍스트는 QRScanView 오버레이에 포함
 *   - withLayout 적용 (하단 탭 네비게이션)
 * ---
 * @example
 * <QRPage />
 */
function QRPage() {
  return (
    <Layout.Body styleClass={{ root: 'flex-1' }}>
      <QRScanWidget />
    </Layout.Body>
  );
}

export default withLayout(QRPage);
