import React, { forwardRef, useCallback, useRef } from 'react';
import { Text, View } from 'react-native';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useImperativeHandle } from 'react';
import { Button } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';

interface Props {
  /** "안내 받은 계정이 있어요" 버튼 클릭 시 콜백 */
  onDefaultLogin: () => void;
  /** 바텀시트 닫힘 시 콜백 */
  onDismiss?: () => void;
}

/**
 * # LoginTroubleBottomSheet
 * ---
 * - 간단설명: 소셜 로그인 실패 시 안내 및 안내받은 계정 로그인 진입 바텀시트
 * - 제약사항 및 특이사항:
 *   - ref를 통해 open/close 제어
 *   - "안내 받은 계정이 있어요" 버튼으로 DefaultLoginPage 이동
 * ---
 * @param onDefaultLogin 안내받은 계정 로그인 화면 이동 콜백
 * @param onDismiss 바텀시트 닫힘 시 콜백
 * ---
 * @example
 * const ref = useRef<BottomSheetHandle>(null);
 * <LoginTroubleBottomSheet ref={ref} onDefaultLogin={() => navigate('defaultLogin')} />
 */
const LoginTroubleBottomSheet = forwardRef<BottomSheetHandle, Props>(
  ({ onDefaultLogin, onDismiss }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);
    const { bottom } = useSafeAreaInsets();

    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.present(),
      close: () => modalRef.current?.dismiss(),
    }));

    const handleDefaultLogin = useCallback(() => {
      modalRef.current?.dismiss();
      onDefaultLogin();
    }, [onDefaultLogin]);

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
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        onDismiss={onDismiss}
      >
        <BottomSheetView>
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
          <View className="px-5 pb-6">
            <Text className="text-xl font-bold text-gray-900 leading-7">
              {'소셜 로그인에 실패했다면\n아래 방법을 먼저 확인해주세요'}
            </Text>
          </View>

          {/* 안내 항목 */}
          <View className="px-5 gap-3">
            <View className="rounded-xl border border-gray-200 px-4 py-3.5">
              <Text className="text-base text-gray-900">1.소셜 로그인 다시 시도</Text>
            </View>
            <View className="rounded-xl border border-gray-200 px-4 py-3.5">
              <Text className="text-base text-gray-900">2.다른 소셜 계정으로 로그인</Text>
            </View>
          </View>

          {/* CTA 버튼 */}
          <View
            className="px-5 pt-6"
            style={{ paddingBottom: Math.max(bottom, 16) }}
          >
            <Button title="안내 받은 계정이 있어요" onPress={handleDefaultLogin} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

LoginTroubleBottomSheet.displayName = 'LoginTroubleBottomSheet';

export default LoginTroubleBottomSheet;
