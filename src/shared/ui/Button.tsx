import React from "react";
import { ActivityIndicator, Pressable, Text, type PressableProps } from "react-native";

/** 버튼 스타일 변형. primary(보라 배경) | secondary(테두리) | ghost(투명) */
export type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * 공용 버튼 컴포넌트.
 *
 * @example
 * ```tsx
 * <Button title="저장" variant="primary" onPress={handleSave} />
 * <Button title="로딩 중" variant="primary" loading />
 * <Button title="취소" variant="ghost" disabled />
 * ```
 */
export type ButtonProps = Omit<PressableProps, "children"> & {
  /** 버튼에 표시할 텍스트 */
  title: string;
  /** 버튼 스타일 변형. 기본값: `"primary"` */
  variant?: ButtonVariant;
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
};

export function Button({
  title,
  variant = "primary",
  loading = false,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const v = variantClass[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={`${isDisabled ? v.disabledPressable : v.pressable} ${className ?? ""}`}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#8C39FB"} />
      ) : (
        <Text className={isDisabled ? v.disabledText : v.text}>{title}</Text>
      )}
    </Pressable>
  );
}
