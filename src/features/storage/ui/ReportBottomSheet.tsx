import React, { forwardRef, useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef } from 'react';
import { BottomSheet, Button, Checkbox } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';

import type { ReportReasonCode } from '@/entities/storage';

/** 신고 유형 옵션 (API reason_codes 기준) */
const REPORT_TYPE_OPTIONS: { label: string; value: ReportReasonCode }[] = [
  { label: '부적절한 언행/욕설', value: 'INAPPROPRIATE_LANGUAGE' },
  { label: '사기/금전 요구', value: 'FRAUD_OR_MONEY_REQUEST' },
  { label: '허위 프로필(사진 도용, 사칭)', value: 'FAKE_PROFILE' },
  { label: '기타', value: 'ETC' },
];

interface Props {
  /** 신고 대상 닉네임 */
  nickname: string;
  /** 신고 제출 시 호출되는 콜백 */
  onSubmit: (reasonCodes: ReportReasonCode[], etcDetail?: string) => void;
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
  ({ nickname, onSubmit }, ref) => {
    const modalRef = useRef<BottomSheetHandle>(null);
    const [selectedTypes, setSelectedTypes] = useState<ReportReasonCode[]>([]);
    const [otherText, setOtherText] = useState('');

    useImperativeHandle(ref, () => ({
      open: () => {
        setSelectedTypes([]);
        setOtherText('');
        modalRef.current?.open();
      },
      close: () => modalRef.current?.close(),
    }));

    const toggleType = useCallback((value: ReportReasonCode) => {
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
        selectedTypes.includes('ETC') ? otherText : undefined,
      );
      modalRef.current?.close();
    }, [onSubmit, selectedTypes, otherText]);

    const hasOther = selectedTypes.includes('ETC');
    const isSubmitDisabled =
      selectedTypes.length === 0 ||
      (hasOther && otherText.trim().length === 0);

    return (
      <BottomSheet ref={modalRef} title={`${nickname} 님 신고하기`}>
        {/* 신고 유형 체크박스 목록 */}
        <View className="gap-2 mb-4">
          {REPORT_TYPE_OPTIONS.map((option) => {
            const isChecked = selectedTypes.includes(option.value);
            return (
              <Pressable
                key={option.value}
                className="flex-row items-center gap-1 h-[52px] px-4 rounded-xl"
                style={{ backgroundColor: '#F5F5F5' }}
                onPress={() => toggleType(option.value)}
              >
                <Checkbox
                  checked={isChecked}
                  onValueChange={() => toggleType(option.value)}
                />
                <Text
                  className="flex-1 text-sm font-medium"
                  style={{ color: '#888888' }}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* 기타 텍스트 입력 */}
        {hasOther && (
          <View className="mb-4">
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
        <Button
          title="신고제출"
          variant="primary"
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
        />
      </BottomSheet>
    );
  },
);

ReportBottomSheet.displayName = 'ReportBottomSheet';

export default ReportBottomSheet;
