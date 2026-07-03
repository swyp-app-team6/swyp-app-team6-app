import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCameraDevice } from 'react-native-vision-camera';
import QRScanView from './QRScanView';
import {
  ExchangeConfirmModal,
  ExchangePreviewModal,
  ExchangeLoadingModal,
  ExchangeResultModal,
  useExchangeFlowStore,
} from '@/features/exchange';
import { MOCK_HOME_PROFILE } from '@/widgets/home/model/mockData';
import type { NavigationPropType } from '@/shared/types';

/**
 * # QRScanWidget
 * ---
 * - 간단설명: QR 스캔 + 프로필 교환 플로우를 오케스트레이션하는 위젯
 * - 제약사항 및 특이사항:
 *   - QRScanView로 카메라 직접 렌더링 (탭 없음)
 *   - useExchangeFlowStore의 step에 따라 교환 모달 표시
 *   - 모달 표시 중 카메라 비활성화
 * ---
 * @example
 * <QRScanWidget />
 */
export default function QRScanWidget() {
  const navigation = useNavigation<NavigationPropType>();
  const device = useCameraDevice('back');

  const step = useExchangeFlowStore((s) => s.step);
  const scannedProfile = useExchangeFlowStore((s) => s.scannedProfile);
  const commonInterests = useExchangeFlowStore((s) => s.commonInterests);
  const onScanComplete = useExchangeFlowStore((s) => s.onScanComplete);
  const goToPreview = useExchangeFlowStore((s) => s.goToPreview);
  const startExchange = useExchangeFlowStore((s) => s.startExchange);
  const cancelExchange = useExchangeFlowStore((s) => s.cancelExchange);
  const reset = useExchangeFlowStore((s) => s.reset);

  /** 철회하기 → 홈으로 이동 */
  const handleCancel = useCallback(() => {
    cancelExchange();
    navigation.navigate('home');
  }, [cancelExchange, navigation]);

  /** 홈으로 버튼 */
  const handleGoHome = useCallback(() => {
    reset();
    navigation.navigate('home');
  }, [reset, navigation]);

  /** 교환한 프로필 보기 */
  const handleViewProfile = useCallback(() => {
    const profileId = scannedProfile?.id;
    reset();
    if (profileId) {
      navigation.navigate('exchangedProfileDetail', { profileId });
    }
  }, [reset, scannedProfile, navigation]);

  return (
    <View className="flex-1">
      {/* QR 스캔 카메라 */}
      {device ? (
        <QRScanView
          isActive={step === 'idle'}
          onScanned={(value) => {
            if (value) onScanComplete(value);
          }}
          onError={(error) => console.error('QR 스캔 오류:', error)}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          {/* 카메라 없음 — QRScanView 내부에서 권한 처리 */}
        </View>
      )}

      {/* 교환 확인 모달 */}
      <ExchangeConfirmModal
        visible={step === 'confirm'}
        onCancel={handleCancel}
        onPreview={goToPreview}
      />

      {/* 내 프로필 미리보기 모달 */}
      <ExchangePreviewModal
        visible={step === 'preview'}
        onExchange={startExchange}
      />

      {/* 로딩 모달 */}
      <ExchangeLoadingModal visible={step === 'loading'} />

      {/* 공통관심사 결과 모달 */}
      <ExchangeResultModal
        visible={step === 'result'}
        commonInterests={commonInterests}
        theirInterests={scannedProfile?.interests ?? []}
        theirName={scannedProfile?.name ?? ''}
        myName={MOCK_HOME_PROFILE.nickname}
        onGoHome={handleGoHome}
        onViewProfile={handleViewProfile}
      />
    </View>
  );
}
