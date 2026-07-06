import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ProfileCard } from '@/shared/ui';
import type { StorageProfile } from '@/entities/storage';
import { COSMIC_TYPE_LABEL } from '@/entities/storage';

interface ProfileGridProps {
  /** 프로필 목록 */
  profiles: StorageProfile[];
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
}

/**
 * # ProfileGrid
 * ---
 * - 간단설명: 프로필 카드를 2열 그리드로 렌더링하는 컴포넌트
 * - 제약사항 및 특이사항:
 *   - FlatList numColumns=2, 12px 간격
 *   - 빈 목록 시 빈 화면 표시
 *   - 편집 모드 시 체크박스 오버레이 전달
 * ---
 * @param profiles 프로필 목록
 * @param onToggleFavorite 즐겨찾기 토글 콜백
 * @param isEditMode 편집 모드 여부
 * @param selectedIds 선택된 프로필 ID Set
 * @param onToggleSelect 선택 토글 콜백
 * ---
 * @example
 * <ProfileGrid profiles={profiles} onToggleFavorite={toggle} />
 */
export default function ProfileGrid({
  profiles,
  onToggleFavorite,
  onPressProfile,
  isEditMode = false,
  selectedIds,
  onToggleSelect,
}: ProfileGridProps) {
  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <ProfileCard
          variant="grid"
          id={item.id}
          name={item.name}
          age={item.age}
          location={item.location}
          job={item.job}
          cosmicTypeLabel={COSMIC_TYPE_LABEL[item.cosmicType]}
          imageUri={item.imageUri}
          isFavorited={item.isFavorited}
          onToggleFavorite={onToggleFavorite}
          onPress={onPressProfile}
          isEditMode={isEditMode}
          isSelected={selectedIds?.has(item.id) ?? false}
          onToggleSelect={onToggleSelect}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  columnWrapper: { gap: 12 },
  contentContainer: { gap: 24 },
});
