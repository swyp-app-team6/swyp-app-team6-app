import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, View } from 'react-native';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useCameraDevice } from 'react-native-vision-camera';
import QRScanView from './QRScanView';
import {
  ExchangePreviewModal,
  ExchangeLoadingModal,
  ExchangeFlowStep,
  useExchangeFlowStore,
} from '@/features/exchange';
import { openDialog, closeDialog } from '@/shared/ui/Dialog';
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
  const isFocused = useIsFocused();

  /** 스캔 처리 중 중복 호출 방지 플래그 */
  const isScanned = useRef(false);

  /** 카메라 강제 리마운트를 위한 키 */
  const [cameraKey, setCameraKey] = useState(0);

  const step = useExchangeFlowStore((s) => s.step);
  const onScanComplete = useExchangeFlowStore((s) => s.onScanComplete);
  const goToPreview = useExchangeFlowStore((s) => s.goToPreview);
  const startExchange = useExchangeFlowStore((s) => s.startExchange);
  const cancelExchange = useExchangeFlowStore((s) => s.cancelExchange);

  /** 화면 포커스 진입/이탈 시 상태 초기화 */
  useFocusEffect(
    useCallback(() => {
      const currentStep = useExchangeFlowStore.getState().step;
      if (currentStep !== ExchangeFlowStep.IDLE) {
        useExchangeFlowStore.getState().reset();
      }
      isScanned.current = false;

      return () => {
        isScanned.current = false;
      };
    }, []),
  );

  /** 교환하기 → long-polling 후 결과 페이지로 이동 */
  const handleStartExchange = useCallback(() => {
    startExchange(() => {
      navigation.navigate('exchangeResult');
    });
  }, [startExchange, navigation]);

  /** 철회하기 → 교환 상태 초기화 후 QR 스캔 화면으로 복귀 */
  const handleCancel = useCallback(() => {
    cancelExchange();
    isScanned.current = false;
    setCameraKey((prev) => prev + 1);
  }, [cancelExchange]);

  /** 닫기 → 이전 화면으로 이동 */
  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  /**
   * # handleReload
   * ---
   * - 간단설명: 카메라 강제 재시작 — exchange 상태 리셋 + CodeScanner 리마운트
   * ---
   * @example
   * <QRScanView onReload={handleReload} />
   */
  const handleReload = useCallback(() => {
    useExchangeFlowStore.getState().reset();
    isScanned.current = false;
    setCameraKey((prev) => prev + 1);
  }, []);

  /** step이 CONFIRM으로 변경되면 공용 Dialog로 교환 확인 표시 */
  useEffect(() => {
    if (step === ExchangeFlowStep.CONFIRM) {
      openDialog({
        type: 'confirm',
        title: '상대의 프로필과 교환하시겠습니까?',
        message: '교환한 프로필은 보관함에서 삭제가 가능하며,\n프로필 카드는 재교환할 수 있습니다.',
        okLabel: '미리보기',
        cancelLabel: '철회하기',
        okFn: () => {
          closeDialog();
          goToPreview();
        },
        cancelFn: () => {
          closeDialog();
          handleCancel();
        },
        autoClose: false,
      });
    }
  }, [step, goToPreview, handleCancel]);

  /** 앱이 백그라운드에서 포그라운드로 돌아올 때 LOADING 상태면 교환 취소 */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        const currentStep = useExchangeFlowStore.getState().step;
        if (currentStep === ExchangeFlowStep.LOADING) {
          useExchangeFlowStore.getState().cancelExchange();
          isScanned.current = false;
          setCameraKey((prev) => prev + 1);
        }
      }
    });
    return () => subscription.remove();
  }, []);

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
          key={cameraKey}
          isActive={isFocused && step === ExchangeFlowStep.IDLE}
          onReload={handleReload}
          onClose={handleClose}
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

      {/* 내 프로필 미리보기 모달 */}
      <ExchangePreviewModal
        visible={step === ExchangeFlowStep.PREVIEW}
        onExchange={handleStartExchange}
        onCancel={handleCancel}
      />

      {/* 로딩 모달 */}
      <ExchangeLoadingModal visible={step === ExchangeFlowStep.LOADING} onCancel={handleCancel} />
    </View>
  );
}
