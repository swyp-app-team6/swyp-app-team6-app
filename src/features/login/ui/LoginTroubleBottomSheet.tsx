import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { Text, View } from 'react-native';
import { Button } from '@/shared/ui';
import BottomSheet from '@/shared/ui/BottomSheet';
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
 *   - BottomSheet 컴포넌트 기반 (보라색 닫기 버튼 내장)
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
    const sheetRef = useRef<BottomSheetHandle>(null);

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.open(),
      close: () => sheetRef.current?.close(),
    }));

    const handleDefaultLogin = useCallback(() => {
      sheetRef.current?.close();
      onDefaultLogin();
    }, [onDefaultLogin]);

    return (
      <BottomSheet ref={sheetRef} onClose={onDismiss}>
        {/* 타이틀 */}
        <View className="pb-6">
          <Text className="text-xl font-bold text-gray-900 leading-7">
            {'소셜 로그인에 실패했다면\n아래 방법을 먼저 확인해주세요'}
          </Text>
        </View>

        {/* 안내 항목 */}
        <View className="gap-3">
          <View className="rounded-xl px-4 py-3.5">
            <Text className="text-base text-gray-900">1.소셜 로그인 다시 시도</Text>
          </View>
          <View className="rounded-xl px-4 py-3.5">
            <Text className="text-base text-gray-900">2.다른 소셜 계정으로 로그인</Text>
          </View>
        </View>

        {/* CTA 버튼 */}
        <View className="pt-6">
          <Button title="안내 받은 계정이 있어요" onPress={handleDefaultLogin} />
        </View>

        {/* 하단 여백 */}
        <View className="px-4 py-2" style={{ height: 34 }} />
      </BottomSheet>
    );
  },
);

LoginTroubleBottomSheet.displayName = 'LoginTroubleBottomSheet';

export default LoginTroubleBottomSheet;
