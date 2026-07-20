import { useRef } from 'react';
import { Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Button } from '@/shared/ui';
import SafeBottomSheetModal from '@/shared/ui/SafeBottomSheetModal';
import Section from './Section';

/**
 * # SafeBottomSheetModalExample
 * ---
 * - 간단설명: SafeBottomSheetModal 컴포넌트의 플레이그라운드 예제
 * - 제약사항 및 특이사항:
 *   - BottomSheetModalProvider가 상위에 존재해야 동작 (AppProviders에서 제공)
 * ---
 * @example
 * <SafeBottomSheetModalExample />
 */
export default function SafeBottomSheetModalExample() {
  const basicRef = useRef<BottomSheetModal>(null);
  const longContentRef = useRef<BottomSheetModal>(null);

  return (
    <Section title="SafeBottomSheetModal">
      <View className="gap-3">
        <Button
          title="기본 바텀시트"
          variant="secondary"
          onPress={() => basicRef.current?.present()}
        />
        <Button
          title="긴 컨텐츠 바텀시트"
          variant="secondary"
          onPress={() => longContentRef.current?.present()}
        />
      </View>

      {/* 기본 바텀시트 */}
      <SafeBottomSheetModal ref={basicRef}>
        <View className="px-5 pb-4">
          <Text className="text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[#1a1a1a]">
            기본 바텀시트
          </Text>
          <Text className="mt-2 text-sm text-gray-600">
            SafeBottomSheetModal은 하단 안전 영역 패딩이 자동 적용됩니다.
          </Text>
          <View className="mt-4">
            <Button
              title="닫기"
              onPress={() => basicRef.current?.dismiss()}
            />
          </View>
        </View>
      </SafeBottomSheetModal>

      {/* 긴 컨텐츠 바텀시트 */}
      <SafeBottomSheetModal ref={longContentRef}>
        <View className="px-5 pb-4">
          <Text className="text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[#1a1a1a]">
            긴 컨텐츠
          </Text>
          <Text className="mt-2 text-sm text-gray-600">
            enableDynamicSizing이 기본 활성화되어 컨텐츠 높이에 맞게 자동 조절됩니다.
          </Text>
          <Text className="mt-2 text-sm text-gray-600">
            배경을 탭하면 자동으로 닫힙니다 (BottomSheetBackdrop 내장).
          </Text>
          <Text className="mt-2 text-sm text-gray-600">
            android_keyboardInputMode=&quot;adjustPan&quot;이 기본 적용되어 키보드가 올라올 때
            바텀시트가 자연스럽게 조정됩니다.
          </Text>
          <View className="mt-4">
            <Button
              title="닫기"
              onPress={() => longContentRef.current?.dismiss()}
            />
          </View>
        </View>
      </SafeBottomSheetModal>
    </Section>
  );
}
