export interface IconProps {
  size?: number;
  color?: string;
}

/**
 * 방향 지정 가능한 아이콘 Props
 * - direction = 'left' | 'up' | 'right' | 'down'
 */
export interface DirectionalIconProps extends IconProps {
  direction?: 'up' | 'right' | 'down' | 'left';
}

/**
 * 가로/세로 방향 지정 가능한 아이콘 Props
 * - orientation = 'horizontal' | 'vertical'
 */
export interface OrientedIconProps extends IconProps {
  orientation?: 'horizontal' | 'vertical';
}
