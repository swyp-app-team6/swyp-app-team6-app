import React, { forwardRef, useCallback } from 'react';
import { View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import useSafePaddingBottom from '@/shared/utils/useSafePaddingBottom';

interface Props extends Omit<BottomSheetModalProps, 'backdropComponent'> {
  children: React.ReactNode;
}

/**
 * # SafeBottomSheetModal
 * ---
 * - 간단설명: useSafePaddingBottom이 자동 적용된 BottomSheetModal 래퍼
 * - 제약사항 및 특이사항:
 *   - 하단 안전 영역 패딩이 자동으로 children 아래에 추가됨
 *   - 배경 탭으로 닫기(BottomSheetBackdrop) 기본 내장
 *   - enableDynamicSizing 기본 활성화
 *   - android_keyboardInputMode="adjustPan" 기본 적용
 *   - 기존 BottomSheetModal의 모든 props 전달 가능
 * ---
 * @param children 바텀시트 내부 컨텐츠
 * ---
 * @example
 * ```tsx
 * const ref = useRef<BottomSheetModal>(null);
 *
 * <SafeBottomSheetModal ref={ref} onDismiss={handleDismiss}>
 *   <View className="px-5">
 *     <Text>컨텐츠</Text>
 *   </View>
 * </SafeBottomSheetModal>
 * ```
 */
const SafeBottomSheetModal = forwardRef<BottomSheetModal, Props>(
  ({ children, ...rest }, ref) => {
    const { paddingBottom } = useSafePaddingBottom();

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        android_keyboardInputMode="adjustPan"

        {...rest}
      >
        <BottomSheetView >
          {children}
          <View style={{ height: paddingBottom + 16 }} />
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

SafeBottomSheetModal.displayName = 'SafeBottomSheetModal';

export default SafeBottomSheetModal;
