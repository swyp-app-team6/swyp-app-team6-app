import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Badge, BottomCTA, Button } from '@/shared/ui';
import { useProfileDataStore } from '@/entities/user';
import { INTEREST_OPTIONS, REGION_OPTIONS } from '../model/types';
import { TMI_QUESTIONS } from '../model/tmiData';

/** 탭 목록 */
const TABS = ['기본정보', '관심사', '자기소개', '유형테스트', '나만의 TMI'] as const;
type TabType = (typeof TABS)[number];

interface Props {
  /** 등록 완료 버튼 콜백 */
  onSubmit: () => void;
  /** API 호출 중 로딩 상태 */
  loading?: boolean;
}

/**
 * # MyProfileView
 * ---
 * - 간단설명: 프로필 등록 최종 미리보기 화면 (Figma 디자인 시안 기반)
 * - 제약사항 및 특이사항:
 *   - 상단 프로필 카드: 이미지 + 그라디언트 오버레이 + 유형 배지 + 이름/나이 + 관심사 태그
 *   - 탭 바: 기본정보, 관심사, 자기소개, 유형테스트, 나만의 TMI
 *   - 모든 정보 섹션을 세로로 나열하여 스크롤 가능
 *   - 하단 "등록 완료하기" CTA 버튼
 *   - useProfileDataStore에서 프로필 데이터를 읽어 표시
 * ---
 * @param onSubmit 등록 완료 버튼 콜백
 * @param loading API 호출 중 로딩 상태
 * ---
 * @example
 * <MyProfileView onSubmit={handleSubmit} loading={false} />
 */
