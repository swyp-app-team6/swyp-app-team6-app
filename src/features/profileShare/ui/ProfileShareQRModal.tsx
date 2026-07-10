import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, ProfileCard } from '@/shared/ui';
import QRCode from 'react-native-qrcode-svg';
import { useQuery } from '@tanstack/react-query';
import { ProfileAPI } from '@/entities/user';
import type { MyProfileResponse } from '@/entities/user';
import { ExchangeAPI } from '@/entities/exchange';
import { useExchangeFlowStore } from '@/features/exchange';
import { getInterestLabel } from '@/features/register';
import { getProfileImageUrl } from '@/shared/lib/getProfileImageUrl';
import { ExchangeFlowStep } from '@/shared/enums';
import type { NavigationPropType } from '@/shared/types';
import useCountdownTimer from '../lib/useCountdownTimer';

/** QR 유효 시간 (초) */
const QR_EXPIRY_SECONDS = 60;

/**
 * 대기자 모달 화면 단계
 * - QR = QR 코드 표시 + 카운트다운
 * - PREVIEW = 상대 프로필 미리보기 + 수락하기 CTA
 * - ACCEPTING = 수락 처리 중
 */
type ModalStep = 'QR' | 'PREVIEW' | 'ACCEPTING';

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 모달 닫기 콜백 */
  onClose: () => void;
}

/**
 * # ProfileShareQRModal
 * ---
 * - 간단설명: 내 프로필 카드 QR 코드 공유 + 교환 수락 모달
 * - 제약사항 및 특이사항:
 *   - QR 코드에 프로필 uuid를 인코딩
 *   - 60초 카운트다운 후 자동 닫힘
 *   - 모달 열릴 때 exchange/wait API 호출로 대기 상태 진입
 *   - wait 응답 수신 시 상대 프로필 미리보기 + 수락하기 CTA 표시
 *   - 수락 시 exchange/accept API 호출
 * ---
 * @param visible 모달 표시 여부
 * @param onClose 모달 닫기 콜백
 * ---
 * @example
 * <ProfileShareQRModal visible={showQR} onClose={() => setShowQR(false)} />
 */
