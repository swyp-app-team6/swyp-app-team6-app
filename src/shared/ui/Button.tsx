import React from "react";
import { ActivityIndicator, Pressable, Text, View, type PressableProps } from "react-native";
import { cn } from "@/shared/lib/cn";

/**
 * 버튼 스타일 변형
 * - primary = 보라 배경
 * - secondary = 흰 배경 + 회색 테두리
 * - ghost = 투명 배경
 * - black = 검정 배경
 * - outline = 흰 배경 + 보라 테두리
 * - dark-outline = 다크 배경 + 보라 테두리
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "black" | "outline" | "dark-outline";

/**
 * # Button
 * ---
 * - 간단설명: 공용 버튼 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 6가지 변형 지원 (primary, secondary, ghost, black, outline, dark-outline)
 *   - icon prop으로 좌측 아이콘 배치 가능
 *   - loading 시 스피너 표시 및 비활성화
 *   - Dual 버튼 레이아웃은 Button 2개를 flex-row gap-3으로 배치
 * ---
 * @param title 버튼에 표시할 텍스트
 * @param variant 버튼 스타일 변형. 기본값: "primary"
 * @param icon 버튼 텍스트 좌측에 표시할 아이콘 (ReactNode)
 * @param loading true이면 스피너를 표시하고 버튼을 비활성화
 * ---
 * @example
 * ```tsx
 * <Button title="저장" variant="primary" onPress={handleSave} />
 * <Button title="이미지 저장" variant="outline" icon={<DownloadIcon />} />
 * <View className="flex-row gap-3">
 *   <Button title="보조 버튼" variant="secondary" />
 *   <Button title="메인 버튼" variant="primary" />
 * </View>
 * ```
 */
export type ButtonProps = Omit<PressableProps, "children"> & {
  /** 버튼에 표시할 텍스트 */
  title: string;
  /** 버튼 스타일 변형. 기본값: `"primary"` */
  variant?: ButtonVariant;
  /** 버튼 텍스트 좌측에 표시할 아이콘 */
  icon?: React.ReactNode;
  /** true이면 스피너를 표시하고 버튼을 비활성화 */
  loading?: boolean;
};

const variantClass: Record<ButtonVariant, { pressable: string; text: string; disabledPressable: string; disabledText: string }> = {
  primary: {
    pressable: "h-14 rounded-xl bg-primary items-center justify-center active:opacity-90",
    text: "text-center text-base font-bold text-white",
    disabledPressable: "h-14 rounded-xl bg-text-gray6 items-center justify-center",
    disabledText: "text-center text-base font-bold text-text-gray4",
  },
  secondary: {
    pressable: "h-14 rounded-xl border border-text-gray6 bg-white items-center justify-center active:bg-gray-50",
    text: "text-center text-base font-bold text-text-black",
    disabledPressable: "h-14 rounded-xl bg-text-gray6 items-center justify-center",
    disabledText: "text-center text-base font-bold text-text-gray4",
  },
  ghost: {
    pressable: "rounded-xl px-3 py-2 active:bg-gray-100",
    text: "text-center font-medium text-primary",
    disabledPressable: "rounded-xl px-3 py-2",
    disabledText: "text-center font-medium text-text-gray4",
  },
  black: {
    pressable: "h-14 rounded-xl bg-text-gray2 items-center justify-center active:opacity-90",
    text: "text-center text-base font-bold text-white",
    disabledPressable: "h-14 rounded-xl bg-text-gray6 items-center justify-center",
    disabledText: "text-center text-base font-bold text-text-gray4",
  },
  outline: {
    pressable: "h-14 rounded-xl border border-primary bg-white items-center justify-center active:bg-gray-50",
    text: "text-center text-base font-bold text-primary",
    disabledPressable: "h-14 rounded-xl bg-text-gray6 items-center justify-center",
    disabledText: "text-center text-base font-bold text-text-gray4",
  },
  "dark-outline": {
    pressable: "h-14 rounded-xl border border-primary bg-text-gray3 items-center justify-center active:opacity-90",
    text: "text-center text-base font-bold text-white",
    disabledPressable: "h-14 rounded-xl bg-text-gray6 items-center justify-center",
    disabledText: "text-center text-base font-bold text-text-gray4",
  },
};

export function Button({
  title,
  variant = "primary",
  icon,
  loading = false,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const v = variantClass[variant];
  const isDisabled = disabled || loading;

  const spinnerColor = ["primary", "black", "dark-outline"].includes(variant) ? "#fff" : "#8C39FB";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={cn(isDisabled ? v.disabledPressable : v.pressable, className)}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : icon ? (
        <View className="flex-row items-center justify-center gap-1">
          {icon}
          <Text className={isDisabled ? v.disabledText : v.text}>{title}</Text>
        </View>
      ) : (
        <Text className={isDisabled ? v.disabledText : v.text}>{title}</Text>
      )}
    </Pressable>
  );
}
