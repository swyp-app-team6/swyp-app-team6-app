import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCameraDevice } from 'react-native-vision-camera';
import QRScanView from './QRScanView';
import {
  ExchangeConfirmModal,
  ExchangePreviewModal,
  ExchangeLoadingModal,
  ExchangeFlowStep,
  useExchangeFlowStore,
} from '@/features/exchange';
import type { NavigationPropType } from '@/shared/types';

/**
 * # QRScanWidget
 * ---
 * - 간단설명: QR 스캔 + 프로필 교환 플로우를 오케스트레이션하는 위젯
 * - 제약사항 및 특이사항:
 *   - QRScanView로 카메라 직접 렌더링 (탭 없음)
 *   - useExchangeFlowStore의 step에 따라 교환 모달 표시
 *   - result 단계에서는 ExchangeResultPage로 네비게이션
 *   - 모달 표시 중 카메라 비활성화
 * ---
 * @example
 * <QRScanWidget />
 */
export default function QRScanWidget() {
  const navigation = useNavigation<NavigationPropType>();
  const device = useCameraDevice('back');

  /** 스캔 처리 중 중복 호출 방지 플래그 */
  const isScanned = useRef(false);

  const step = useExchangeFlowStore((s) => s.step);
  const onScanComplete = useExchangeFlowStore((s) => s.onScanComplete);
  const goToPreview = useExchangeFlowStore((s) => s.goToPreview);
  const startExchange = useExchangeFlowStore((s) => s.startExchange);
  const cancelExchange = useExchangeFlowStore((s) => s.cancelExchange);

  /** 교환하기 → long-polling 후 결과 페이지로 이동 */
  const handleStartExchange = useCallback(() => {
    startExchange(() => {
      navigation.navigate('exchangeResult');
    });
  }, [startExchange, navigation]);

  /** 철회하기 → 홈으로 이동 */
  const handleCancel = useCallback(() => {
    cancelExchange();
    navigation.navigate('home');
  }, [cancelExchange, navigation]);

  useEffect(() => {
    return () => {
      isScanned.current = false;
    }
  }, [])

  return (
    <View className="flex-1">
      {/* QR 스캔 카메라 */}
      {device ? (
        <QRScanView
          isActive={step === ExchangeFlowStep.IDLE}
          onScanned={(value) => {
            if (!isScanned.current && value) {
              console.log(value);
              onScanComplete(value);
              isScanned.current = true;
            }
          }}
          onError={(error) => console.error('QR 스캔 오류:', error)}
        />
      ) : (
        <View className="flex-1 items-center justify-center" />
      )}

      {/* 교환 확인 모달 */}
      <ExchangeConfirmModal
        visible={step === ExchangeFlowStep.CONFIRM}
        onCancel={handleCancel}
        onPreview={goToPreview}
      />

      {/* 내 프로필 미리보기 모달 */}
      <ExchangePreviewModal
        visible={step === ExchangeFlowStep.PREVIEW}
        onExchange={handleStartExchange}
      />

      {/* 로딩 모달 */}
      <ExchangeLoadingModal visible={step === ExchangeFlowStep.LOADING} />
    </View>
  );
}
