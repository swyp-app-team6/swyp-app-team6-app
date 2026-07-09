import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { CodeScanner } from 'react-native-vision-camera-barcode-scanner';
import { usePermissionStore } from '../../permissions';
import CameraPermissionRequiredFallbackView from '../../permissions/ui/CameraPermissionRequiredFallbackView';

/** 스캔 영역 크기 (px) */
const SCAN_SIZE = 240;

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

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
  /** 카메라 재시작 콜백 */
  onReload?: () => void;
}

/**
 * # QRScanView
 * ---
 * - 간단설명: QR 코드 스캔 뷰 — 전체 화면 카메라 + 어두운 오버레이 + 스캔 영역 가이드
 * - 제약사항 및 특이사항:
 *   - 카메라가 전체 화면을 채우고, 60% 어두운 오버레이 위에 스캔 영역 표시
 *   - 스캔 영역: 240x240 흰색 반투명 배경, 보라색 테두리
 *   - 상단에 안내 텍스트 표시
 *   - denied/blocked: 권한 안내 fallback UI 표시
 * ---
 * @param isActive 카메라 활성화 여부
 * @param onScanned QR 코드 인식 완료 콜백
 * @param onError 스캔 오류 콜백
 * @param onReload 카메라 재시작 콜백
 * ---
 * @example
 * <QRScanView isActive={true} onScanned={(v) => console.log(v)} onError={console.error} />
 */
export default function QRScanView({ isActive, onScanned, onError, onReload }: QRScanViewProps) {
  const { cameraStatus } = usePermissionStore();

  if (cameraStatus === 'denied' || cameraStatus === 'blocked') {
    return <CameraPermissionRequiredFallbackView />;
  }

  return (
    <View className="flex-1">
      {/* 카메라 — 전체 화면 */}
      <CodeScanner
        style={StyleSheet.absoluteFill}
        isActive={isActive}
        barcodeFormats={['qr-code']}
        onBarcodeScanned={(barcodes) => {
          if (barcodes.length === 0) return;
          const lastBarcode = barcodes[barcodes.length - 1];
          if (lastBarcode) {
            onScanned(lastBarcode.rawValue);
          }
        }}
        onError={onError}
      />

      {/* 어두운 오버레이 + 스캔 가이드 */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* 상단 어두운 영역 */}
        <View style={styles.overlayTop} />

        {/* 중간 행: 좌측 어두운 | 스캔 영역 | 우측 어두운 */}
        <View style={styles.middleRow}>
          <View style={styles.overlaySide} />
          <View style={styles.scanArea} />
          <View style={styles.overlaySide} />
        </View>

        {/* 하단 어두운 영역 */}
        <View style={styles.overlayBottom} />

        {/* 안내 텍스트 — 스캔 영역 위에 배치 */}
        <View style={styles.guideTextContainer}>
          <Text style={styles.guideTitle}>프로필 카드 교환을 위한 QR 스캔</Text>
          <Text style={styles.guideSubtitle}>내 프로필 카드 우측 상단에 QR 코드가 있어요</Text>
        </View>

      </View>

      {/* 카메라 재시작 버튼 — 오버레이 밖에 배치하여 터치 가능 */}
      <View style={styles.reloadContainer} pointerEvents="box-none">
        <Pressable onPress={onReload} style={styles.reloadButton}>
          <Text style={styles.reloadText}>카메라 다시 시작</Text>
        </Pressable>
      </View>
    </View>
  );
}

/** 스캔 영역 상단 여백 비율 */
const SCAN_TOP = (SCREEN_H - SCAN_SIZE) / 2 - 80;

const styles = StyleSheet.create({
  overlayTop: {
    width: SCREEN_W,
    height: SCAN_TOP,
    backgroundColor: 'rgba(28,25,23,0.6)',
  },
  middleRow: {
    flexDirection: 'row',
    height: SCAN_SIZE,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(28,25,23,0.6)',
  },
  scanArea: {
    width: SCAN_SIZE,
    height: SCAN_SIZE,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#9333EA',
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: 'rgba(28,25,23,0.6)',
  },
  guideTextContainer: {
    position: 'absolute',
    top: SCAN_TOP - 64,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 4,
  },
  guideTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    textAlign: 'center',
  },
  guideSubtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    textAlign: 'center',
  },
  reloadContainer: {
    position: 'absolute',
    top: SCAN_TOP + SCAN_SIZE + 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  reloadButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  reloadText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
