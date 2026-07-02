import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@/shared/ui';
import { SearchFallbackView } from '@/shared/ui/SearchFallbackView';
import PullToRefreshWrapper from '@/shared/ui/PullToRefreshWrapper';
import { ChevronDownIcon, SearchIcon } from '@/shared/ui/icons';
import { MOCK_STORAGE_PROFILES, COSMIC_TYPE_LABEL } from '@/entities/storage';
import type { StorageProfile } from '@/entities/storage';
import type { NavigationPropType } from '@/shared/types';
import ProfileGrid from './ProfileGrid';

/** 미리보기에서 보여줄 최대 프로필 수 */
const PREVIEW_COUNT = 4;

/**
 * # StorageWidget
 * ---
 * - 간단설명: 보관함 미리보기 위젯 — 최신 4개 프로필 + 빈 상태 + 전체보기 네비게이션
 * - 제약사항 및 특이사항:
 *   - 검색: 이름 또는 코스믹 유형 라벨 기준 필터링
 *   - mock 데이터 기반 (API 미연동)
 *   - 즐겨찾기 토글은 로컬 상태로 관리
 *   - 최대 4개까지만 표시, 전체보기 클릭 시 storageAll 페이지로 이동
 *   - 프로필이 없으면 빈 상태 메시지 표시
 * ---
 * @example
 * <StorageWidget />
 */
export default function StorageWidget() {
  const navigation = useNavigation<NavigationPropType>();
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

  /** 미리보기용 최신 4개 프로필 */
  const previewProfiles = useMemo(
    () => filteredProfiles.slice(0, PREVIEW_COUNT),
    [filteredProfiles],
  );

  const handleToggleFavorite = (id: number) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorited: !p.isFavorited } : p)),
    );
  };

  const handleRefetch = () => {
    setProfiles([...MOCK_STORAGE_PROFILES]);
  };

  const isEmpty = filteredProfiles.length === 0;

  return (
    <PullToRefreshWrapper onRefetch={handleRefetch}>
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
          <Text className="text-sm text-[#565656]">총</Text>
          <Text className="text-sm text-[#1A1A1A]">{filteredProfiles.length}개</Text>
        </View>
        {!isEmpty && (
          <Pressable
            className="flex-row items-center gap-1"
            onPress={() => navigation.navigate('storageAll')}
          >
            <Text className="text-xs font-medium text-[#888888]">전체보기</Text>
            <View style={{ transform: [{ rotate: '-90deg' }] }}>
              <ChevronDownIcon size={16} color="#888888" />
            </View>
          </Pressable>
        )}
      </View>

      {/* 프로필 그리드 또는 빈 상태 */}
      {isEmpty ? (
        <SearchFallbackView
          message="아직 교환한 프로필이 없어요!"
          styleClass={{ root: 'flex-1 py-40' }}
        />
      ) : (
        <ProfileGrid
          profiles={previewProfiles}
          onToggleFavorite={handleToggleFavorite}
          onPressProfile={(id) =>
            navigation.navigate('exchangedProfileDetail', { profileId: id })
          }
        />
      )}
    </PullToRefreshWrapper>
  );
}
