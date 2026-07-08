import { memo } from "react";
import { Pressable, type ViewStyle } from "react-native";
import { twJoin } from "tailwind-merge";

/**
 * 프로필카드 컨테이너 컴포넌트
 * - 모든 프로필 카드는 다음 컴포넌트를 사용하여 프레임 제작할 것
 * @param param0 
 * @returns 
 */
function ProfileCardContainer({ children, className, responsive = false, ...props }: {
  children: React.ReactNode;
  className?: string;
  responsive?: boolean;
} & React.ComponentProps<typeof Pressable>) {
  const style: ViewStyle = !responsive ? {
    width: 284,
    height: 392,
  } : {
    width: '100%',
    aspectRatio: 284 / 392,
  }
  return (
    <Pressable
      className={twJoin('flex items-center justify-center rounded-xl border-2 border-primary-light', className)}
      style={style}
      {...props}
    >
      {children}
    </Pressable>
  )
}

export default memo(ProfileCardContainer);