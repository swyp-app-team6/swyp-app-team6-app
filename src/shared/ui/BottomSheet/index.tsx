import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { cn } from '@/shared/lib/cn';

/** BottomSheet ref를 통해 외부에서 열기/닫기 제어 */
export interface BottomSheetHandle {
  open: () => void;
  close: () => void;
}

interface Props {
  /** 바텀시트 상단 제목 */
  title?: string;
  /** X 닫기 버튼 표시 여부. 기본값: true */
  showClose?: boolean;
  /** 닫힐 때 호출되는 콜백 */
  onClose?: () => void;
  /** 스냅 포인트 배열 (예: ['50%', '90%']). 미지정 시 컨텐츠 기반 동적 높이 */
  snapPoints?: string[];
  children: React.ReactNode;
  styleClass?: { root?: string; header?: string; content?: string };
}

/**
 * # BottomSheet
 * ---
 * - 간단설명: 범용 바텀시트 컴포넌트 (gorhom/bottom-sheet 기반)
 * - 제약사항 및 특이사항:
 *   - ref를 통해 open/close 제어
 *   - snapPoints 미지정 시 컨텐츠에 맞는 동적 높이
 *   - 배경 탭으로 닫기 지원
 * ---
 * @param title 바텀시트 상단 제목
 * @param showClose X 닫기 버튼 표시 여부
 * @param onClose 닫힐 때 콜백
 * @param snapPoints 스냅 포인트 배열
 * @param children 바텀시트 내부 컨텐츠
 * ---
 * @example
 * ```tsx
 * const sheetRef = useRef<BottomSheetHandle>(null);
 *
 * <Button title="열기" onPress={() => sheetRef.current?.open()} />
 *
 * <BottomSheet ref={sheetRef} title="옵션 선택" onClose={handleClose}>
 *   <Text>바텀시트 컨텐츠</Text>
 * </BottomSheet>
 * ```
 */
const BottomSheetComponent = forwardRef<BottomSheetHandle, Props>(
  ({ title, showClose = true, onClose, snapPoints, children, styleClass }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);
    const { bottom } = useSafeAreaInsets();

    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.present(),
      close: () => modalRef.current?.dismiss(),
    }));

    const handleDismiss = useCallback(() => {
      onClose?.();
    }, [onClose]);

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
        ref={modalRef}
        snapPoints={snapPoints}
        enableDynamicSizing={!snapPoints}
        backdropComponent={renderBackdrop}
        onDismiss={handleDismiss}
      >
        <BottomSheetView className={cn(styleClass?.root)}>
          {(title || showClose) && (
            <View
              className={cn(
                'flex-row items-center justify-between px-5 pb-3 pt-1',
                styleClass?.header,
              )}
            >
              <Text className="text-lg font-bold text-gray-900">
                {title ?? ''}
              </Text>
              {showClose && (
                <Pressable
                  onPress={() => modalRef.current?.dismiss()}
                  hitSlop={8}
                  accessibilityLabel="닫기"
                >
                  <Text className="text-2xl text-gray-400">✕</Text>
                </Pressable>
              )}
            </View>
          )}
          <View className={cn('px-5', styleClass?.content)}>
            {children}
          </View>
          <View style={{ height: bottom + 16 }} />
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

BottomSheetComponent.displayName = 'BottomSheet';

export default BottomSheetComponent;
