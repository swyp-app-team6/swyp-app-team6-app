import React, { forwardRef, useCallback, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef } from 'react';
import { Button, SafeBottomSheetModal } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';

/** 신고 유형 옵션 */
const REPORT_TYPE_OPTIONS = [
  { label: '불쾌한 언행', value: 'offensive' },
  { label: '허위 프로필', value: 'fake_profile' },
  { label: '스팸/광고', value: 'spam' },
  { label: '기타', value: 'other' },
];

interface Props {
  /** 신고 제출 시 호출되는 콜백 */
  onSubmit: (reportType: string, detail?: string) => void;
}

/**
 * # ReportBottomSheet
 * ---
 * - 간단설명: 신고 사유 선택 바텀시트 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 신고 유형 라디오 선택 (단일 선택)
 *   - "기타" 선택 시 텍스트 입력 영역 노출
 *   - ref를 통해 open/close 제어
 * ---
 * @param onSubmit 신고 제출 시 콜백 (신고유형, 기타사유)
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
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [otherText, setOtherText] = useState('');

    useImperativeHandle(ref, () => ({
      open: () => {
        setSelectedType(null);
        setOtherText('');
        modalRef.current?.present();
      },
      close: () => modalRef.current?.dismiss(),
    }));

    const handleSubmit = useCallback(() => {
      if (!selectedType) return;
      onSubmit(selectedType, selectedType === 'other' ? otherText : undefined);
      modalRef.current?.dismiss();
    }, [onSubmit, selectedType, otherText]);

    const isSubmitDisabled =
      !selectedType || (selectedType === 'other' && otherText.trim().length === 0);

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

        {/* 신고 유형 라디오 목록 */}
        <View className="px-5 gap-2 mb-4">
          {REPORT_TYPE_OPTIONS.map((option) => {
            const isSelected = selectedType === option.value;
            return (
              <Pressable
                key={option.value}
                onPress={() => setSelectedType(option.value)}
                className="flex-row items-center gap-3 py-3 px-4 rounded-xl"
                style={{
                  backgroundColor: isSelected ? '#F5EDFF' : '#F8F8F8',
                  borderWidth: 1,
                  borderColor: isSelected ? '#8C39FB' : '#E3E3E3',
                }}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <View
                  className="w-5 h-5 rounded-full items-center justify-center"
                  style={{
                    borderWidth: 2,
                    borderColor: isSelected ? '#8C39FB' : '#CCCCCC',
                  }}
                >
                  {isSelected && (
                    <View
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: '#8C39FB' }}
                    />
                  )}
                </View>
                <Text
                  className="text-base"
                  style={{
                    color: isSelected ? '#8C39FB' : '#4E4E4E',
                    fontWeight: isSelected ? '600' : '400',
                  }}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* 기타 텍스트 입력 */}
        {selectedType === 'other' && (
          <View className="px-5 mb-4">
            <TextInput
              value={otherText}
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
