import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { BottomCTA, Button } from '@/shared/ui';
import useRegisterFormStore from '../model/useRegisterFormStore';
import { INTEREST_OPTIONS } from '../model/types';
import { TMI_QUESTIONS } from '../model/tmiData';
import ProfilePreviewCard from './ProfilePreviewCard';

/** 탭 목록 */
const TABS = ['기본정보', '관심사', '자기소개', '유형테스트', '나만의 TMI'] as const;
type TabType = typeof TABS[number];

interface Props {
  /** 등록 완료 버튼 콜백 */
  onSubmit: () => void;
  /** API 호출 중 로딩 상태 */
  loading?: boolean;
}

/**
 * # Step5PreviewView
 * ---
 * - 간단설명: 프로필 등록 마지막 단계 - 미리보기 (Figma 디자인 시안 기반)
 * - 제약사항 및 특이사항:
 *   - 프로필 카드 + 탭 메뉴 + 정보 섹션 구성
 *   - 탭: 기본정보, 관심사, 자기소개, 유형테스트, 나만의 TMI
 *   - 각 섹션은 흰색 카드(border #d2d2d2, rounded-xl) 내부에 표시
 *   - "프로필 등록 완료하기" CTA 버튼
 * ---
 * @param onSubmit 등록 완료 버튼 콜백
 * @param loading API 호출 중 로딩 상태
 * @example
 * <Step5PreviewView onSubmit={handleSubmit} loading={false} />
 */
export default function Step5PreviewView({ onSubmit, loading }: Props) {
  const { form } = useRegisterFormStore();
  const [activeTab, setActiveTab] = useState<TabType>('기본정보');
  const scrollRef = useRef<ScrollView>(null);

  /** Interest 값을 한국어 라벨로 변환 */
  const getInterestLabel = (value: string) => {
    return INTEREST_OPTIONS.find((o) => o.value === value)?.label ?? value;
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
        {/* 프로필 카드 */}
        <View className="items-center pt-6 pb-4">
          <ProfilePreviewCard />
        </View>

        {/* 탭 바 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="border-b border-gray-100"
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        >
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="py-3"
            >
              <Text
                className={`text-base font-semibold ${
                  activeTab === tab ? 'text-primary' : 'text-text-gray4'
                }`}
                style={{ letterSpacing: -0.4 }}
              >
                {tab}
              </Text>
              {activeTab === tab && (
                <View className="h-0.5 bg-primary mt-1 rounded-full" />
              )}
            </Pressable>
          ))}
        </ScrollView>

        {/* 정보 섹션 */}
        <View className="px-5 pt-6 pb-6 gap-6">
          {/* 기본정보 */}
          {activeTab === '기본정보' && (
            <InfoCard title="기본정보">
              <InfoRow label="이름" value={form.nickname || '-'} />
              <InfoRow label="성별" value={form.gender === 'M' ? '남성' : form.gender === 'F' ? '여성' : '-'} />
            </InfoCard>
          )}

          {/* 관심사 */}
          {activeTab === '관심사' && (
            <InfoCard title="관심사 키워드">
              <View className="flex-row flex-wrap gap-1">
                {form.interests.length > 0 ? (
                  form.interests.map((interest) => (
                    <View
                      key={interest}
                      className="rounded-full px-2"
                      style={{ backgroundColor: 'rgba(120,50,213,0.1)' }}
                    >
                      <Text
                        className="text-sm font-medium text-primary"
                        style={{ letterSpacing: -0.4, lineHeight: 22.4 }}
                      >
                        {getInterestLabel(interest)}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-sm text-text-gray4">등록된 관심사가 없습니다</Text>
                )}
              </View>
            </InfoCard>
          )}

          {/* 자기소개 */}
          {activeTab === '자기소개' && (
            <InfoCard title="자기소개">
              <Text
                className="text-[15px] font-medium text-text-gray4"
                style={{ letterSpacing: -0.15, lineHeight: 22.5 }}
              >
                {form.bio || '등록된 자기소개가 없습니다'}
              </Text>
            </InfoCard>
          )}

          {/* 유형테스트 */}
          {activeTab === '유형테스트' && (
            <InfoCard title="유형테스트">
              <Text className="text-sm text-text-gray4">
                아직 유형 테스트를 완료하지 않았습니다
              </Text>
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
                        style={{ letterSpacing: -0.4 }}
                      >
                        {getQuestionText(tmi.questionId)}
                      </Text>
                      <Text
                        className="text-[15px] font-medium text-text-gray2"
                        style={{ letterSpacing: -0.15 }}
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

        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title="프로필 등록 완료하기"
          onPress={onSubmit}
          loading={loading}
        />
      </BottomCTA>
    </View>
  );
}

/**
 * # InfoCard
 * ---
 * - 간단설명: 프로필 미리보기 정보 섹션 카드
 * ---
 * @param title 섹션 제목
 * @param children 섹션 내용
 */
function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="bg-white border border-text-gray6 rounded-xl px-6 py-8">
      <Text
        className="text-base font-semibold text-black mb-4"
        style={{ letterSpacing: -0.4 }}
      >
        {title}
      </Text>
      {children}
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
    <View className="flex-row items-center gap-4 mb-3">
      <Text
        className="text-sm font-medium text-text-gray4 w-14"
        style={{ letterSpacing: -0.4 }}
      >
        {label}
      </Text>
      <Text
        className="text-sm font-medium text-text-gray2 flex-1"
        style={{ letterSpacing: -0.4 }}
      >
        {value}
      </Text>
    </View>
  );
}