export default function MyProfileView({ onSubmit, loading }: Props) {
  const { data: form } = useProfileDataStore();
  const [activeTab, setActiveTab] = useState<TabType>('기본정보');
  const scrollRef = useRef<ScrollView>(null);

  /** Interest 값을 한국어 라벨로 변환 */
  const getInterestLabel = (value: string) => {
    return INTEREST_OPTIONS.find((o) => o.value === value)?.label ?? value;
  };

  /** 지역 라벨 조합 (시/도 + 구/군) */
  const getRegionLabel = () => {
    const regionLabel =
      REGION_OPTIONS.find((r) => r.value === form.region)?.label ?? '';
    if (form.subArea) {
      return `${regionLabel} ${form.subArea}`;
    }
    return regionLabel || '-';
  };

  /** TMI 질문 텍스트 가져오기 */
  const getQuestionText = (questionId: string) => {
    return TMI_QUESTIONS.find((q) => q.id === questionId)?.question ?? '';
  };

  return (
    <View className="flex-1">
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* ── 프로필 카드 ── */}
        <View className="items-center pt-6 pb-4">
          <ProfileCard />
        </View>

        {/* ── 탭 바 ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          className="py-6"
        >
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                className={`text-base ${
                  activeTab === tab
                    ? 'font-semibold text-primary'
                    : 'font-medium text-text-gray4'
                }`}
                style={{ lineHeight: 22.4 }}
              >
                {tab}
              </Text>
              {activeTab === tab && (
                <View className="h-0.5 bg-primary mt-1 rounded-full" />
              )}
            </Pressable>
          ))}
        </ScrollView>

        {/* ── 정보 섹션 ── */}
        <View className="px-5 pb-6 gap-5">
          {/* 기본정보 */}
          {activeTab === '기본정보' && (
            <InfoCard title="기본정보">
              <View className="gap-3">
                <InfoRow label="나이" value={form.age ? `${form.age}세` : '-'} />
                <InfoRow label="지역" value={getRegionLabel()} />
                <InfoRow label="직업/직장" value={form.jobField || '-'} />
              </View>
            </InfoCard>
          )}

          {/* 관심사 */}
          {activeTab === '관심사' && (
            <InfoCard title="관심사">
              {form.interests.length > 0 ? (
                <View className="gap-2">
                  <View className="flex-row flex-wrap gap-1">
                    {form.interests.map((interest) => (
                      <View
                        key={interest}
                        className="rounded px-2 py-1 border border-primary overflow-hidden"
                      >
                        <Text
                          className="text-sm font-medium text-primary"
                          style={{ lineHeight: 16.8 }}
                        >
                          {getInterestLabel(interest)}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : (
                <Text className="text-sm text-text-gray4">
                  등록된 관심사가 없습니다
                </Text>
              )}
            </InfoCard>
          )}

          {/* 자기소개 */}
          {activeTab === '자기소개' && (
            <InfoCard title="자기소개">
              <Text
                className="text-sm font-medium text-text-black"
                style={{ lineHeight: 19.6 }}
              >
                {form.bio || '등록된 자기소개가 없습니다'}
              </Text>
            </InfoCard>
          )}

          {/* 코스믹 유형 테스트 */}
          {activeTab === '유형테스트' && (
            <InfoCard title="코스믹 유형 테스트" centered>
              <View className="items-center pt-4 gap-4">
                {/* 유형 이미지 영역 */}
                <View className="w-40 h-40 items-center justify-center overflow-hidden">
                  <Text className="text-6xl">🔮</Text>
                </View>
                <View className="items-center gap-2">
                  <Text
                    className="text-lg font-bold text-text-black text-center"
                    style={{ lineHeight: 25.2 }}
                  >
                    슈팅스타 유형
                  </Text>
                  <Text
                    className="text-sm font-medium text-text-black text-center"
                    style={{ lineHeight: 19.6 }}
                  >
                    {'사랑이 시작되면\n누구보다 빠르게 빛나는 사람'}
                  </Text>
                </View>
              </View>
            </InfoCard>
          )}

          {/* 나만의 TMI */}
          {activeTab === '나만의 TMI' && (
            <InfoCard title="나만의 TMI">
              {form.tmiAnswers.length > 0 ? (
                <View className="gap-3">
                  {form.tmiAnswers.map((tmi) => (
                    <View key={tmi.questionId}>
                      <Text
                        className="text-sm font-medium text-text-gray4 mb-1"
                        style={{ lineHeight: 19.6 }}
                      >
                        {getQuestionText(tmi.questionId)}
                      </Text>
                      <Text
                        className="text-sm font-medium text-text-black"
                        style={{ lineHeight: 19.6 }}
                      >
                        {tmi.answer}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text className="text-sm text-text-gray4">
                  등록된 TMI가 없습니다
                </Text>
              )}
            </InfoCard>
          )}
        </View>

        {/* 하단 여백 (CTA 버튼 공간 확보) */}
        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title="등록 완료하기"
          onPress={onSubmit}
          loading={loading}
        />
      </BottomCTA>
    </View>
  );
}

/**
 * # ProfileCard
 * ---
 * - 간단설명: 프로필 미리보기 상단 이미지 카드 (284x392)
 * - 제약사항 및 특이사항:
 *   - 프로필 이미지가 카드 전체를 채움
 *   - 하단에 LinearGradient 오버레이로 이름/나이/관심사 표시
 *   - 좌상단에 유형 배지 표시
 *   - 배경색: #F5EDFF, 테두리: #EADCFF
 * ---
 * @example
 * <ProfileCard />
 */
function ProfileCard() {
  const { data: form } = useProfileDataStore();

  /** Interest 값을 한국어 라벨로 변환 */
  const getInterestLabel = (value: string) => {
    return INTEREST_OPTIONS.find((o) => o.value === value)?.label ?? value;
  };

  return (
    <View
      className="w-[284px] h-[392px] rounded-xl overflow-hidden"
      style={{
        backgroundColor: '#F5EDFF',
        borderWidth: 2,
        borderColor: '#EADCFF',
      }}
    >
      {/* 프로필 사진 */}
      {form.profileImageUri ? (
        <Image
          source={{ uri: form.profileImageUri }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <View className="absolute w-full h-full items-center justify-center">
          <Text className="text-6xl">👤</Text>
        </View>
      )}

      {/* 하단 그라디언트 오버레이 */}
      <LinearGradient
        colors={[
          'rgba(255,255,255,0)',
          'rgba(56,56,56,0.45)',
          'rgba(0,0,0,1)',
        ]}
        locations={[0, 0.29, 1]}
        className="absolute bottom-0 left-0 right-0 rounded-b-xl"
        style={{ height: 232 }}
      />

      {/* 좌상단 유형 배지 */}
      <View className="absolute top-5 left-5">
        <Badge level="star" />
      </View>

      {/* 하단 정보 (이름 + 나이 + 관심사 태그) */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-5 gap-2">
        {/* 이름 + 나이 */}
        <View className="flex-row items-end gap-1">
          <Text
            className="text-xl font-bold text-white"
            style={{ lineHeight: 28 }}
          >
            {form.nickname || '이름'}
          </Text>
          {form.age ? (
            <Text
              className="text-xl font-bold text-white"
              style={{ lineHeight: 28 }}
            >
              {form.age}세
            </Text>
          ) : null}
        </View>

        {/* 관심사 태그 */}
        {form.interests.length > 0 && (
          <View className="flex-row flex-wrap gap-1">
            {form.interests.map((interest) => (
              <View
                key={interest}
                className="rounded px-2 py-1 overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
              >
                <Text
                  className="text-sm font-medium text-white"
                  style={{ lineHeight: 16.8 }}
                >
                  {getInterestLabel(interest)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

/**
 * # InfoCard
 * ---
 * - 간단설명: 프로필 미리보기 정보 섹션 카드
 * - 제약사항 및 특이사항:
 *   - 흰색 배경, #E3E3E3 테두리, rounded-xl
 *   - centered prop으로 내용 중앙 정렬 가능
 * ---
 * @param title 섹션 제목
 * @param children 섹션 내용
 * @param centered 내용 중앙 정렬 여부
 */
function InfoCard({
  title,
  children,
  centered,
}: {
  title: string;
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <View
      className="bg-white rounded-xl px-5 py-7 overflow-hidden"
      style={{ borderWidth: 1, borderColor: '#E3E3E3' }}
    >
      <View className="gap-4">
        <Text
          className="text-base font-semibold text-text-black"
          style={{ lineHeight: 22.4 }}
        >
          {title}
        </Text>
        <View className={centered ? 'items-center' : undefined}>
          {children}
        </View>
      </View>
    </View>
  );
}

/**
 * # InfoRow
 * ---
 * - 간단설명: 기본정보 라벨-값 한 줄 표시
 * ---
 * @param label 라벨 텍스트
 * @param value 값 텍스트
 */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center gap-4">
      <Text
        className="text-sm font-medium text-text-gray4"
        style={{ width: 56, lineHeight: 19.6 }}
      >
        {label}
      </Text>
      <Text
        className="text-sm font-medium text-text-black flex-1"
        style={{ lineHeight: 19.6 }}
      >
        {value}
      </Text>
    </View>
  );
}
