import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';
import PullToRefreshWrapper from '@/shared/ui/PullToRefreshWrapper';
import { HeartIcon, SearchIcon, FilterIcon } from '@/shared/ui/icons';
import { openDialog } from '@/shared/ui/Dialog';
import {
  useExchangeArchiveListQuery,
  cosmicTypeToApiValue,
} from '@/entities/storage';
import type { ExchangeArchiveItem } from '@/entities/storage';
import type { NavigationPropType } from '@/shared/types';
import {
  StorageFilterBottomSheet,
  useToggleLikeMutation,
  useDeleteArchivesMutation,
  type StorageFilterState,
} from '@/features/storage';
import ProfileGrid from './ProfileGrid';
import EditToolbar from './EditToolbar';

/**
 * # StorageAllWidget
 * ---
 * - 간단설명: 보관함 전체보기 위젯 — 검색, 필터, 편집 모드, 무한스크롤
 * - 제약사항 및 특이사항:
 *   - API 연동: useExchangeArchiveListQuery로 커서 기반 무한스크롤
 *   - 좋아요: optimistic update
 *   - 삭제: 다이얼로그 확인 후 mutation
 * ---
 * @example
 * <StorageAllWidget />
 */
export default function StorageAllWidget() {
  const navigation = useNavigation<NavigationPropType>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);
  const [filter, setFilter] = useState<StorageFilterState>({
    regions: [],
    cosmicTypes: [],
  });
  const filterRef = useRef<BottomSheetHandle>(null);

  const params = useMemo(
    () => ({
      keyword: searchQuery.trim() || undefined,
      regions: filter.regions.length > 0 ? filter.regions : undefined,
      types:
        filter.cosmicTypes.length > 0
          ? filter.cosmicTypes.map((t) => cosmicTypeToApiValue(t as any))
          : undefined,
      liked: isFavoriteOnly ? true : undefined,
    }),
    [searchQuery, filter, isFavoriteOnly],
  );

  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useExchangeArchiveListQuery(params);

  const { mutate: toggleLike } = useToggleLikeMutation();
  const { mutate: deleteArchives } = useDeleteArchivesMutation();

  const exchanges: ExchangeArchiveItem[] = useMemo(
    () => data?.pages.flatMap((page) => page.exchanges) ?? [],
    [data],
  );
  const totalCount = data?.pages[0]?.total_count ?? 0;

  const handleToggleFavorite = (id: number) => {
    const item = exchanges.find((e) => e.exchange_id === id);
    if (item) {
      toggleLike({ exchangeId: id, liked: !item.is_liked });
    }
  };

  const handleEnterEditMode = () => {
    setIsEditMode(true);
    setSelectedIds(new Set());
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setSelectedIds(new Set());
  };

  const handleToggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleToggleSelectAll = () => {
    if (selectedIds.size === exchanges.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(exchanges.map((p) => p.exchange_id)));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;

    openDialog({
      type: 'confirm',
      title: '선택한 프로필을 삭제하시겠어요?',
      okFn: () => {
        deleteArchives(
          { exchange_ids: Array.from(selectedIds) },
          {
            onSuccess: () => {
              setSelectedIds(new Set());
              setIsEditMode(false);
              openDialog({
                type: 'alert',
                title: '선택한 프로필을 삭제했습니다',
              });
            },
            onError: () => {
              openDialog({
                type: 'alert',
                title: '삭제에 실패했습니다',
                message: '잠시 후 다시 시도해주세요.',
              });
            },
          },
        );
      },
    });
  };

  const handleApplyFilter = useCallback((newFilter: StorageFilterState) => {
    setFilter(newFilter);
  }, []);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const isAllSelected =
    exchanges.length > 0 && selectedIds.size === exchanges.length;

  return (
    <>
      <PullToRefreshWrapper onRefetch={refetch}>
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
                {totalCount}개
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
          profiles={exchanges}
          onToggleFavorite={handleToggleFavorite}
          onPressProfile={(id) =>
            navigation.navigate('exchangedProfileDetail', { profileId: id })
          }
          isEditMode={isEditMode}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onEndReached={handleEndReached}
          isFetchingNextPage={isFetchingNextPage}
        />
      </PullToRefreshWrapper>

      <StorageFilterBottomSheet ref={filterRef} onApply={handleApplyFilter} />
    </>
  );
}
