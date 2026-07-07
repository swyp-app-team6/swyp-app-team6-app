import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Button } from '@/shared/ui';
import QRCode from 'react-native-qrcode-svg';
import { useQuery } from '@tanstack/react-query';
import { ProfileAPI } from '@/entities/user';
import useCountdownTimer from '../lib/useCountdownTimer';

/** QR 유효 시간 (초) */
const QR_EXPIRY_SECONDS = 60;

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 모달 닫기 콜백 */
  onClose: () => void;
}

/**
 * # ProfileShareQRModal
 * ---
 * - 간단설명: 내 프로필 카드 QR 코드 공유 모달
 * - 제약사항 및 특이사항:
 *   - QR 코드에 프로필 uuid를 인코딩
 *   - 60초 카운트다운 후 자동 닫힘
 *   - 모달 열릴 때 타이머 시작, 닫힐 때 초기화
 * ---
 * @param visible 모달 표시 여부
 * @param onClose 모달 닫기 콜백
 * ---
 * @example
 * <ProfileShareQRModal visible={showQR} onClose={() => setShowQR(false)} />
 */
export default function ProfileShareQRModal({ visible, onClose }: Props) {
  const { data: qrData } = useQuery(ProfileAPI.query.fetchUuid());
  const remainSeconds = useCountdownTimer(QR_EXPIRY_SECONDS, visible, onClose);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onPress={onClose}
      >
        <Pressable
          className="w-[300px] rounded-xl bg-white px-5 py-7"
          onPress={(e) => e.stopPropagation()}
        >
          {/* 타이틀 */}
          <Text className="text-center text-[16px] font-bold leading-[22px] text-text-black">
            내 프로필 카드 공유하기
          </Text>

          {/* QR 코드 영역 */}
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

              {/* 카운트다운 */}
              <View className="flex-row items-center gap-1">
                <Text className="text-[12px] leading-[12px] text-[#E01619]">
                  {remainSeconds}초
                </Text>
                <Text className="text-[12px] leading-[12px] text-text-black">
                  전까지 유효해요.
                </Text>
              </View>
            </View>

            {/* 닫기 버튼 */}
            <View className="w-full">
              <Button title="닫기" onPress={onClose} />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
