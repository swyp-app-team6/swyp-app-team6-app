import React from "react";
import { Pressable, Text, View } from "react-native";

/**
 * 체크박스 컴포넌트.
 *
 * @example
 * ```tsx
 * const [checked, setChecked] = useState(false);
 * <Checkbox checked={checked} onValueChange={setChecked} label="동의합니다" />
 * ```
 */
export type CheckboxProps = {
  /** 체크 여부 */
  checked: boolean;
  /** 체크 상태 변경 콜백 */
  onValueChange: (checked: boolean) => void;
  /** 체크박스 옆에 표시할 텍스트 */
  label?: string;
  /** true이면 조작 불가 */
  disabled?: boolean;
  className?: string;
};

export function Checkbox({
  checked,
  onValueChange,
  label,
  disabled,
  className,
}: CheckboxProps) {
  const toggle = () => {
    if (!disabled) {
      onValueChange(!checked);
    }
  };

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: !!disabled }}
      onPress={toggle}
      disabled={disabled}
      className={`flex-row items-center gap-2 ${disabled ? "opacity-50" : ""} ${className ?? ""}`}
    >
      <View
        className={`h-6 w-6 items-center justify-center rounded border ${
          checked ? "border-blue-600 bg-blue-600" : "border-gray-400 bg-white"
        }`}
      >
        {checked ? <Text className="text-xs font-bold text-white">✓</Text> : null}
      </View>
      {label ? <Text className="flex-1 text-base text-gray-900">{label}</Text> : null}
    </Pressable>
  );
}
