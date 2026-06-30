import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { cn } from '@/shared/lib/cn';

interface StyleClass {
  root?: string;
}

interface SelectedTMIPreviewButtonProps {
  /** 선택된 TMI 개수 */
  count: number;
  /** 미리보기 버튼 탭 시 호출 */
  onPress?: () => void;
  /** 추가 스타일 클래스 */
  styleClass?: StyleClass;
}

/**
 * # SelectedTMIPreviewButton
 * ---
 * - 간단설명: 선택된 TMI 개수와 미리보기 버튼을 표시하는 다크 바 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 어두운 배경(#1B1B1B)에 흰색 텍스트
 *   - 좌측: "N개 선택됨", 우측: "미리보기 >" 버튼
 *   - 높이 48px, 12px 라운드
 * ---
 * @param count 선택된 TMI 개수
 * @param onPress 미리보기 버튼 탭 시 호출되는 콜백
 * ---
 * @example
 * ```tsx
 * <SelectedTMIPreviewButton
 *   count={2}
 *   onPress={handlePreview}
 * />
 * ```
 */
export default function SelectedTMIPreviewButton({
  count,
  onPress,
  styleClass,
}: SelectedTMIPreviewButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'h-12 flex-row items-center justify-between rounded-xl bg-text-gray2 px-6',
        styleClass?.root,
      )}
    >
      <Text className="text-sm font-medium text-white tracking-tight">
        TMI {count}개 선택됨
      </Text>
      <View className="flex-row items-center">
        <Text className="text-[13px] font-medium text-white tracking-tight">
          미리보기{' '}
        </Text>
        <ChevronRight />
      </View>
    </Pressable>
  );
}

/** 우측 화살표 아이콘 (>) */
function ChevronRight() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6l6 6-6 6"
        stroke="#FFFFFF"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
