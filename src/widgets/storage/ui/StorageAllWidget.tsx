import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';
import PullToRefreshWrapper from '@/shared/ui/PullToRefreshWrapper';
import { HeartIcon, SearchIcon, FilterIcon } from '@/shared/ui/icons';
import { openDialog } from '@/shared/ui/Dialog';
import { MOCK_STORAGE_PROFILES, COSMIC_TYPE_LABEL } from '@/entities/storage';
import type { StorageProfile } from '@/entities/storage';
import type { NavigationPropType } from '@/shared/types';
import {
  StorageFilterBottomSheet,
  type StorageFilterState,
} from '@/features/storage';
import ProfileGrid from './ProfileGrid';
import EditToolbar from './EditToolbar';

/**
 * # StorageAllWidget
 * ---
 * - 간단설명: 보관함 전체보기 위젯 — 검색, 필터, 편집 모드(전체선택/선택삭제) 포함
 * - 제약사항 및 특이사항:
 *   - 편집 모드: 체크박스 + 전체선택/편집취소/선택삭제
 *   - 필터: 지역 + 유형 바텀시트
 *   - 삭제: openDialog로 확인/완료 다이얼로그
 *   - mock 데이터 기반 (API 미연동)
 * ---
 * @example
 * <StorageAllWidget />
 */
export default function StorageAllWidget() {
  const navigation = useNavigation<NavigationPropType>();
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState<StorageProfile[]>(MOCK_STORAGE_PROFILES);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);
  const [filter, setFilter] = useState<StorageFilterState>({
    regions: [],
    cosmicTypes: [],
  });
  const filterRef = useRef<BottomSheetHandle>(null);

  const filteredProfiles = useMemo(() => {
    let result = profiles;

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((p) => {
        const typeLabel = COSMIC_TYPE_LABEL[p.cosmicType];
        return (
          p.name.toLowerCase().includes(query) ||
          typeLabel.toLowerCase().includes(query)
        );
      });
    }

    if (isFavoriteOnly) {
      result = result.filter((p) => p.isFavorited);
    }

    if (filter.cosmicTypes.length > 0) {
      result = result.filter((p) => filter.cosmicTypes.includes(p.cosmicType));
    }

    return result;
  }, [searchQuery, profiles, isFavoriteOnly, filter]);

  const handleToggleFavorite = (id: number) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorited: !p.isFavorited } : p)),
    );
  };

  const handleRefetch = () => {
    setProfiles([...MOCK_STORAGE_PROFILES]);
  };

  /** 편집 모드 진입 */
  const handleEnterEditMode = () => {
    setIsEditMode(true);
    setSelectedIds(new Set());
  };

  /** 편집 취소 */
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setSelectedIds(new Set());
  };

  /** 개별 선택 토글 */
  const handleToggleSelect = useCallback(
    (id: number) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [],
  );

  /** 전체 선택 토글 */
  const handleToggleSelectAll = () => {
    if (selectedIds.size === filteredProfiles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProfiles.map((p) => p.id)));
    }
  };

  /** 선택 삭제 */
  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;

    openDialog({
      type: 'confirm',
      title: '선택한 프로필을 삭제하시겠어요?',
      okFn: () => {
        setProfiles((prev) => prev.filter((p) => !selectedIds.has(p.id)));
        setSelectedIds(new Set());
        setIsEditMode(false);

        openDialog({
          type: 'alert',
          title: '선택한 프로필을 삭제했습니다',
        });
      },
    });
  };

  /** 필터 적용 */
  const handleApplyFilter = useCallback((newFilter: StorageFilterState) => {
    setFilter(newFilter);
  }, []);

  const isAllSelected =
    filteredProfiles.length > 0 && selectedIds.size === filteredProfiles.length;

  return (
    <>
      <PullToRefreshWrapper onRefetch={handleRefetch}>
        {/* 검색바 */}
        <Input
          placeholder="이름 또는 태그로 검색"
          value={searchQuery}
          onChangeText={setSearchQuery}
          prefix={<SearchIcon size={20} color="#8C39FB" />}
          styleClass={{ root: 'h-12 rounded-xl' }}
        />

        {/* 카운트 + 필터 */}
        <View className="mb-3 mt-5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center gap-1">
              <Text className="text-sm text-[#565656]">총</Text>
              <Text className="text-sm text-[#1A1A1A]">
                {filteredProfiles.length}개
              </Text>
            </View>
            {!isEditMode && (
              <>
                <Pressable
                  className="flex-row items-center gap-1"
                  onPress={() => setIsFavoriteOnly((prev) => !prev)}
                >
                  <HeartIcon size={16} filled={isFavoriteOnly} />
                  <Text
                    className="text-sm"
                    style={{ color: isFavoriteOnly ? '#8C39FB' : '#1A1A1A' }}
                  >
                    좋아요
                  </Text>
                </Pressable>
                <Pressable
                  className="flex-row items-center gap-1"
                  onPress={() => filterRef.current?.open()}
                >
                  <FilterIcon size={20} color="#8C39FB" />
                  <Text className="text-sm text-[#1A1A1A]">필터</Text>
                </Pressable>
              </>
            )}
          </View>
          {!isEditMode && (
            <Pressable hitSlop={8} onPress={handleEnterEditMode}>
              <Text className="text-sm text-[#888888]">편집</Text>
            </Pressable>
          )}
        </View>

        {/* 편집 모드 툴바 */}
        {isEditMode && (
          <View className="mb-3">
            <EditToolbar
              isAllSelected={isAllSelected}
              onToggleSelectAll={handleToggleSelectAll}
              onCancelEdit={handleCancelEdit}
              onDeleteSelected={handleDeleteSelected}
              hasSelection={selectedIds.size > 0}
            />
          </View>
        )}

        {/* 프로필 그리드 */}
        <ProfileGrid
          profiles={filteredProfiles}
          onToggleFavorite={handleToggleFavorite}
          onPressProfile={(id) =>
            navigation.navigate('exchangedProfileDetail', { profileId: id })
          }
          isEditMode={isEditMode}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
        />
      </PullToRefreshWrapper>

      <StorageFilterBottomSheet ref={filterRef} onApply={handleApplyFilter} />
    </>
  );
}
