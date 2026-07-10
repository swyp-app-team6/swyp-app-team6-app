import React from 'react';
import { Modal as RNModal, Pressable, Text, View } from 'react-native';
import { Button, InterestTag } from '@/shared/ui';
import { INTEREST_LABEL } from '@/features/register';

interface Props {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 공통 관심사 목록 */
  commonInterests: string[];
  /** 상대 관심사 목록 (공통 관심사 없을 때 표시) */
  theirInterests: string[];
  /** 상대 닉네임 */
  theirName: string;
  /** 내 닉네임 */
  myName: string;
  /** 홈으로 이동 콜백 */
  onGoHome: () => void;
  /** 교환한 프로필 보기 콜백 */
  onViewProfile: () => void;
}

/**
 * # ExchangeResultModal
 * ---
 * - 간단설명: 프로필 교환 완료 후 공통 관심사 결과를 표시하는 모달
 * - 제약사항 및 특이사항:
 *   - 공통 관심사 있을 때: 축하 메시지 + 공통 관심사 태그
 *   - 공통 관심사 없을 때: 위로 메시지 + 상대 관심사 표시
 *   - 하단: 홈으로 / 교환한 프로필 보기 CTA
 * ---
 * @param visible 모달 표시 여부
 * @param commonInterests 공통 관심사 목록
 * @param theirInterests 상대 관심사 목록
 * @param theirName 상대 닉네임
 * @param myName 내 닉네임
 * @param onGoHome 홈으로 이동 콜백
 * @param onViewProfile 교환한 프로필 보기 콜백
 * ---
 * @example
 * <ExchangeResultModal visible={true} commonInterests={['TRAVEL']} ... />
 */
export default function ExchangeResultModal({
  visible,
  commonInterests,
  theirInterests,
  theirName,
  myName,
  onGoHome,
  onViewProfile,
}: Props) {
  const hasCommon = commonInterests.length > 0;

  return (
    <RNModal visible={visible} transparent animationType="fade">
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <Pressable
          className="w-[320px] rounded-2xl bg-white px-5 py-7"
          onPress={(e) => e.stopPropagation()}
        >
          {hasCommon ? (
            <>
              {/* 공통 관심사 있을 때 */}
              <Text className="text-center text-[16px] font-bold leading-[22px] text-text-black">
                {`${myName}와 ${theirName}\n우리 서로 좋아하는 관심사가 있어요!`}
              </Text>
              <View className="mt-4 flex-row flex-wrap justify-center gap-2">
                {commonInterests.map((interest) => (
                  <InterestTag key={interest} label={INTEREST_LABEL[interest] ?? interest} variant="outlined" />
                ))}
              </View>
              <Text className="mt-4 text-center text-[13px] leading-[18px] text-text-gray4">
                교환된 프로필을 보러 갈까요?
              </Text>
            </>
          ) : (
            <>
              {/* 공통 관심사 없을 때 */}
              <Text className="text-center text-[16px] font-bold leading-[22px] text-text-black">
                아쉽지만 서로 같은 관심사가 아직 없어요!
              </Text>
              <Text className="mt-3 text-center text-[13px] leading-[18px] text-text-gray4">
                {`상대가 좋아하는 관심사는`}
              </Text>
              <View className="mt-2 flex-row flex-wrap justify-center gap-2">
                {theirInterests.map((interest) => (
                  <InterestTag key={interest} label={INTEREST_LABEL[interest] ?? interest} variant="outlined" />
                ))}
              </View>
              <Text className="mt-2 text-center text-[13px] leading-[18px] text-text-gray4">
                이에요
              </Text>
            </>
          )}

          {/* 하단 CTA 버튼 */}
          <View className="mt-6 flex-row gap-3">
            <View className="flex-1">
              <Button title="홈으로" variant="secondary" onPress={onGoHome} />
            </View>
            <View className="flex-1">
              <Button title="교환한 프로필 보기" variant="primary" onPress={onViewProfile} />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
