import { memo } from "react";
import { Pressable } from "react-native";
import { twJoin } from "tailwind-merge";

/**
 * 프로필카드 컨테이너 컴포넌트
 * - 모든 프로필 카드는 다음 컴포넌트를 사용하여 프레임 제작할 것
 * @param param0 
 * @returns 
 */
function ProfileCardContainer({ children, className, ...props }: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof Pressable>) {
  return (
    <Pressable
      className={twJoin('h-[392px] w-[284px] items-center justify-center rounded-xl border-2', className)}
      {...props}
    >
      {children}
    </Pressable>
  )
}

export default memo(ProfileCardContainer);