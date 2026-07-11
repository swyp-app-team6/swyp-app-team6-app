import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@/shared/ui';
import { SearchFallbackView } from '@/shared/ui/SearchFallbackView';
import PullToRefreshWrapper from '@/shared/ui/PullToRefreshWrapper';
import { ArrowIcon, SearchIcon } from '@/shared/ui/icons';
import { useExchangeArchiveListQuery } from '@/entities/storage';
import { useToggleLikeMutation, useUnblockMutation } from '@/features/storage';
import type { NavigationPropType } from '@/shared/types';
import ProfileGrid from './ProfileGrid';

/** 미리보기에서 보여줄 최대 프로필 수 */
const PREVIEW_COUNT = 4;

/**
 * # StorageWidget
 * ---
 * - 간단설명: 보관함 미리보기 위젯 — 최신 4개 프로필 + 빈 상태 + 전체보기 네비게이션
 * - 제약사항 및 특이사항:
 *   - API 연동: useExchangeArchiveListQuery({ size: 4 })
 *   - 검색: keyword 파라미터로 서버 검색
 *   - 즐겨찾기: useToggleLikeMutation으로 서버 반영
 * ---
 * @example
 * <StorageWidget />
 */
export default function StorageWidget() {
  const navigation = useNavigation<NavigationPropType>();
  const [searchQuery, setSearchQuery] = useState('');

  const params = useMemo(
    () => ({
      size: PREVIEW_COUNT,
      keyword: searchQuery.trim() || undefined,
    }),
    [searchQuery],
  );

  const { data, isLoading, refetch } = useExchangeArchiveListQuery(params);
  const { mutate: toggleLike } = useToggleLikeMutation();
  const { mutate: submitUnblock } = useUnblockMutation();

  /** 탈퇴 유저(nickname null) 제외 */
  const exchanges = (data?.pages[0]?.exchanges ?? []).filter((e) => e.nickname !== null);
  const totalCount = data?.pages[0]?.total_count ?? 0;
  const isEmpty = exchanges.length === 0 && !isLoading;

  const handleToggleFavorite = (id: number) => {
    const item = exchanges.find((e) => e.exchange_id === id);
    if (item) {
      toggleLike({ exchangeId: id, liked: !item.is_liked });
    }
  };

  const handleUnblock = (id: number) => {
    const item = exchanges.find((e) => e.exchange_id === id);
    if (!item?.block_id) return;
    submitUnblock(item.block_id);
  };

  return (
    <PullToRefreshWrapper onRefetch={refetch}>
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
          <Text className="text-sm text-[#1A1A1A]">{totalCount}개</Text>
        </View>
        {!isEmpty && (
          <Pressable
            className="flex-row items-center gap-1"
            onPress={() => navigation.navigate('storageAll')}
          >
            <Text className="text-xs font-medium text-[#888888]">전체보기</Text>
            <ArrowIcon size={16} color="#888888" direction="right" />
          </Pressable>
        )}
      </View>

      {/* 프로필 그리드 또는 빈 상태 */}
      {isLoading ? (
        <View className="flex-1 items-center py-40">
          <ActivityIndicator size="large" />
        </View>
      ) : isEmpty ? (
        <SearchFallbackView
          message="아직 교환한 프로필이 없어요!"
          styleClass={{ root: 'flex-1 py-40' }}
        />
      ) : (
        <ProfileGrid
          profiles={exchanges}
          onToggleFavorite={handleToggleFavorite}
          onPressProfile={(id) =>
            navigation.navigate('exchangedProfileDetail', { profileId: id })
          }
          onUnblock={handleUnblock}
        />
      )}
    </PullToRefreshWrapper>
  );
}
