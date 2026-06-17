import React from 'react';
import { View } from 'react-native';
import { CodeScanner } from 'react-native-vision-camera-barcode-scanner';
import { usePermissionStore } from '../../permissions';
import CameraPermissionRequiredFallbackView from '../../permissions/ui/CameraPermissionRequiredFallbackView';

/**
 * QRScanView props
 * - isActive: 카메라 활성화 여부
 * - onScanned: QR 코드 인식 완료 콜백
 * - onError: 스캔 오류 콜백
 */
interface QRScanViewProps {
  /** 카메라 활성화 여부 */
  isActive: boolean;
  /** QR 코드 인식 완료 콜백 */
  onScanned: (value: string | undefined) => void;
  /** 스캔 오류 콜백 */
  onError: (error: Error) => void;
}

/**
 * # QRScanView
 * ---
 * - 간단설명: QR 코드 스캔 뷰 - 권한 체크 및 카메라 렌더링 담당
 * - 제약사항 및 특이사항:
 *   - 진입 시 카메라 권한을 자동 요청
 *   - denied: OS 권한 팝업 재요청 버튼 표시
 *   - blocked: 설정 앱으로 이동 버튼 표시
 * ---
 * @example
 * <QRScanView isActive={true} onScanned={(v) => console.log(v)} onError={console.error} />
 */
export default function QRScanView({ isActive, onScanned, onError }: QRScanViewProps) {
  const { cameraStatus } = usePermissionStore();

  // 차단시 fallback ui 노출
  if (cameraStatus === 'denied' || cameraStatus === 'blocked') {
    return <CameraPermissionRequiredFallbackView />;
  }

  return (
    <View className='flex-1 justify-center items-center'>
      <CodeScanner
        style={{ width: '80%', height: '50%' }}
        isActive={isActive}
        barcodeFormats={['qr-code']}
        onBarcodeScanned={(barcodes) => {
          if (barcodes.length === 0) return;
          // 가장 마지막 스캔 데이터를 리턴 (문제발생시 조정)
          const lastBarcode = barcodes[barcodes.length - 1];
          if (lastBarcode) {
            onScanned(lastBarcode.rawValue);
          }
        }}
        onError={onError}
      />
    </View>
  );
}
