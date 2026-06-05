import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Anim,
  Button,
  Card,
  Checkbox,
  GalleryIcon,
  Header,
  Input,
  Layout,
  Modal,
  PlaygroundIcon,
  Popover,
  ProfileIcon,
  SearchFallbackView,
  SearchIcon,
  Selectbox,
  Skeleton,
  SwipeableCard,
  TextField,
  Toast,
  TodoIcon,
} from '@/shared/ui';

const ACTIVE_COLOR = '#3b82f6';
const INACTIVE_COLOR = '#9ca3af';

const NAV_ITEMS = [
  { name: 'Todo123', label: 'Todo', icon: (active: boolean) => <TodoIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'Profile', label: '프로필', icon: (active: boolean) => <ProfileIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'Gallery', label: '갤러리', icon: (active: boolean) => <GalleryIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'Playground', label: 'UI', icon: (active: boolean) => <PlaygroundIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
];

// ────────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────────

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

export default function ComponentPlaygroundPage() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectValue, setSelectValue] = useState<string | undefined>();
  const [animType, setAnimType] = useState<'in' | 'out'>('in');
  const [refreshing, setRefreshing] = useState(false);
  const [cards, setCards] = useState([
    { id: '1', title: '첫 번째 카드', description: '오른쪽으로 스와이프해서 삭제하세요.' },
    { id: '2', title: '두 번째 카드', description: '카드 컴포넌트 예시입니다.' },
    { id: '3', title: '세 번째 카드', description: '삭제 버튼을 탭하면 사라집니다.' },
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setChecked(false);
    setModalVisible(false);
    setSelectValue(undefined);
    setAnimType('in');
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
          className="flex-1 bg-gray-50"
          contentContainerClassName="p-5 pb-20"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >

        {/* ── Button ─────────────────────────────────────────────────────────── */}
        <Section title="Button">
          <View className="gap-2">
            <Button title="Primary" variant="primary" />
            <Button title="Secondary" variant="secondary" />
            <Button title="Ghost" variant="ghost" />
            <Button title="Loading" variant="primary" loading />
            <Button title="Disabled" variant="primary" disabled />
          </View>
        </Section>

        {/* ── Checkbox ───────────────────────────────────────────────────────── */}
        <Section title="Checkbox">
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
        <Section title="TextField">
          <View className="gap-3">
            <TextField label="기본 입력" placeholder="입력하세요" />
            <TextField label="에러 상태" placeholder="입력하세요" error="필수 항목입니다" />
            <TextField placeholder="라벨 없음" />
          </View>
        </Section>

        {/* ── Input ──────────────────────────────────────────────────────────── */}
        <Section title="Input (prefix / suffix)">
          <Input
            placeholder="검색어 입력 후 Enter"
            prefix={<SearchIcon size={18} color="#9ca3af" />}
            suffix={<Text className="text-blue-500 text-xs">검색</Text>}
            onEnter={() => {}}
            styleClass={{
              root: 'rounded-lg border border-gray-300 bg-white px-2',
              input: 'py-2 text-sm text-gray-900',
            }}
          />
        </Section>

        {/* ── Layout ─────────────────────────────────────────────────────────── */}
        <Section title="Layout (Header / Body / Footer)">
          <Layout styleClass={{ root: 'h-40 rounded-xl overflow-hidden border border-gray-200' }}>
            <Layout.Header styleClass={{ root: 'bg-blue-500 px-3 py-2' }}>
              <Text className="font-semibold text-white">Header</Text>
            </Layout.Header>
            <Layout.Body styleClass={{ root: 'bg-white px-3 py-2' }}>
              <Text className="text-gray-700">Body (flex-1)</Text>
            </Layout.Body>
            <Layout.Footer styleClass={{ root: 'bg-gray-100 px-3 py-2' }}>
              <Text className="text-xs text-gray-500">Footer</Text>
            </Layout.Footer>
          </Layout>
        </Section>

        {/* ── Selectbox ──────────────────────────────────────────────────────── */}
        <Section title="Selectbox">
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

        {/* ── Popover ────────────────────────────────────────────────────────── */}
        <Section title="Popover">
          <Popover.Root>
            <Popover.Trigger>
              <Button title="팝오버 열기" variant="secondary" />
            </Popover.Trigger>
            <Popover.Content styleClass={{ content: 'bg-white' }}>
              <Text className="mb-2 font-semibold text-gray-900">팝오버 제목</Text>
              <Text className="text-sm text-gray-600">
                배경을 탭하면 닫힙니다.
              </Text>
            </Popover.Content>
          </Popover.Root>
        </Section>

        {/* ── Modal ──────────────────────────────────────────────────────────── */}
        <Section title="Modal">
          <Button title="모달 열기" variant="secondary" onPress={() => setModalVisible(true)} />
          <Modal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="모달 제목"
          >
            <Text className="text-gray-700">모달 본문입니다.</Text>
            <View className="mt-4">
              <Button title="닫기" variant="ghost" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>
        </Section>

        {/* ── Skeleton ───────────────────────────────────────────────────────── */}
        <Section title="Skeleton">
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
        <Section title="SearchFallbackView">
          <SearchFallbackView
            message="검색 결과가 없습니다"
            icon={<Text className="text-4xl">🔍</Text>}
            styleClass={{ root: 'py-8' }}
          />
        </Section>

        {/* ── Anim ───────────────────────────────────────────────────────────── */}
        <Section title="Anim (Fade / ScaleFade)">
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
        <Section title="Card (swipe to delete)">
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

        {/* ── Icons ──────────────────────────────────────────────────────────── */}
        <Section title="Icons (SVG)">
          <View className="flex-row flex-wrap gap-6">
            {[
              { label: 'TodoIcon', node: <TodoIcon size={28} color="#374151" /> },
              { label: 'ProfileIcon', node: <ProfileIcon size={28} color="#374151" /> },
              { label: 'GalleryIcon', node: <GalleryIcon size={28} color="#374151" /> },
              { label: 'PlaygroundIcon', node: <PlaygroundIcon size={28} color="#374151" /> },
              { label: 'SearchIcon', node: <SearchIcon size={28} color="#374151" /> },
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
