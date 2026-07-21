import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Tag from '../Tag';
import { Checkbox } from '../Checkbox';
import { HeartIcon } from '../icons';

interface GridProfileCardProps {
  /** 프로필 ID */
  id: number;
  /** 이름 */
  name: string;
  /** 나이 */
  age?: number;
  /** 지역 */
  location?: string;
  /** 직업 */
  job?: string;
  /** 코스믹 유형 라벨 (변환된 한국어, 미지정 시 태그 미노출) */
  cosmicTypeLabel?: string;
  /** 프로필 이미지 URI */
  imageUri?: string;
  /** 즐겨찾기 여부 */
  isFavorited: boolean;
  /** 즐겨찾기 토글 콜백 */
  onToggleFavorite: (id: number) => void;
  /** 카드 클릭 콜백 */
  onPress?: (id: number) => void;
  /** 편집 모드 여부 */
  isEditMode?: boolean;
  /** 선택 여부 (편집 모드) */
  isSelected?: boolean;
  /** 선택 토글 콜백 (편집 모드) */
  onToggleSelect?: (id: number) => void;
  /** 차단 여부 */
  isBlocked?: boolean;
  /** 차단 해제 콜백 */
  onUnblock?: (id: number) => void;
}

/**
 * # GridProfileCard
 * ---
 * - 간단설명: 보관함 2열 그리드용 프로필 카드 (이미지 + 태그 + 하트 + 편집)
 * - 제약사항 및 특이사항:
 *   - 편집 모드 시 체크박스 노출, 카드 클릭 비활성화
 *   - 차단 상태 시 블러 처리 + 차단 해제 버튼 노출
 *   - 내부 API 호출 없음 — 모든 데이터를 props로 전달
 * ---
 * @param id 프로필 ID
 * @param name 이름
 * @param age 나이
 * @param location 지역
 * @param job 직업
 * @param cosmicTypeLabel 코스믹 유형 라벨
 * @param imageUri 프로필 이미지 URI
 * @param isFavorited 즐겨찾기 여부
 * @param onToggleFavorite 즐겨찾기 토글 콜백
 * @param onPress 카드 클릭 콜백
 * @param isEditMode 편집 모드 여부
 * @param isSelected 선택 여부
 * @param onToggleSelect 선택 토글 콜백
 * @param isBlocked 차단 여부
 * @param onUnblock 차단 해제 콜백
 * ---
 * @example
 * <GridProfileCard id={1} name="홍길동" age={25} isFavorited={false} onToggleFavorite={() => {}} />
 */
export default function GridProfileCard({
  id,
  name,
  age,
  location,
  job,
  cosmicTypeLabel,
  imageUri,
  isFavorited,
  onToggleFavorite,
  onPress,
  isEditMode = false,
  isSelected = false,
  onToggleSelect,
  isBlocked = false,
  onUnblock,
}: GridProfileCardProps) {
  return (
    <Pressable
      className="flex-1 max-w-[50%] overflow-hidden rounded-xl pb-3"
      onPress={() => onPress?.(id)}
      disabled={isEditMode || isBlocked}
    >
      {/* 프로필 이미지 */}
      <View className="h-[184px] overflow-hidden rounded-lg">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="h-full w-full"
            resizeMode="cover"
            blurRadius={isBlocked ? 20 : 0}
          />
        ) : (
          <View className="h-full w-full items-center justify-center bg-gray-200">
          </View>
        )}
        {isBlocked && (
          <View className="absolute w-full h-full items-center justify-center bg-black/40 z-10 gap-2">
            <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
              <Path
                d="M34 32.5L9 7.5M17 17.4026C16.3776 18.0888 16 18.9901 16 19.9772C16 22.1268 17.7909 23.8694 20 23.8694C21.0186 23.8694 21.9482 23.499 22.6544 22.889M34.0647 23.8694C35.4417 21.808 36 20.1269 36 20.1269C36 20.1269 32.359 8.5 20 8.5C19.3062 8.5 18.6398 8.53665 18 8.60582M29 28.9157C26.7043 30.3802 23.7489 31.4159 20 31.3546C7.79487 31.155 4 20.1269 4 20.1269C4 20.1269 5.76309 14.4968 11 11.0722"
                stroke="white"
                strokeWidth={2.34375}
                strokeLinecap="round"
              />
            </Svg>
            <Text className="text-base font-medium text-white">
              차단된 프로필입니다
            </Text>
            {onUnblock && (
              <Pressable
                className="px-2 py-1 rounded-lg border border-[white] items-center justify-center mt-1"
                onPress={() => onUnblock(id)}
              >
                <Text className="text-sm text-white" style={{ lineHeight: 19.6 }}>
                  차단 해제
                </Text>
              </Pressable>
            )}
          </View>
        )}
        {isEditMode && (
          <View className="absolute left-2 top-2">
            <Checkbox
              checked={isSelected}
              onValueChange={() => onToggleSelect?.(id)}
            />
          </View>
        )}
      </View>

      {/* 카드 정보 */}
      <View className="mt-3 gap-2">
        {/* 코스믹 유형 태그 + 하트 */}
        <View className="flex-row items-center justify-between">
          {cosmicTypeLabel ? (
            <Tag
              label={cosmicTypeLabel}
              variant="outline"
              styleClass={{ root: 'rounded px-2 py-1' }}
            />
          ) : <View />}
          {!isBlocked && (
            <Pressable hitSlop={8} onPress={() => onToggleFavorite(id)}>
              <HeartIcon filled={isFavorited} />
            </Pressable>
          )}
        </View>

        {/* 이름 + 나이 */}
        <View className="flex-row items-center gap-1">
          <Text className="text-base font-medium text-text-black">
            {name}
          </Text>
          {age != null && (
            <Text className="text-base font-medium text-text-black">
              {age}세
            </Text>
          )}
        </View>

        {/* 지역 + 직업 */}
        {(location || job) && (
          <View className="flex-row items-start gap-1">
            {location && (
              <Text className="text-sm font-medium text-text-gray3">
                {location}
              </Text>
            )}
            {job && (
              <Text className="text-sm font-medium text-text-gray3" numberOfLines={1}>
                {job}
              </Text>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
}
