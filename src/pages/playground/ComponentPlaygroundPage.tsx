import React, { useCallback, useRef, useState } from 'react';
import { Alert, RefreshControl, ScrollView, Text, View } from 'react-native';
import * as Sentry from '@sentry/react-native';
import {
  Accordion,
  AlertModal,
  Dialog,
  openDialog,
  Anim,
  Avatar,
  Badge,
  BottomCTA,
  Button,
  BottomSheet,
  CameraUploadZone,
  Card,
  Checkbox,
  ChipSelect,
  ChooseButton,
  FavTag,
  CameraIcon,
  GalleryIcon,
  Header,
  Input,
  Layout,
  MenuList,
  Modal,
  PlaygroundIcon,
  ProfileIcon,
  ProgressBar,
  QRIcon,
  LoginIcon,
  HomeIcon,
  CardIcon,
  MyPageIcon,
  SearchFallbackView,
  SearchIcon,
  SelectedTMIPreviewButton,
  SelectCard,
  Selectbox,
  Skeleton,
  KakaoLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
  KakaoIcon,
  GoogleIcon,
  AppleIcon,
  PopoverMenu,
  StepView,
  SwipeableCard,
  Tab,
  Tag,
  TextField,
  Textbox,
  TMICard,
  Toast,
  type BottomSheetHandle,
} from '@/shared/ui';

// ────────────────────────────────────────────────────────────────────────────────
// Sentry 에러 테스트
// ────────────────────────────────────────────────────────────────────────────────

/**
 * # SentryRenderErrorTrigger
 * ---
 * - 간단설명: `shouldThrow`가 true일 때 렌더 중 에러를 발생시켜 ErrorBoundary + Sentry 연동을 검증하는 컴포넌트
 * - 제약사항: 테스트 전용. 프로덕션 코드에서는 사용 금지
 * ---
 * @param shouldThrow true면 렌더 시 에러 throw
 */
function SentryRenderErrorTrigger({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('[Sentry 테스트] 고의적 렌더 에러 발생');
  }
  return null;
}

// ────────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────────

/**
 * # Section
 * ---
 * - 간단설명: 플레이그라운드 내 컴포넌트 구분용 섹션 래퍼
 * ---
 * @param title 섹션 제목
 * @param children 섹션 내부 컨텐츠
 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-8">
      <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
        {title}
      </Text>
      {children}
    </View>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────────

/**
 * # ComponentPlaygroundPage
 * ---
 * - 간단설명: 공용 UI 컴포넌트 전체를 한 화면에서 확인할 수 있는 플레이그라운드
 * ---
 * @example
 * <ComponentPlaygroundPage />
 */
