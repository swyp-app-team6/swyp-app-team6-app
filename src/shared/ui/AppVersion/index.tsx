import React from 'react';
import { Text, type TextProps } from 'react-native';

// @ts-ignore — react-native-config 대신 직접 package.json에서 버전 참조
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../../../package.json');

interface AppVersionProps extends Omit<TextProps, 'children'> {
  /** 버전 앞에 붙일 접두사 (기본값: 'v') */
  prefix?: string;
}

/**
 * # AppVersion
 * ---
 * - 간단설명: 앱 버전(package.json)을 텍스트로 표시하는 컴포넌트
 * - 제약사항 및 특이사항:
 *   - package.json의 version 필드를 직접 참조
 * ---
 * @param prefix 버전 앞에 붙일 접두사 (기본값: 'v')
 * ---
 * @example
 * <AppVersion />                  // "v0.2.0"
 * <AppVersion prefix="ver " />    // "ver 0.2.0"
 */
function AppVersion({ prefix = 'v', className, ...rest }: AppVersionProps) {
  return (
    <Text
      className={`text-xs text-gray-400 text-center ${className ?? ''}`}
      {...rest}
    >
      {`${prefix}${version}`}
    </Text>
  );
}

export default AppVersion;
