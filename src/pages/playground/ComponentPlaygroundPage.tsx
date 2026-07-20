import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Button, Header, Layout, Toast } from '@/shared/ui';
import {
  ColorPaletteExample,
  CheckboxExample,
  TextFieldExample,
  InputExample,
  TextboxExample,
  SelectboxExample,
  AlertModalExample,
  ErrorDialogExample,
  PopoverMenuExample,
  ChipSelectExample,
  AnimExample,
  CardExample,
  ProgressBarExample,
  TagExample,
  FavTagExample,
  BadgeExample,
  TMICardExample,
  SocialLoginExample,
  CommonInterestCardExample,
  UserProfileCardExample,
  EmptyProfileCardExample,
  ProfileFlipWrapperExample,
  CosmicResultCardExample,
  CameraUploadZoneExample,
  SelectedTMIPreviewButtonExample,
  IconsExample,
  SafeAreaTestExample,
  FirebaseAnalyticsExample,
  TokenTestExample,
  SentryTestExample,
} from './examples';

// ────────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────────

/**
 * # ComponentPlaygroundPage
 * ---
 * - 간단설명: 공용 UI 컴포넌트 전체를 한 화면에서 확인할 수 있는 플레이그라운드
 * ---
 * @example
 * <ComponentPlaygroundPage />
 */
export default function ComponentPlaygroundPage() {
  const [activeTab, setActiveTab] = useState<'ui' | 'dev'>('ui');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  return (
    <Toast.Provider>
      <Layout>
        <Header title="Components" showBack />

        {/* ── Tab Navigation ───────────────────────────────────────────────── */}
        <View className="flex-row border-b border-gray-200 bg-white">
          <Button
            title="UI"
            variant={activeTab === 'ui' ? 'primary' : 'ghost'}
            className="flex-1"
            onPress={() => setActiveTab('ui')}
          />
          <Button
            title="DEV"
            variant={activeTab === 'dev' ? 'primary' : 'ghost'}
            className="flex-1"
            onPress={() => setActiveTab('dev')}
          />
        </View>

        {/* ── DEV 탭 ───────────────────────────────────────────────────────── */}
        {activeTab === 'dev' && (
          <ScrollView className="flex-1 bg-white" contentContainerClassName="p-5 pb-20">
            <SafeAreaTestExample />
            <FirebaseAnalyticsExample />
            <TokenTestExample />
            <SentryTestExample />
          </ScrollView>
        )}

        {/* ── UI 탭 ────────────────────────────────────────────────────────── */}
        {activeTab === 'ui' && (
          <ScrollView
            className="flex-1 bg-white"
            contentContainerClassName="p-5 pb-20"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <ColorPaletteExample />
            <CheckboxExample />
            <TextFieldExample />
            <InputExample />
            <TextboxExample />
            <SelectboxExample />
            <AlertModalExample />
            <ErrorDialogExample />
            <PopoverMenuExample />
            <ChipSelectExample />
            <AnimExample />
            <CardExample />
            <ProgressBarExample />
            <TagExample />
            <FavTagExample />
            <BadgeExample />
            <TMICardExample />
            <SocialLoginExample />
            <CommonInterestCardExample />
            <UserProfileCardExample />
            <EmptyProfileCardExample />
            <ProfileFlipWrapperExample />
            <CosmicResultCardExample />
            <CameraUploadZoneExample />
            <SelectedTMIPreviewButtonExample />
            <IconsExample />
          </ScrollView>
        )}
      </Layout>
    </Toast.Provider>
  );
}
