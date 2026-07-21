import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';
import { Button } from '@/shared/ui';
import UserProfileCard from '@/shared/ui/ProfileCard/UserProfileCard';
import QRCode from 'react-native-qrcode-svg';
import { useQuery } from '@tanstack/react-query';
import { ProfileAPI } from '@/entities/user';
import type { MyProfileResponse } from '@/entities/user';
import { apiValueToCosmicType } from '@/entities/storage';
import type { WaitModalStep } from '../lib/useExchangeWait';
import useCountdownTimer from '../lib/useCountdownTimer';

/** QR 유효 시간 (초) */
const QR_EXPIRY_SECONDS = 60;

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 모달 닫기 콜백 */
  onClose: () => void;
  /** 대기자 모달 단계 (부모에서 useExchangeWait으로 관리) */
  modalStep: WaitModalStep;
  /** 스캐너로부터 수신된 프로필 */
  receivedProfile: MyProfileResponse | null;
  /** 수락하기 버튼 핸들러 */
  onAccept: () => void;
  /** 거절하기 핸들러 */
  onDecline: () => void;
  /** QR 만료 시 콜백 (wait 재시작 트리거) */
  onQrExpire?: () => void;
}

/**
 * # ProfileShareQRModal
 * ---
 * - 간단설명: 내 프로필 카드 QR 코드 공유 + 교환 수락 모달
 * - 제약사항 및 특이사항:
 *   - QR 코드에 프로필 uuid를 인코딩
 *   - 60초 카운트다운 후 QR 재발급
 *   - wait 생명주기는 부모(HomeWidget)의 useExchangeWait에서 관리
 *   - 모달이 닫혀도 wait가 유지되어 교환 요청 수신 가능
 * ---
 * @param visible 모달 표시 여부
 * @param onClose 모달 닫기 콜백
 * @param modalStep 대기자 모달 단계
 * @param receivedProfile 스캐너로부터 수신된 프로필
 * @param onAccept 수락하기 버튼 핸들러
 * @param onDecline 거절하기 핸들러
 * @param onQrExpire QR 만료 시 콜백
 * ---
 * @example
 * <ProfileShareQRModal
 *   visible={qrVisible}
 *   onClose={handleCloseQR}
 *   modalStep={modalStep}
 *   receivedProfile={receivedProfile}
 *   onAccept={() => acceptExchange(navigation)}
 *   onDecline={() => declineExchange()}
 * />
 */
export default function ProfileShareQRModal({
  visible,
  onClose,
  modalStep,
  receivedProfile,
  onAccept,
  onDecline,
  onQrExpire,
}: Props) {
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
    onQrExpire?.();
  }, [refetchQr, onQrExpire]);

  const remainSeconds = useCountdownTimer(QR_EXPIRY_SECONDS, visible, handleQrExpire, qrResetKey);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onPress={modalStep === 'QR' ? onClose : undefined}
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
                  <Button title="닫기" onPress={onClose} />
                </View>
              </View>
            </>
          )}

          {(modalStep === 'PREVIEW' || modalStep === 'ACCEPTING') && receivedProfile && (
            <>
              {/* 상대 프로필 미리보기 */}
              <View className="mb-5 flex-row items-center justify-center">
                <Text className="text-center text-[16px] font-bold leading-[22px] text-text-black">
                  상대방의 교환 요청
                </Text>
                <Pressable
                  className="absolute right-0"
                  onPress={onDecline}
                  hitSlop={8}
                >
                  <Text className="text-[18px] text-[#999999]">✕</Text>
                </Pressable>
              </View>

              <View className="items-center">
                <UserProfileCard
                  profileImageUri={receivedProfile.image_key ?? undefined}
                  nickname={receivedProfile.nickname}
                  age={String(receivedProfile.age)}
                  interests={receivedProfile.interests.map((i) => i.label)}
                  badgeLevel={receivedProfile.cosmic_type ? apiValueToCosmicType(receivedProfile.cosmic_type) : undefined}
                />
              </View>

              <View className="mt-5">
                {modalStep === 'ACCEPTING' ? (
                  <ActivityIndicator size="small" color="#8C39FB" />
                ) : (
                  <Button title="수락하기" variant="primary" onPress={onAccept} />
                )}
              </View>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
