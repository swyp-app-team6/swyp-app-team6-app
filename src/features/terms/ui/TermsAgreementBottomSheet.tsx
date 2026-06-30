import React, { forwardRef, useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef } from 'react';
import { Button, Checkbox, SafeBottomSheetModal } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';

interface Props {
  /** 동의 완료 시 호출되는 콜백 */
  onAgree: () => void;
  /** 바텀시트 외부 탭 시 호출되는 콜백 */
  onDismiss?: () => void;
}

/**
 * # TermsAgreementBottomSheet
 * ---
 * - 간단설명: 서비스 이용약관 동의를 위한 바텀시트 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 필수 항목 3개 모두 체크 시 "동의 완료하기" 버튼 활성화
 *   - "이용약관에 모두 동의" 체크 시 전체 선택/해제
 *   - 바텀시트 외부 탭 시 onDismiss 콜백 호출
 *   - ref를 통해 open/close 제어
 * ---
 * @param onAgree 동의 완료 시 콜백
 * @param onDismiss 바텀시트 닫힘 시 콜백
 * ---
 * @example
 * const ref = useRef<BottomSheetHandle>(null);
 * <TermsAgreementBottomSheet ref={ref} onAgree={handleAgree} />
 */
const TermsAgreementBottomSheet = forwardRef<BottomSheetHandle, Props>(
  ({ onAgree, onDismiss }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);

    const [termsOfService, setTermsOfService] = useState(false);
    const [privacyPolicy, setPrivacyPolicy] = useState(false);
    const [ageConfirm, setAgeConfirm] = useState(false);

    const allChecked = termsOfService && privacyPolicy && ageConfirm;

    useImperativeHandle(ref, () => ({
      open: () => {
        setTermsOfService(false);
        setPrivacyPolicy(false);
        setAgeConfirm(false);
        modalRef.current?.present();
      },
      close: () => modalRef.current?.dismiss(),
    }));

    const handleToggleAll = useCallback(
      (value: boolean) => {
        setTermsOfService(value);
        setPrivacyPolicy(value);
        setAgeConfirm(value);
      },
      [],
    );

    const handleAgree = useCallback(() => {
      modalRef.current?.dismiss();
      onAgree();
    }, [onAgree]);

    return (
      <SafeBottomSheetModal
        ref={modalRef}
        onDismiss={onDismiss}
      >
        {/* 헤더: X 닫기 버튼 */}
        <View className="flex-row justify-end px-5 pt-1 pb-1">
          <Pressable
            onPress={() => modalRef.current?.dismiss()}
            hitSlop={8}
            accessibilityLabel="닫기"
          >
            <Text className="text-2xl text-gray-400">✕</Text>
          </Pressable>
        </View>

        {/* 타이틀 */}
        <View className="px-5 pb-4">
          <Text className="text-xl font-bold text-gray-900 leading-7">
            {'서비스 이용을 위해\n이용약관 동의가 필요해요'}
          </Text>
        </View>

        {/* 약관 항목 목록 */}
        <View className="px-5 gap-2">
          {/* [필수] 서비스 이용약관 동의 */}
          <View className="flex-row items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5">
            <Checkbox
              checked={termsOfService}
              onValueChange={setTermsOfService}
              label="[필수] 서비스 이용약관 동의"
            />
            <Pressable hitSlop={8}>
              <Text className="text-sm text-gray-400 underline">보기</Text>
            </Pressable>
          </View>

          {/* [필수] 개인정보 처리방침 동의 */}
          <View className="flex-row items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5">
            <Checkbox
              checked={privacyPolicy}
              onValueChange={setPrivacyPolicy}
              label="[필수] 개인정보 처리방침 동의"
            />
            <Pressable hitSlop={8}>
              <Text className="text-sm text-gray-400 underline">보기</Text>
            </Pressable>
          </View>

          {/* [필수] 만 14세 이상입니다 */}
          <View className="flex-row items-center rounded-xl border border-gray-200 px-4 py-3.5">
            <Checkbox
              checked={ageConfirm}
              onValueChange={setAgeConfirm}
              label="[필수] 만 14세 이상입니다"
            />
          </View>
        </View>

        {/* 이용약관에 모두 동의 */}
        <View className="px-5 pt-4 pb-2">
          <Checkbox
            checked={allChecked}
            onValueChange={handleToggleAll}
            label="이용약관에 모두 동의"
            className="py-1"
          />
        </View>

        {/* 동의 완료하기 CTA */}
        <View className="px-5 pt-3">
          <Button
            title="동의 완료하기"
            disabled={!allChecked}
            onPress={handleAgree}
          />
        </View>
      </SafeBottomSheetModal>
    );
  },
);

TermsAgreementBottomSheet.displayName = 'TermsAgreementBottomSheet';

export default TermsAgreementBottomSheet;
