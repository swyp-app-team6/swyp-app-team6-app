import React, { forwardRef, useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef } from 'react';
import { Button, Checkbox, SafeBottomSheetModal } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';

/** 신고 유형 옵션 */
const REPORT_TYPE_OPTIONS = [
  { label: '부적절한 언행/욕설', value: 'offensive' },
  { label: '사기/금전 요구', value: 'scam' },
  { label: '허위 프로필(사진 도용, 사칭)', value: 'fake_profile' },
  { label: '기타', value: 'other' },
];

interface Props {
  /** 신고 제출 시 호출되는 콜백 */
  onSubmit: (reportTypes: string[], detail?: string) => void;
}

/**
 * # ReportBottomSheet
 * ---
 * - 간단설명: 신고 사유 선택 바텀시트 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 신고 유형 체크박스 복수 선택
 *   - "기타" 선택 시 텍스트 입력 영역 노출
 *   - ref를 통해 open/close 제어
 * ---
 * @param onSubmit 신고 제출 시 콜백 (신고유형 배열, 기타사유)
 * ---
 * @example
 * ```tsx
 * const ref = useRef<BottomSheetHandle>(null);
 * <ReportBottomSheet ref={ref} onSubmit={handleReport} />
 * ```
 */
const ReportBottomSheet = forwardRef<BottomSheetHandle, Props>(
  ({ onSubmit }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [otherText, setOtherText] = useState('');

    useImperativeHandle(ref, () => ({
      open: () => {
        setSelectedTypes([]);
        setOtherText('');
        modalRef.current?.present();
      },
      close: () => modalRef.current?.dismiss(),
    }));

    const toggleType = useCallback((value: string) => {
      setSelectedTypes((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value],
      );
    }, []);

    const handleSubmit = useCallback(() => {
      if (selectedTypes.length === 0) return;
      onSubmit(
        selectedTypes,
        selectedTypes.includes('other') ? otherText : undefined,
      );
      modalRef.current?.dismiss();
    }, [onSubmit, selectedTypes, otherText]);

    const hasOther = selectedTypes.includes('other');
    const isSubmitDisabled =
      selectedTypes.length === 0 ||
      (hasOther && otherText.trim().length === 0);

    return (
      <SafeBottomSheetModal ref={modalRef}>
        {/* 닫기 버튼 */}
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
        <View className="px-5 mb-4">
          <Text className="text-xl font-bold text-[#1A1A1A] leading-7">
            신고하기
          </Text>
          <Text className="text-sm text-[#888888] mt-1">
            신고 사유를 선택해주세요
          </Text>
        </View>

        {/* 신고 유형 체크박스 목록 */}
        <View className="px-5 gap-2 mb-4">
          {REPORT_TYPE_OPTIONS.map((option) => {
            const isChecked = selectedTypes.includes(option.value);
            return (
              <View
                key={option.value}
                className="flex-row items-center gap-3 py-3 px-4 rounded-xl"
                style={{
                  backgroundColor: isChecked ? '#F5EDFF' : '#F8F8F8',
                  borderWidth: 1,
                  borderColor: isChecked ? '#8C39FB' : '#E3E3E3',
                }}
              >
                <Checkbox
                  checked={isChecked}
                  onValueChange={() => toggleType(option.value)}
                />
                <Text
                  className="text-base"
                  style={{
                    color: isChecked ? '#8C39FB' : '#4E4E4E',
                    fontWeight: isChecked ? '600' : '400',
                  }}
                >
                  {option.label}
                </Text>
              </View>
            );
          })}
        </View>

        {/* 기타 텍스트 입력 */}
        {hasOther && (
          <View className="px-5 mb-4">
            <BottomSheetTextInput
              defaultValue={otherText}
              onChangeText={setOtherText}
              placeholder="신고 사유를 입력해주세요"
              placeholderTextColor="#AAAAAA"
              multiline
              maxLength={200}
              className="bg-[#F8F8F8] rounded-xl px-4 py-3 text-base text-[#1A1A1A] min-h-[100px]"
              style={{ textAlignVertical: 'top' }}
            />
            <Text className="text-xs text-[#AAAAAA] text-right mt-1">
              {otherText.length}/200
            </Text>
          </View>
        )}

        {/* 제출 버튼 */}
        <View className="px-5">
          <Button
            title="신고제출"
            variant="primary"
            onPress={handleSubmit}
            disabled={isSubmitDisabled}
          />
        </View>
      </SafeBottomSheetModal>
    );
  },
);

ReportBottomSheet.displayName = 'ReportBottomSheet';

export default ReportBottomSheet;
