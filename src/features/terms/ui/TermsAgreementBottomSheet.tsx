import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef } from 'react';
import { Button, Checkbox, SafeBottomSheetModal } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';
import type { TermsType } from '@/entities/terms';
import useTermsQuery from '../api/useTermsQuery';
import useTermsAgreementMutation from '../api/useTermsAgreementMutation';
import { PRIVACY_URL, SERVICE_URL } from '../../../shared/constants';

/**
 * 약관 유형별 폴백 URL 매핑
 * - content_url이 null일 경우 사용되는 기본 링크
 */
const TERMS_FALLBACK_URL: Partial<Record<TermsType, string>> = {
  PRIVACY: PRIVACY_URL,
  SERVICE: SERVICE_URL,
};

interface Props {
  /** 동의 완료 시 호출되는 콜백 */
  onAgree: () => void;
  /** 바텀시트 외부 탭 시 호출되는 콜백 */
  onDismiss?: () => void;
}

/**
 * # TermsAgreementBottomSheet
 * ---
 * - 간단설명: 서비스 이용약관 동의를 위한 바텀시트 컴포넌트
 * - 제약사항 및 특이사항:
 *   - GET /terms API로 약관 목록을 동적 조회하여 렌더링
 *   - required: true인 항목 모두 체크 시 "동의 완료하기" 버튼 활성화
 *   - "이용약관에 모두 동의" 체크 시 전체 선택/해제
 *   - content_url이 있는 항목은 "보기" 클릭 시 외부 링크 이동
 *   - POST /terms/agreements API로 동의 처리 후 onAgree 콜백 호출
 *   - ref를 통해 open/close 제어
 * ---
 * @param onAgree 동의 완료 시 콜백
 * @param onDismiss 바텀시트 닫힘 시 콜백
 * ---
 * @example
 * const ref = useRef<BottomSheetHandle>(null);
 * <TermsAgreementBottomSheet ref={ref} onAgree={handleAgree} />
 */
const TermsAgreementBottomSheet = forwardRef<BottomSheetHandle, Props>(
  ({ onAgree, onDismiss }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);
    const [isOpen, setIsOpen] = useState(false);

    /** 약관 목록 조회 — 바텀시트 열릴 때만 fetch */
    const { data: termsData, isLoading, isError } = useTermsQuery(isOpen);
    const terms = useMemo(() => termsData?.terms ?? [], [termsData]);

    /** 동의 상태 관리: { SERVICE: false, PRIVACY: false, ... } */
    const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

    /** 약관 동의 mutation */
    const { mutateAsync: agreeTerms, isPending } = useTermsAgreementMutation();

    /** 필수 항목 모두 체크 여부 (버튼 활성화 조건) */
    const requiredTypes = terms.filter((t) => t.required).map((t) => t.type);
    const allRequiredChecked =
      requiredTypes.length > 0 && requiredTypes.every((type) => checkedMap[type]);

    /** 전체 항목 체크 여부 ("모두 동의" 체크박스 상태) */
    const allChecked =
      terms.length > 0 && terms.every((t) => checkedMap[t.type]);

    useImperativeHandle(ref, () => ({
      open: () => {
        setCheckedMap({});
        setIsOpen(true);
        modalRef.current?.present();
      },
      close: () => {
        setIsOpen(false);
        modalRef.current?.dismiss();
      },
    }));

    /** 전체 동의 토글 */
    const handleToggleAll = useCallback(
      (value: boolean) => {
        const next: Record<string, boolean> = {};
        terms.forEach((t) => {
          next[t.type] = value;
        });
        setCheckedMap(next);
      },
      [terms],
    );

    /** 개별 항목 토글 */
    const handleToggleItem = useCallback((type: TermsType, value: boolean) => {
      setCheckedMap((prev) => ({ ...prev, [type]: value }));
    }, []);

    /** content_url 외부 링크 열기 (없으면 폴백 URL 사용) */
    const handleViewContent = useCallback((type: TermsType, url: string | null) => {
      const targetUrl = url ?? TERMS_FALLBACK_URL[type];
      if (targetUrl) {
        Linking.openURL(targetUrl);
      } else {
        Alert.alert('링크가 존재하지 않습니다.')
      }
    }, []);

    /** 동의 완료 처리 — POST /terms/agreements 호출 후 onAgree 콜백 */
    const handleAgree = useCallback(async () => {
      const agreedTypes = terms
        .filter((t) => checkedMap[t.type])
        .map((t) => t.type);
      await agreeTerms({ agreed_types: agreedTypes });
      setIsOpen(false);
      modalRef.current?.dismiss();
      onAgree();
    }, [terms, checkedMap, agreeTerms, onAgree]);

    /** 바텀시트 닫힘 처리 */
    const handleDismiss = useCallback(() => {
      setIsOpen(false);
      onDismiss?.();
    }, [onDismiss]);

    return (
      <SafeBottomSheetModal
        ref={modalRef}
        onDismiss={handleDismiss}
      >
        {/* 헤더: X 닫기 버튼 */}
        <View className="flex-row justify-end px-5 pt-1 pb-1">
          <Pressable
            onPress={() => modalRef.current?.dismiss()}
            hitSlop={8}
            accessibilityLabel="닫기"
          >
            <Text className="text-2xl text-gray-400">✕</Text>
          </Pressable>
        </View>

        {/* 타이틀 */}
        <View className="px-5 pb-4">
          <Text className="text-xl font-bold text-gray-900 leading-7">
            {'서비스 이용을 위해\n이용약관 동의가 필요해요'}
          </Text>
        </View>

        {/* 약관 항목 목록 */}
        <View className="px-5 gap-2">
          {isLoading ? (
            <View className="py-8 items-center">
              <ActivityIndicator />
            </View>
          ) : isError ? (
            <View className="py-4">
              <Text className="text-sm text-red-500">
                약관 정보를 불러오지 못했습니다.
              </Text>
            </View>
          ) : (
            terms.map((item) => (
              <View
                key={item.type}
                className="flex-row items-center justify-between rounded-xl border border-gray-200 px-4 py-3.5"
              >
                <View className="flex-1 flex-shrink">
                  <Checkbox
                    checked={!!checkedMap[item.type]}
                    onValueChange={(v) => handleToggleItem(item.type, v)}
                    label={`[${item.required ? '필수' : '선택'}] ${item.label}`}
                  />
                </View>
                {item.type !== 'AGE_OVER_14' && (
                  <Pressable
                    onPress={() => handleViewContent(item.type, item.content_url)}
                    hitSlop={8}
                  >
                    <Text className={`text-sm underline ${item.content_url ? 'text-gray-400' : 'text-gray-300'}`}>보기</Text>
                  </Pressable>
                )}
              </View>
            ))
          )}
        </View>

        {/* 이용약관에 모두 동의 */}
        <View className="px-5 pt-4 pb-2">
          <Checkbox
            checked={allChecked}
            onValueChange={handleToggleAll}
            label="이용약관에 모두 동의"
            className="py-1"
          />
        </View>

        {/* 동의 완료하기 CTA */}
        <View className="px-5 pt-3">
          <Button
            title="동의 완료하기"
            disabled={!allRequiredChecked || isPending}
            onPress={handleAgree}
          />
        </View>
      </SafeBottomSheetModal>
    );
  },
);

TermsAgreementBottomSheet.displayName = 'TermsAgreementBottomSheet';

export default TermsAgreementBottomSheet;