export default function ComponentPlaygroundPage() {
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectValue, setSelectValue] = useState<string | undefined>();
  const [animType, setAnimType] = useState<'in' | 'out'>('in');
  const [refreshing, setRefreshing] = useState(false);
  const [throwRenderError, setThrowRenderError] = useState(false);
  const [cards, setCards] = useState([
    { id: '1', title: '첫 번째 카드', description: '오른쪽으로 스와이프해서 삭제하세요.' },
    { id: '2', title: '두 번째 카드', description: '카드 컴포넌트 예시입니다.' },
    { id: '3', title: '세 번째 카드', description: '삭제 버튼을 탭하면 사라집니다.' },
  ]);

  // StepView 상태
  const [step, setStep] = useState(0);

  // ChipSelect 상태
  const [chipSelected, setChipSelected] = useState<string[]>([]);

  // SelectCard 상태
  const [selectedCard, setSelectedCard] = useState('');

  // BottomSheet ref
  const bottomSheetRef = useRef<BottomSheetHandle>(null);

  // AlertModal 상태
  const [alertVisible, setAlertVisible] = useState(false);

  // Textbox 상태
  const [textboxValue, setTextboxValue] = useState('');

  // ProgressBar 상태
  const [progress, setProgress] = useState(40);

  // ChooseButton 상태
  const [chooseValue, setChooseValue] = useState('');

  // TMICard 상태
  const [selectedTMI, setSelectedTMI] = useState('');

  // FavTag 상태
  const [favTags, setFavTags] = useState<Record<string, boolean>>({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setChecked(false);
    setModalVisible(false);
    setSelectValue(undefined);
    setAnimType('in');
    setStep(0);
    setChipSelected([]);
    setSelectedCard('');
    setAlertVisible(false);
    setTextboxValue('');
    setProgress(40);
    setChooseValue('');
    setSelectedTMI('');
    setFavTags({});
    setCards([
      { id: '1', title: '첫 번째 카드', description: '오른쪽으로 스와이프해서 삭제하세요.' },
      { id: '2', title: '두 번째 카드', description: '카드 컴포넌트 예시입니다.' },
      { id: '3', title: '세 번째 카드', description: '삭제 버튼을 탭하면 사라집니다.' },
    ]);
    setRefreshing(false);
  }, []);

  return (
    <Toast.Provider>
      <Layout>
        <Header title="Components" showBack />
        <ScrollView
          className="flex-1 bg-white"
          contentContainerClassName="p-5 pb-20"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >

        {/* ── Color Palette ──────────────────────────────────────────────────── */}
        <Section title="Color Palette — 디자인 시스템 색상 토큰">
          <Text className="mb-2 text-xs text-text-gray4">Title color (그레이스케일)</Text>
          <View className="flex-row flex-wrap gap-3 mb-4">
            {[
              { name: 'black', cls: 'bg-text-black', hex: '#1A1A1A' },
              { name: 'gray2', cls: 'bg-text-gray2', hex: '#1B1B1B' },
              { name: 'gray3', cls: 'bg-text-gray3', hex: '#40403F' },
              { name: 'gray4', cls: 'bg-text-gray4', hex: '#888888' },
              { name: 'gray5', cls: 'bg-text-gray5', hex: '#BFBFBF' },
              { name: 'gray6', cls: 'bg-text-gray6', hex: '#E3E3E3' },
              { name: 'gray7', cls: 'bg-text-gray7', hex: '#F5F5F5' },
            ].map(c => (
              <View key={c.name} className="items-center gap-1">
                <View className={`${c.cls} h-12 w-12 rounded-lg border border-text-gray6`} />
                <Text className="text-[10px] text-text-gray4">{c.name}</Text>
                <Text className="text-[9px] text-text-gray5">{c.hex}</Text>
              </View>
            ))}
          </View>

          <Text className="mb-2 text-xs text-text-gray4">Primary color (퍼플)</Text>
          <View className="flex-row flex-wrap gap-3 mb-4">
            {[
              { name: 'DEFAULT', cls: 'bg-primary', hex: '#8C39FB' },
              { name: 'light', cls: 'bg-primary-light', hex: '#EADCFF' },
              { name: 'lightest', cls: 'bg-primary-lightest', hex: '#F5EDFF' },
            ].map(c => (
              <View key={c.name} className="items-center gap-1">
                <View className={`${c.cls} h-12 w-12 rounded-lg border border-text-gray6`} />
                <Text className="text-[10px] text-text-gray4">{c.name}</Text>
                <Text className="text-[9px] text-text-gray5">{c.hex}</Text>
              </View>
            ))}
          </View>

          <Text className="mb-2 text-xs text-text-gray4">Secondary color (확정 아님)</Text>
          <View className="flex-row flex-wrap gap-3">
            {[
              { name: 'yellow', cls: 'bg-secondary-yellow', hex: '#FFCE07' },
              { name: 'pink', cls: 'bg-secondary-pink', hex: '#FF6CC2' },
            ].map(c => (
              <View key={c.name} className="items-center gap-1">
                <View className={`${c.cls} h-12 w-12 rounded-lg border border-text-gray6`} />
                <Text className="text-[10px] text-text-gray4">{c.name}</Text>
                <Text className="text-[9px] text-text-gray5">{c.hex}</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* ── Button ─────────────────────────────────────────────────────────── */}
        <Section title="Button — 공용 액션 버튼 (6가지 variant)">
          <View className="gap-2">
            <Button title="Primary" variant="primary" />
            <Button title="Secondary" variant="secondary" />
            <Button title="Ghost" variant="ghost" />
            <Button title="Black" variant="black" />
            <Button title="Outline" variant="outline" />
            <Button title="Dark Outline" variant="dark-outline" />
            <Button title="이미지 저장" variant="outline" icon={<Text>⬇</Text>} />
            <Button title="Loading" variant="primary" loading />
            <Button title="Disabled" variant="primary" disabled />
            <Text className="mt-2 text-xs text-text-gray4">Dual 레이아웃 (Button 2개)</Text>
            <View className="flex-row gap-3">
              <Button title="보조 버튼" variant="secondary" className="flex-1" />
              <Button title="메인 버튼" variant="primary" className="flex-1" />
            </View>
          </View>
        </Section>

        {/* ── Checkbox ───────────────────────────────────────────────────────── */}
        <Section title="Checkbox — 약관 동의 등 체크박스">
          <View className="gap-3">
            <Checkbox
              checked={checked}
              onValueChange={setChecked}
              label={checked ? '체크됨' : '체크 안됨'}
            />
            <Checkbox checked={true} onValueChange={() => {}} label="비활성(checked)" disabled />
            <Checkbox checked={false} onValueChange={() => {}} label="비활성(unchecked)" disabled />
          </View>
        </Section>

        {/* ── TextField ──────────────────────────────────────────────────────── */}
        <Section title="TextField — 라벨+에러 지원 단일행 입력">
          <View className="gap-3">
            <TextField label="기본 입력" placeholder="입력하세요" />
            <TextField label="에러 상태" placeholder="입력하세요" error="필수 항목입니다" />
            <TextField placeholder="라벨 없음" />
          </View>
        </Section>

        {/* ── Input ──────────────────────────────────────────────────────────── */}
        <Section title="Input — prefix/suffix 슬롯 + 라벨/카운터 인라인 입력">
          <View className="gap-3">
            <Input
              placeholder="검색어 입력 후 Enter"
              prefix={<SearchIcon size={18} color="#BFBFBF" />}
              onEnter={() => {}}
            />
            <Input
              label="이름"
              placeholder="프로필 이름을 입력해주세요"
              maxLength={10}
            />
            <Input
              label="에러 상태"
              placeholder="입력하세요"
              error="필수 항목입니다"
            />
          </View>
        </Section>

        {/* ── Textbox ────────────────────────────────────────────────────────── */}
        <Section title="Textbox — 멀티라인 텍스트 입력 (글자수 카운터)">
          <View className="gap-3">
            <Textbox
              label="자기소개"
              value={textboxValue}
              onChangeText={setTextboxValue}
              maxLength={200}
              placeholder="자기소개를 입력해주세요"
            />
            <Textbox
              label="에러 상태"
              placeholder="에러 예시"
              error="200자 이내로 입력해주세요"
              maxLength={200}
            />
          </View>
        </Section>

        {/* ── Selectbox ──────────────────────────────────────────────────────── */}
        <Section title="Selectbox — 드롭다운 옵션 선택">
          <Selectbox
            value={selectValue}
            onSelect={setSelectValue}
            placeholder="옵션을 선택하세요"
            options={[
              { label: '사과', value: 'apple' },
              { label: '바나나', value: 'banana' },
              { label: '체리', value: 'cherry' },
            ]}
          />
        </Section>

        {/* ── Modal ──────────────────────────────────────────────────────────── */}
        <Section title="Modal — 커스텀 컨텐츠 모달">
          <Button title="모달 열기" variant="secondary" onPress={() => setModalVisible(true)} />
          <Modal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            message={"사용할 수 없는 계정입니다. 아이디,\n비밀번호를 다시 확인해주시길 바랍니다."}
          >
            <Button className="w-full" title="확인" onPress={() => setModalVisible(false)} />
          </Modal>
        </Section>

        {/* ── AlertModal ─────────────────────────────────────────────────────── */}
        <Section title="AlertModal — 확인/취소 알림 팝업">
          <Button title="알림 모달 열기" variant="secondary" onPress={() => setAlertVisible(true)} />
          <AlertModal
            visible={alertVisible}
            title="삭제 확인"
            message="정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
            confirmText="삭제"
            cancelText="취소"
            onConfirm={() => {
              setAlertVisible(false);
              Alert.alert('삭제 완료', '항목이 삭제되었습니다.');
            }}
            onCancel={() => setAlertVisible(false)}
          />
        </Section>

        {/* ── Dialog ────────────────────────────────────────────────────────── */}
        <Section title="Dialog — 전역 alert/confirm 다이얼로그 (함수 호출)">
          <View className="gap-2">
            <Button
              title="Alert 다이얼로그"
              variant="secondary"
              onPress={() =>
                openDialog({
                  title: '알림',
                  message: '저장이 완료되었습니다.',
                })
              }
            />
            <Button
              title="Confirm 다이얼로그"
              variant="secondary"
              onPress={() =>
                openDialog({
                  type: 'confirm',
                  title: '삭제 확인',
                  message: '정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.',
                  okLabel: '삭제',
                  okVariant: 'secondary',
                  okFn: () => Alert.alert('삭제됨', '항목이 삭제되었습니다.'),
                })
              }
            />
          </View>
          <Dialog />
        </Section>

        {/* ── PopoverMenu ───────────────────────────────────────────────────── */}
        <Section title="PopoverMenu — 버튼 클릭 시 드롭다운 메뉴">
          <View className="flex-row gap-4">
            <PopoverMenu
              items={[
                { label: '수정', onPress: () => Alert.alert('수정') },
                { label: '공유', onPress: () => Alert.alert('공유') },
                { label: '삭제', onPress: () => Alert.alert('삭제'), destructive: true },
              ]}
            >
              <View className="rounded-lg border border-gray-300 px-4 py-2">
                <Text className="text-sm text-gray-700">⋮ 메뉴 (right)</Text>
              </View>
            </PopoverMenu>
            <PopoverMenu
              align="left"
              items={[
                { label: '프로필 보기', onPress: () => Alert.alert('프로필') },
                { label: '신고', onPress: () => Alert.alert('신고'), destructive: true },
              ]}
            >
              <View className="rounded-lg border border-gray-300 px-4 py-2">
                <Text className="text-sm text-gray-700">⋮ 메뉴 (left)</Text>
              </View>
            </PopoverMenu>
          </View>
        </Section>

        {/* ── BottomSheet ────────────────────────────────────────────────────── */}
        <Section title="BottomSheet — 하단 슬라이드업 시트">
          <Button
            title="바텀시트 열기"
            variant="secondary"
            onPress={() => bottomSheetRef.current?.open()}
          />
          <BottomSheet ref={bottomSheetRef} title="옵션 선택" onClose={() => {}}>
            <View className="gap-3 pb-4">
              <Text className="text-base text-gray-700">바텀시트 컨텐츠 영역입니다.</Text>
              <Button
                title="확인"
                variant="primary"
                onPress={() => bottomSheetRef.current?.close()}
              />
            </View>
          </BottomSheet>
        </Section>

        {/* ── StepView ───────────────────────────────────────────────────────── */}
        <Section title="StepView — 단계별 슬라이드 뷰 (회원가입 등)">
          <View className="flex-row gap-2 mb-3">
            <Button
              title="이전"
              variant="secondary"
              onPress={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
            />
            <Button
              title="다음"
              variant="secondary"
              onPress={() => setStep(s => Math.min(2, s + 1))}
              disabled={step === 2}
            />
            <Text className="self-center text-sm text-gray-500">현재: {step + 1}/3</Text>
          </View>
          <View className="h-24 rounded-xl overflow-hidden border border-gray-200">
            <StepView currentStep={step}>
              <StepView.Step>
                <View className="flex-1 items-center justify-center bg-blue-50">
                  <Text className="text-blue-800 font-semibold">1단계: 정보 입력</Text>
                </View>
              </StepView.Step>
              <StepView.Step>
                <View className="flex-1 items-center justify-center bg-green-50">
                  <Text className="text-green-800 font-semibold">2단계: 프로필 설정</Text>
                </View>
              </StepView.Step>
              <StepView.Step>
                <View className="flex-1 items-center justify-center bg-purple-50">
                  <Text className="text-purple-800 font-semibold">3단계: 완료</Text>
                </View>
              </StepView.Step>
            </StepView>
          </View>
        </Section>

        {/* ── ChipSelect ─────────────────────────────────────────────────────── */}
        <Section title="ChipSelect — 다중 선택 칩 (최대 N개)">
          <ChipSelect
            options={[
              { label: '운동', value: 'exercise' },
              { label: '독서', value: 'reading' },
              { label: '음악', value: 'music' },
              { label: '여행', value: 'travel' },
              { label: '요리', value: 'cooking' },
            ]}
            selected={chipSelected}
            onSelect={setChipSelected}
            max={3}
          />
          <Text className="mt-2 text-xs text-gray-400">
            선택: {chipSelected.length > 0 ? chipSelected.join(', ') : '없음'}
          </Text>
        </Section>

        {/* ── SelectCard ─────────────────────────────────────────────────────── */}
        <Section title="SelectCard — 카드형 단일 선택">
          <View className="gap-3">
            {['A', 'B', 'C'].map(option => (
              <SelectCard
                key={option}
                selected={selectedCard === option}
                onPress={() => setSelectedCard(option)}
              >
                <Text className="font-semibold text-gray-900">옵션 {option}</Text>
                <Text className="text-sm text-gray-500 mt-1">
                  옵션 {option}에 대한 설명입니다.
                </Text>
              </SelectCard>
            ))}
          </View>
        </Section>

        {/* ── Avatar ─────────────────────────────────────────────────────────── */}
        <Section title="Avatar — 프로필 이미지/이니셜 표시">
          <View className="flex-row items-center gap-4">
            <View className="items-center gap-1">
              <Avatar size={56} name="홍길동" />
              <Text className="text-xs text-gray-500">이니셜</Text>
            </View>
            <View className="items-center gap-1">
              <Avatar size={56} name="김철수" />
              <Text className="text-xs text-gray-500">이니셜</Text>
            </View>
            <View className="items-center gap-1">
              <Avatar size={56} />
              <Text className="text-xs text-gray-500">기본</Text>
            </View>
            <View className="items-center gap-1">
              <Avatar size={40} name="A" />
              <Text className="text-xs text-gray-500">작은 사이즈</Text>
            </View>
          </View>
        </Section>

        {/* ── Tab ────────────────────────────────────────────────────────────── */}
        <Section title="Tab — 탭 전환 (언더바 탭)">
          <View className="rounded-xl overflow-hidden border border-gray-200 bg-white">
            <Tab.Root defaultValue="tab1">
              <Tab.List>
                <Tab.Trigger value="tab1" label="프로필" />
                <Tab.Trigger value="tab2" label="활동" />
                <Tab.Trigger value="tab3" label="설정" />
              </Tab.List>
              <Tab.Content value="tab1">
                <View className="p-4">
                  <Text className="text-gray-700">프로필 탭 내용입니다.</Text>
                </View>
              </Tab.Content>
              <Tab.Content value="tab2">
                <View className="p-4">
                  <Text className="text-gray-700">활동 탭 내용입니다.</Text>
                </View>
              </Tab.Content>
              <Tab.Content value="tab3">
                <View className="p-4">
                  <Text className="text-gray-700">설정 탭 내용입니다.</Text>
                </View>
              </Tab.Content>
            </Tab.Root>
          </View>
        </Section>

        {/* ── MenuList ───────────────────────────────────────────────────────── */}
        <Section title="MenuList — 마이페이지 설정 메뉴 목록">
          <MenuList.Section title="계정">
            <MenuList.Item label="프로필 수정" onPress={() => {}} right={<Text className="text-gray-400">›</Text>} />
            <MenuList.Item label="비밀번호 변경" onPress={() => {}} right={<Text className="text-gray-400">›</Text>} />
            <MenuList.Item label="알림 설정" onPress={() => {}} right={<Text className="text-gray-400">›</Text>} showDivider={false} />
          </MenuList.Section>
          <MenuList.Section title="앱 정보">
            <MenuList.Item label="버전" right={<Text className="text-xs text-gray-400">1.0.0</Text>} />
            <MenuList.Item label="이용약관" onPress={() => {}} right={<Text className="text-gray-400">›</Text>} showDivider={false} />
          </MenuList.Section>
        </Section>

        {/* ── Accordion ──────────────────────────────────────────────────────── */}
        <Section title="Accordion — FAQ 접기/펼치기">
          <View className="rounded-xl overflow-hidden border border-gray-200 bg-white">
            <Accordion.Root>
              <Accordion.Item itemKey="faq1" title="자주 묻는 질문 1">
                <Text className="text-gray-600">
                  답변 내용 1입니다. 아코디언 컴포넌트는 접기/펼치기 UI를 제공합니다.
                </Text>
              </Accordion.Item>
              <Accordion.Item itemKey="faq2" title="자주 묻는 질문 2">
                <Text className="text-gray-600">
                  답변 내용 2입니다. multiple 옵션으로 동시에 여러 항목을 열 수 있습니다.
                </Text>
              </Accordion.Item>
              <Accordion.Item itemKey="faq3" title="자주 묻는 질문 3">
                <Text className="text-gray-600">
                  답변 내용 3입니다. 기본적으로 하나의 항목만 열립니다.
                </Text>
              </Accordion.Item>
            </Accordion.Root>
          </View>
        </Section>

        {/* ── BottomCTA ──────────────────────────────────────────────────────── */}
        <Section title="BottomCTA — 하단 고정 액션 버튼 영역">
          <View className="rounded-xl overflow-hidden border border-gray-200">
            <BottomCTA>
              <Button title="다음 단계로" variant="primary" onPress={() => {}} />
            </BottomCTA>
          </View>
        </Section>

        {/* ── Skeleton ───────────────────────────────────────────────────────── */}
        <Section title="Skeleton — 로딩 플레이스홀더">
          <Skeleton.Container styleClass={{ root: 'gap-3' }}>
            <Skeleton.Box styleClass={{ root: 'h-5 w-3/4' }} />
            <Skeleton.Box styleClass={{ root: 'h-5 w-full' }} />
            <View className="flex-row gap-3">
              <Skeleton.Circle styleClass={{ root: 'h-10 w-10' }} />
              <View className="flex-1 gap-2">
                <Skeleton.Box styleClass={{ root: 'h-4 w-2/3' }} />
                <Skeleton.Box styleClass={{ root: 'h-4 w-full' }} />
              </View>
            </View>
          </Skeleton.Container>
        </Section>

        {/* ── SearchFallbackView ─────────────────────────────────────────────── */}
        <Section title="SearchFallbackView — 검색 결과 없음 안내">
          <SearchFallbackView
            message="검색 결과가 없습니다"
            icon={<Text className="text-4xl">🔍</Text>}
            styleClass={{ root: 'py-8' }}
          />
        </Section>

        {/* ── Anim ───────────────────────────────────────────────────────────── */}
        <Section title="Anim — 페이드/스케일 등장 애니메이션">
          <View className="mb-3 flex-row gap-2">
            <Button
              title="Fade In"
              variant={animType === 'in' ? 'primary' : 'secondary'}
              onPress={() => setAnimType('in')}
            />
            <Button
              title="Fade Out"
              variant={animType === 'out' ? 'primary' : 'secondary'}
              onPress={() => setAnimType('out')}
            />
          </View>
          <Anim.Fade type={animType} direction="up" styleClass={{ root: 'mb-3' }}>
            <View className="rounded-lg bg-blue-100 p-4">
              <Text className="text-blue-800">Anim.Fade (direction: up)</Text>
            </View>
          </Anim.Fade>
          <Anim.ScaleFade type={animType}>
            <View className="rounded-lg bg-green-100 p-4">
              <Text className="text-green-800">Anim.ScaleFade</Text>
            </View>
          </Anim.ScaleFade>
        </Section>

        {/* ── Card ───────────────────────────────────────────────────────────── */}
        <Section title="Card / SwipeableCard — 카드 컨테이너 (스와이프 삭제)">
          <Card styleClass={{ root: 'mb-3' }}>
            <Text className="font-semibold text-gray-900">기본 카드</Text>
            <Text className="text-sm text-gray-500 mt-1">rounded card 컴포넌트입니다.</Text>
          </Card>
          <View className="gap-2">
            {cards.map((card) => (
              <SwipeableCard
                key={card.id}
                onDelete={() => setCards((prev) => prev.filter((c) => c.id !== card.id))}
              >
                <Text className="font-semibold text-gray-900">{card.title}</Text>
                <Text className="text-sm text-gray-500 mt-1">{card.description}</Text>
              </SwipeableCard>
            ))}
            {cards.length === 0 && (
              <Text className="text-center text-gray-400 text-sm py-4">모든 카드가 삭제되었습니다.</Text>
            )}
          </View>
        </Section>

        {/* ── ProgressBar ──────────────────────────────────────────────────── */}
        <Section title="ProgressBar — 진행률 표시 바">
          <View className="gap-4">
            <ProgressBar value={progress} />
            <View className="flex-row gap-2">
              <Button title="0%" variant="secondary" onPress={() => setProgress(0)} />
              <Button title="50%" variant="secondary" onPress={() => setProgress(50)} />
              <Button title="100%" variant="secondary" onPress={() => setProgress(100)} />
            </View>
            <Text className="text-xs text-text-gray4">Steps (5단계)</Text>
            <ProgressBar value={progress} steps={5} />
          </View>
        </Section>

        {/* ── Tag ────────────────────────────────────────────────────────────── */}
        <Section title="Tag — 소형 라벨 태그 (5가지 variant)">
          <View className="flex-row flex-wrap gap-2">
            <Tag label="Q1" />
            <Tag label="연애" variant="primary" />
            <Tag label="정보" variant="primary-subtle" />
            <Tag label="성격" variant="secondary" />
            <Tag label="관심사" variant="outline" />
          </View>
        </Section>

        {/* ── FavTag ─────────────────────────────────────────────────────────── */}
        <Section title="FavTag — 관심사/취미 선택 토글 태그">
          <View className="flex-row flex-wrap gap-2">
            {[
              { emoji: '🇺🇸', label: '외국어', key: 'lang' },
              { emoji: '⛺', label: '캠핑 / 드라이브', key: 'camp' },
              { emoji: '🎵', label: '음악', key: 'music' },
              { emoji: '📚', label: '독서', key: 'book' },
            ].map(tag => (
              <FavTag
                key={tag.key}
                emoji={tag.emoji}
                label={tag.label}
                selected={!!favTags[tag.key]}
                onPress={() => setFavTags(prev => ({ ...prev, [tag.key]: !prev[tag.key] }))}
              />
            ))}
          </View>
        </Section>

        {/* ── Badge ──────────────────────────────────────────────────────────── */}
        <Section title="Badge — 등급/유형 표시 그라디언트 뱃지">
          <View className="flex-row flex-wrap gap-2">
            <Badge level="star" />
            <Badge level="galaxy" />
            <Badge level="solar" />
            <Badge level="luna" />
          </View>
        </Section>

        {/* ── TMICard ────────────────────────────────────────────────────────── */}
        <Section title="TMICard — TMI 질문/답변 카드">
          <View className="gap-3">
            <TMICard
              tag="Q1"
              question="나는 연애할 때 이런 모습이다"
              selected={selectedTMI === '1'}
              onPress={() => setSelectedTMI('1')}
            />
            <TMICard
              tag="Q2"
              question="내가 가장 자주 듣는 말은?"
              answer="너는 진짜 착한 것 같아!"
              selected={selectedTMI === '2'}
              onPress={() => setSelectedTMI('2')}
            />
          </View>
        </Section>

        {/* ── ChooseButton ───────────────────────────────────────────────────── */}
        <Section title="ChooseButton — 2지선다 선택 버튼">
          <View className="gap-2">
            <ChooseButton
              label="적극적으로 다가가는 편"
              selected={chooseValue === 'A'}
              onPress={() => setChooseValue('A')}
            />
            <ChooseButton
              label="자연스럽게 친해지는 편"
              selected={chooseValue === 'B'}
              onPress={() => setChooseValue('B')}
            />
          </View>
        </Section>

        {/* ── 소셜 로그인 버튼 ──────────────────────────────────────────────── */}
        <Section title="소셜 로그인 — 카카오/구글/애플 로그인 버튼">
          <View className="gap-2">
            <KakaoLoginButton onPress={() => {}} />
            <GoogleLoginButton onPress={() => {}} />
            <AppleLoginButton onPress={() => {}} />
          </View>
        </Section>

        {/* ── Sentry 에러 테스트 ────────────────────────────────────────────── */}
        <Section title="Sentry — 에러 리포팅 연동 테스트 (개발용)">
          <View className="gap-3">
            <Button
              title="captureException 전송"
              variant="secondary"
              onPress={() => {
                const error = new Error('[Sentry 테스트] 수동 captureException 호출');
                Sentry.captureException(error);
                Alert.alert('Sentry 테스트', 'Sentry에 에러를 전송했습니다.\nSentry 대시보드에서 확인하세요.');
              }}
            />
            <Button
              title="렌더 에러 발생 (ErrorBoundary)"
              variant="secondary"
              onPress={() => setThrowRenderError(true)}
            />
            <SentryRenderErrorTrigger shouldThrow={throwRenderError} />
          </View>
        </Section>

        {/* ── CameraUploadZone ──────────────────────────────────────────────── */}
        <Section title="CameraUploadZone — 프로필 사진 촬영/업로드 영역">
          <View className="flex-row gap-3">
            <CameraUploadZone onPress={() => Alert.alert('카메라', '이미지 선택')} />
            <CameraUploadZone
              imageUri="https://picsum.photos/120/148"
              onPress={() => Alert.alert('카메라', '이미지 변경')}
            />
          </View>
        </Section>

        {/* ── SelectedTMIPreviewButton ─────────────────────────────────────── */}
        <Section title="SelectedTMIPreviewButton — 선택 TMI 미리보기 버튼">
          <View className="gap-3">
            <SelectedTMIPreviewButton count={2} onPress={() => Alert.alert('미리보기')} />
            <SelectedTMIPreviewButton count={5} onPress={() => {}} />
          </View>
        </Section>

        {/* ── Icons ──────────────────────────────────────────────────────────── */}
        <Section title="Icons — SVG 아이콘 모음">
          <View className="flex-row flex-wrap gap-6">
            {[
              { label: 'CameraIcon', node: <CameraIcon size={28} color="#374151" /> },
              { label: 'ProfileIcon', node: <ProfileIcon size={28} color="#374151" /> },
              { label: 'GalleryIcon', node: <GalleryIcon size={28} color="#374151" /> },
              { label: 'PlaygroundIcon', node: <PlaygroundIcon size={28} color="#374151" /> },
              { label: 'SearchIcon', node: <SearchIcon size={28} color="#374151" /> },
              { label: 'QRIcon', node: <QRIcon size={28} color="#374151" /> },
              { label: 'LoginIcon', node: <LoginIcon size={28} color="#374151" /> },
              { label: 'HomeIcon', node: <HomeIcon size={28} color="#374151" /> },
              { label: 'CardIcon', node: <CardIcon size={28} color="#374151" /> },
              { label: 'MyPageIcon', node: <MyPageIcon size={28} color="#374151" /> },
              { label: 'KakaoIcon', node: <KakaoIcon size={28} color="#374151" /> },
              { label: 'GoogleIcon', node: <GoogleIcon size={28} /> },
              { label: 'AppleIcon', node: <AppleIcon size={28} color="#374151" /> },
            ].map(({ label, node }) => (
              <View key={label} className="items-center gap-1.5">
                {node}
                <Text className="text-xs text-gray-500">{label}</Text>
              </View>
            ))}
          </View>
        </Section>
        </ScrollView>
      </Layout>
    </Toast.Provider>
  );
}
