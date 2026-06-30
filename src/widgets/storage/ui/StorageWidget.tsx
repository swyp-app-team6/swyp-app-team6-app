import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Input } from '@/shared/ui';
import { ChevronDownIcon, SearchIcon } from '@/shared/ui/icons';
import { MOCK_STORAGE_PROFILES, COSMIC_TYPE_LABEL } from '@/entities/storage';
import type { StorageProfile } from '@/entities/storage';
import ProfileGrid from './ProfileGrid';

/**
 * # StorageWidget
 * ---
 * - 간단설명: 보관함 화면의 메인 위젯 — 검색, 카운트, 프로필 그리드 조합
 * - 제약사항 및 특이사항:
 *   - 검색: 이름 또는 코스믹 유형 라벨 기준 필터링
 *   - mock 데이터 기반 (API 미연동)
 *   - 즐겨찾기 토글은 로컬 상태로 관리
 * ---
 * @example
 * <StorageWidget />
 */
export default function StorageWidget() {
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState<StorageProfile[]>(MOCK_STORAGE_PROFILES);

  const filteredProfiles = useMemo(() => {
    if (!searchQuery.trim()) return profiles;
    const query = searchQuery.trim().toLowerCase();
    return profiles.filter((p) => {
      const typeLabel = COSMIC_TYPE_LABEL[p.cosmicType];
      return (
        p.name.toLowerCase().includes(query) ||
        typeLabel.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, profiles]);

  const handleToggleFavorite = (id: number) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorited: !p.isFavorited } : p)),
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* 검색바 */}
      <Input
        placeholder="이름 또는 태그로 검색"
        value={searchQuery}
        onChangeText={setSearchQuery}
        prefix={<SearchIcon size={20} color="#8C39FB" />}
        styleClass={{ root: 'h-12 rounded-xl' }}
      />

      {/* 카운트 + 전체보기 */}
      <View className="mb-3 mt-5 flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <Text className="text-sm text-text-gray3">총</Text>
          <Text className="text-sm text-text-black">{filteredProfiles.length}개</Text>
        </View>
        <Pressable className="flex-row items-center gap-1">
          <Text className="text-xs font-medium text-text-gray4">전체보기</Text>
          <View style={{ transform: [{ rotate: '-90deg' }] }}>
            <ChevronDownIcon size={16} color="#888888" />
          </View>
        </Pressable>
      </View>

      {/* 프로필 그리드 */}
      <ProfileGrid
        profiles={filteredProfiles}
        onToggleFavorite={handleToggleFavorite}
      />
    </ScrollView>
  );
}