export default function ProfileShareQRModal({ visible, onClose }: Props) {
  const navigation = useNavigation<NavigationPropType>();
  const { data: qrData, refetch: refetchQr } = useQuery({
    ...ProfileAPI.query.fetchUuid(),
    enabled: visible,
  });

  /** QR 만료 시 refetch 트리거용 카운터 */
  const [qrResetKey, setQrResetKey] = useState(0);

  /** 타이머 만료 시 QR 재발급 및 타이머 리셋 */
  const handleQrExpire = useCallback(() => {
    refetchQr();
    setQrResetKey((prev) => prev + 1);
  }, [refetchQr]);

  const remainSeconds = useCountdownTimer(QR_EXPIRY_SECONDS, visible, handleQrExpire, qrResetKey);
  const abortRef = useRef<AbortController | null>(null);

  const [modalStep, setModalStep] = useState<ModalStep>('QR');
  const [receivedProfile, setReceivedProfile] = useState<MyProfileResponse | null>(null);

  /** 모달 닫힐 때 상태 초기화 */
  const handleClose = useCallback(() => {
    setModalStep('QR');
    setReceivedProfile(null);
    onClose();
  }, [onClose]);

  /**
   * # handleDecline
   * ---
   * - 간단설명: 교환 거절 시 서버에 decline API 호출 후 모달 닫기
   * ---
   */
  const handleDecline = useCallback(async () => {
    if (receivedProfile?.id) {
      try {
        await ExchangeAPI.decline(receivedProfile.id);
      } catch (err) {
        console.error('[Exchange] decline 실패:', err);
      }
    }
    handleClose();
  }, [receivedProfile, handleClose]);

  /**
   * 모달 열릴 때 exchange/wait 호출, 닫힐 때 취소
   * TODO: 여기 추후 리팩토링
   */
  useEffect(() => {
    if (visible) {
      const controller = new AbortController();
      abortRef.current = controller;

      ExchangeAPI.wait(controller.signal)
        .then((res) => {
          if (controller.signal.aborted) return;
          console.log('[Exchange] wait 응답:', res.data);
          setReceivedProfile(res.data as MyProfileResponse);
          setModalStep('PREVIEW');
        })
        .catch((err) => {
          if (controller.signal.aborted) return;
          console.error('[Exchange] wait 실패:', err);
          Alert.alert('프로필 교환', '교환 대기 중 오류가 발생했습니다');
        });
    } else {
      abortRef.current?.abort();
      abortRef.current = null;
    }

    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, [visible]);

  /** 수락하기 버튼 핸들러 — accept 응답의 교환 결과를 store에 저장 후 결과 페이지로 이동 */
  const handleAccept = useCallback(async () => {
    if (!receivedProfile) return;
    setModalStep('ACCEPTING');

    try {
      const { data } = await ExchangeAPI.accept(receivedProfile.id);
      console.log('[Exchange] accept 응답:', data);

      if (data.status === 'ACCEPTED' && data.result) {
        useExchangeFlowStore.setState({
          scannedProfile: data.result.profile ?? useExchangeFlowStore.getState().scannedProfile,
          exchangeResult: data.result,
          step: ExchangeFlowStep.RESULT,
        });
        setModalStep('QR');
        setReceivedProfile(null);
        onClose();
        navigation.navigate('exchangeResult');
      } else {
        Alert.alert('프로필 교환', '교환이 완료되지 않았습니다');
        handleClose();
      }
    } catch (err) {
      console.error('[Exchange] accept 실패:', err);
      Alert.alert('프로필 교환', '교환 수락 중 오류가 발생했습니다');
      setModalStep('PREVIEW');
    }
  }, [receivedProfile, handleClose, onClose, navigation]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onPress={modalStep === 'QR' ? handleClose : undefined}
      >
        <Pressable
          className="w-[320px] rounded-xl bg-white px-5 py-7"
          onPress={(e) => e.stopPropagation()}
        >
          {modalStep === 'QR' && (
            <>
              {/* QR 화면 */}
              <Text className="text-center text-[16px] font-bold leading-[22px] text-text-black">
                내 프로필 카드 공유하기
              </Text>

              <View className="mt-4 items-center gap-7">
                <View className="items-center gap-2">
                  <View
                    className="items-center justify-center rounded-xl"
                    style={{
                      width: 120,
                      height: 120,
                      borderWidth: 2,
                      borderColor: '#F5F5F5',
                    }}
                  >
                    {qrData?.qr && <QRCode value={qrData.qr} size={100} />}
                  </View>

                  <View className="flex-row items-center gap-1">
                    <Text className="text-[12px] leading-[12px] text-[#E01619]">
                      {remainSeconds}초
                    </Text>
                    <Text className="text-[12px] leading-[12px] text-text-black">
                      전까지 유효해요.
                    </Text>
                  </View>
                </View>

                <View className="w-full">
                  <Button title="닫기" onPress={handleClose} />
                </View>
              </View>
            </>
          )}

          {(modalStep === 'PREVIEW' || modalStep === 'ACCEPTING') && receivedProfile && (
            <>
              {/* 상대 프로필 미리보기 */}
              <Text className="mb-5 text-center text-[16px] font-bold leading-[22px] text-text-black">
                상대방의 교환 요청
              </Text>

              <View className="items-center">
                <ProfileCard
                  variant="preview"
                  profileImageUri={getProfileImageUrl(receivedProfile.image_key)}
                  nickname={receivedProfile.nickname}
                  age={String(receivedProfile.age)}
                  interests={receivedProfile.interests.map((i) => getInterestLabel(i.type))}
                />
              </View>

              <View className="mt-5 flex-row gap-3">
                <View className="flex-1">
                  <Button title="거절하기" variant="secondary" onPress={handleDecline} />
                </View>
                <View className="flex-1">
                  {modalStep === 'ACCEPTING' ? (
                    <ActivityIndicator size="small" color="#8C39FB" />
                  ) : (
                    <Button title="수락하기" variant="primary" onPress={handleAccept} />
                  )}
                </View>
              </View>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
