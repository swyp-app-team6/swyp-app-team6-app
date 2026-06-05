import React from "react";
import { ActivityIndicator, Pressable, Text, type PressableProps } from "react-native";

/** 버튼 스타일 변형. primary(파란 배경) | secondary(테두리) | ghost(투명) */
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

const variantClass: Record<ButtonVariant, { pressable: string; text: string }> = {
  primary: {
    pressable: "rounded-lg bg-blue-600 px-4 py-2 active:opacity-90",
    text: "text-center font-semibold text-white",
  },
  secondary: {
    pressable: "rounded-lg border border-gray-300 bg-white px-4 py-2 active:bg-gray-50",
    text: "text-center font-semibold text-gray-900",
  },
  ghost: {
    pressable: "rounded-lg px-3 py-2 active:bg-gray-100",
    text: "text-center font-medium text-blue-600",
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
      className={`${v.pressable} ${isDisabled ? "opacity-50" : ""} ${className ?? ""}`}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#2563eb"} />
      ) : (
        <Text className={v.text}>{title}</Text>
      )}
    </Pressable>
  );
}
