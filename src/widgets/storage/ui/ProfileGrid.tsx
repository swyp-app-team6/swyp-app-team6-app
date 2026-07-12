import React from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';
import { ProfileCard } from '@/shared/ui';
import type { ExchangeArchiveItem } from '@/entities/storage';
import { COSMIC_TYPE_LABEL, apiValueToCosmicType } from '@/entities/storage';
import { getProfileImageUrl } from '@/shared/lib/getProfileImageUrl';
import { getRegionLabel } from '@/shared/lib/regionLabel';

interface ProfileGridProps {
  /** 교환 프로필 목록 */
  profiles: ExchangeArchiveItem[];
  /** 즐겨찾기 토글 콜백 */
  onToggleFavorite: (id: number) => void;
  /** 프로필 카드 클릭 콜백 */
  onPressProfile?: (id: number) => void;
  /** 편집 모드 여부 */
  isEditMode?: boolean;
  /** 선택된 프로필 ID Set */
  selectedIds?: Set<number>;
  /** 선택 토글 콜백 */
  onToggleSelect?: (id: number) => void;
  /** 다음 페이지 로드 콜백 (무한스크롤) */
  onEndReached?: () => void;
  /** 다음 페이지 로딩 중 여부 */
  isFetchingNextPage?: boolean;
  /** 차단 해제 콜백 */
  onUnblock?: (id: number) => void;
}

/**
 * # ProfileGrid
 * ---
 * - 간단설명: 교환 프로필 카드를 2열 그리드로 렌더링하는 컴포넌트
 * - 제약사항 및 특이사항:
 *   - FlatList numColumns=2, 12px 간격
 *   - ExchangeArchiveItem → ProfileCard props 내부 변환
 *   - onEndReached 전달 시 무한스크롤 지원
 * ---
 * @param profiles 교환 프로필 목록
 * @param onToggleFavorite 즐겨찾기 토글 콜백
 * @param onEndReached 다음 페이지 로드 콜백
 * @param isFetchingNextPage 다음 페이지 로딩 중
 * ---
 * @example
 * <ProfileGrid profiles={exchanges} onToggleFavorite={toggle} />
 */
export default function ProfileGrid({
  profiles,
  onToggleFavorite,
  onPressProfile,
  isEditMode = false,
  selectedIds,
  onToggleSelect,
  onEndReached,
  isFetchingNextPage,
  onUnblock,
}: ProfileGridProps) {
  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => String(item.exchange_id)}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={!!onEndReached}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View className="py-4 items-center">
            <ActivityIndicator size="small" />
          </View>
        ) : null
      }
      renderItem={({ item }) => {
        const badgeLevel = item.cosmic_type ? apiValueToCosmicType(item.cosmic_type) : undefined;
        return (
          <ProfileCard
            variant="grid"
            id={item.exchange_id}
            name={item.nickname ?? ''}
            age={typeof item.age === 'number' ? item.age : undefined}
            location={item.region?.detail ? getRegionLabel(item.region.detail) : undefined}
            job={typeof item.job === 'string' ? item.job : undefined}
            cosmicTypeLabel={badgeLevel ? COSMIC_TYPE_LABEL[badgeLevel] : undefined}
            imageUri={getProfileImageUrl(item.image_key)}
            isFavorited={item.is_liked}
            onToggleFavorite={onToggleFavorite}
            onPress={onPressProfile}
            isEditMode={isEditMode}
            isSelected={selectedIds?.has(item.exchange_id) ?? false}
            onToggleSelect={onToggleSelect}
            isBlocked={item.is_blocked}
            onUnblock={onUnblock}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  columnWrapper: { gap: 12 },
  contentContainer: { gap: 24 },
});
