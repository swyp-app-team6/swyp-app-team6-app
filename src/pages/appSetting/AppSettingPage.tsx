import React from 'react';
import { Text, View } from 'react-native';
import { Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';

// @ts-ignore — package.json에서 버전 직접 참조
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../../package.json');

/**
 * # AppSettingPage
 * ---
 * - 간단설명: 앱 설정 화면 (앱 버전 정보 표시)
 * - 제약사항 및 특이사항:
 *   - 앱 버전은 package.json의 version 필드를 참조
 * ---
 * @example
 * <AppSettingPage />
 */
function AppSettingPage() {
  return (
    <>
      <Header title="앱 설정" showBack />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        {/* 앱 버전 */}
        <View className="px-5 py-3.5 flex-row items-center">
          <Text className="flex-1 text-[16px] font-medium text-[#1A1A1A] leading-[22.4px]">
            앱 버전
          </Text>
          <Text className="text-[14px] font-medium text-black leading-[19.6px]">
            V.{version}
          </Text>
        </View>
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(AppSettingPage));
