import React, { forwardRef, useCallback, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
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
  /** 확인 버튼 클릭 시 호출되는 콜백 */
  onConfirm: () => void;
  /** 바텀시트 닫힘 시 호출되는 콜백 */
  onDismiss?: () => void;
}

/**
 * # PermissionGuideBottomSheet
 * ---
 * - 간단설명: 앱 접근 권한 안내를 표시하는 바텀시트 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 안내 목적으로만 사용 (실제 권한 요청은 각 기능 사용 시 수행)
 *   - 카메라, 사진보관함, PUSH 알림 3개 권한 항목 표시
 *   - ref를 통해 open/close 제어
 * ---
 * @param onConfirm 확인 버튼 클릭 시 콜백
 * @param onDismiss 바텀시트 닫힘 시 콜백
 * ---
 * @example
 * const ref = useRef<BottomSheetHandle>(null);
 * <PermissionGuideBottomSheet ref={ref} onConfirm={handleConfirm} />
 */
const PermissionGuideBottomSheet = forwardRef<BottomSheetHandle, Props>(
  ({ onConfirm, onDismiss }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);
    const { bottom } = useSafeAreaInsets();

    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.present(),
      close: () => modalRef.current?.dismiss(),
    }));

    const handleConfirm = useCallback(() => {
      modalRef.current?.dismiss();
      onConfirm();
    }, [onConfirm]);

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
            <Text className="text-xl font-bold text-gray-900">
              서비스를 위한 앱 접근 권한 안내
            </Text>
          </View>

          {/* 권한 목록 */}
          <View className="px-5 gap-5">
            <PermissionItem
              icon="📷"
              title="카메라 사용 권한 [선택]"
              description="QR코드 인식 및 이미지 첨부 시 사용"
            />
            <PermissionItem
              icon="🖼️"
              title="사진보관함 사용 권한 [선택]"
              description="프로필 사진 저장 / 첨부 시 사용"
            />
            <PermissionItem
              icon="🔔"
              title="PUSH 알림 권한 [선택]"
              description="업데이트, 혜택 등 푸시 알림 시 사용"
            />
          </View>

          {/* 안내 문구 */}
          <View className="mx-5 mt-6 rounded-xl bg-gray-100 px-4 py-3.5">
            <Text className="text-xs text-gray-500 leading-4">
              {'· 더 나은 서비스 제공을 위해 필요한 항목만 접근합니다\n· 선택 접근 권한은 해당 기능을 사용할 때 허용이 필요하며, 허용하지 않으셔도 해당 권한 관련 기능 외의 서비스 사용이 가능합니다.'}
            </Text>
          </View>

          {/* 확인 CTA */}
          <View
            className="px-5 pt-5"
            style={{ paddingBottom: Math.max(bottom, 16) }}
          >
            <Button title="확인" onPress={handleConfirm} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

PermissionGuideBottomSheet.displayName = 'PermissionGuideBottomSheet';

export default PermissionGuideBottomSheet;

/** 개별 권한 항목 */
function PermissionItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
        <Text className="text-lg">{icon}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-gray-900">{title}</Text>
        <Text className="text-xs text-gray-500 mt-0.5">{description}</Text>
      </View>
    </View>
  );
}
