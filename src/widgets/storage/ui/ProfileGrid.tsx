import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import type { StorageProfile } from '@/entities/storage';
import ProfileCard from './ProfileCard';

interface ProfileGridProps {
  /** 프로필 목록 */
  profiles: StorageProfile[];
  /** 즐겨찾기 토글 콜백 */
  onToggleFavorite: (id: number) => void;
}

/**
 * # ProfileGrid
 * ---
 * - 간단설명: 프로필 카드를 2열 그리드로 렌더링하는 컴포넌트
 * - 제약사항 및 특이사항:
 *   - FlatList numColumns=2, 12px 간격
 *   - 빈 목록 시 빈 화면 표시
 * ---
 * @param profiles 프로필 목록
 * @param onToggleFavorite 즐겨찾기 토글 콜백
 * ---
 * @example
 * <ProfileGrid profiles={profiles} onToggleFavorite={toggle} />
 */
export default function ProfileGrid({ profiles, onToggleFavorite }: ProfileGridProps) {
  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <ProfileCard profile={item} onToggleFavorite={onToggleFavorite} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  columnWrapper: { gap: 12 },
  contentContainer: { gap: 24 },
});
