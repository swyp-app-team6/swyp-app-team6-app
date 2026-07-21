import React, { forwardRef, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import Svg, { Path } from 'react-native-svg';
import useSafePaddingBottom from '@/shared/utils/useSafePaddingBottom';

interface Props extends Omit<BottomSheetModalProps, 'backdropComponent'> {
  children: React.ReactNode;
  /** 우측 상단 닫기 버튼 표시 여부 (기본: true) */
  showCloseButton?: boolean;
}

/**
 * # SafeBottomSheetModal
 * ---
 * - 간단설명: useSafePaddingBottom이 자동 적용된 BottomSheetModal 래퍼
 * - 제약사항 및 특이사항:
 *   - 하단 안전 영역 패딩이 자동으로 children 아래에 추가됨
 *   - 배경 탭으로 닫기(BottomSheetBackdrop) 기본 내장
 *   - 우측 상단 보라색 X 닫기 버튼 기본 내장 (showCloseButton으로 제어)
 *   - enableDynamicSizing 기본 활성화
 *   - android_keyboardInputMode="adjustPan" 기본 적용
 *   - 기존 BottomSheetModal의 모든 props 전달 가능
 * ---
 * @param children 바텀시트 내부 컨텐츠
 * @param showCloseButton 우측 상단 닫기 버튼 표시 여부 (기본: true)
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
  ({ children, showCloseButton = true, ...rest }, ref) => {
    const { paddingBottom } = useSafePaddingBottom();
    const innerRef = React.useRef<BottomSheetModal>(null);

    React.useImperativeHandle(ref, () => innerRef.current as BottomSheetModal);

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

    const handleClose = useCallback(() => {
      innerRef.current?.dismiss();
    }, []);

    return (
      <BottomSheetModal
        ref={innerRef}
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        android_keyboardInputMode="adjustPan"
        {...rest}
      >
        <BottomSheetView>
          {showCloseButton && (
            <View className="items-end px-5">
              <TouchableOpacity onPress={handleClose} hitSlop={8}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path d="M18 6L6 18M18 18L6 6" stroke="#8C39FB" strokeWidth={2} strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>
          )}
          {children}
          <View style={{ height: paddingBottom + 16 }} />
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

SafeBottomSheetModal.displayName = 'SafeBottomSheetModal';

export default SafeBottomSheetModal;
