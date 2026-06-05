# RN-SCAFFOLD : react native 스캐폴딩 프로젝트

## 프로젝트 개요
- 기본 세팅 돌려쓰기 위한 프로젝트

## 기획

### 서비스 목적

FSD(Feature-Sliced Design) 아키텍처를 React Native 환경에서 실습하기 위한 학습용 Todo 서비스.

### 도메인 모델

```ts
interface Todo {
  id: string;          // 고유 식별자
  title: string;       // 제목
  description: string; // 설명
  completed: boolean;  // 완료 여부
}
```

### 기능 목록

| 기능 | 설명 | 구현 상태 |
|---|---|---|
| Todo 추가 | 제목과 설명을 입력해 새 Todo 생성 | 구현됨 |
| Todo 목록 조회 | 전체 Todo 목록 표시 | 구현됨 |
| Todo 완료 상태 변경 | 체크박스로 completed 토글 | 구현됨 |
| Todo 수정 | 제목/설명 수정 | 미구현 (features/todo/updateTodo) |
| Todo 삭제 | 특정 Todo 제거 | 미구현 (features/todo/deleteTodo) |

### 기능 상세

#### Todo 추가
- 입력 항목: `title`(제목), `description`(설명)
- 두 항목 모두 입력 후 추가 버튼 클릭
- `id`는 클라이언트에서 자동 생성, `completed`는 `false`로 초기화

#### Todo 완료 상태 변경
- 목록의 각 아이템에 체크박스 표시
- 체크박스 클릭 시 `completed` 값 토글
- 상태에 따라 아이템 시각적 구분

#### Todo 수정
- 기존 `title`, `description` 값을 수정
- `id`로 대상 Todo 식별

#### Todo 삭제
- `id`로 대상 Todo 식별 후 목록에서 제거

### 화면 구성

| 화면 | 경로 | 포함 요소 |
|---|---|---|
| Todo 메인 | `pages/todo/TodoPage` | Todo 입력 폼, Todo 목록 |

## 기술 스택

- **React Native** — 모바일 앱 프레임워크
- **TypeScript** — 타입 안전성
- **Zustand + Immer** — 전역 상태 관리 (`entities/*/model/`)
- **Axios** — HTTP 클라이언트 (`shared/api/`)
- **React Navigation (Native Stack)** — 화면 이동
- **NativeWind (Tailwind CSS)** — 스타일링
- **react-native-config** — 환경 변수 (`Config.API_URL`)

## 아키텍처: FSD (Feature-Sliced Design)

### 레이어 계층 및 import 방향

```
app → pages → widgets → features → entities → shared
```

- 상위 레이어는 하위 레이어만 import 가능
- **같은 레이어 내 슬라이스 간 import 금지**
- 모든 슬라이스는 `index.ts`(Public API)를 통해서만 외부에 노출

### 레이어별 역할

| 레이어 | 역할 | 예시 |
|---|---|---|
| `app/` | 앱 초기화, 라우터, providers | App.tsx, StackRouter.tsx |
| `pages/` | 화면 단위 컴포넌트 | TodoPage.tsx |
| `widgets/` | 여러 feature/entity를 조합한 UI 블록 | TodoList (목록 표시) |
| `features/` | 사용자 액션 단위 로직 + UI | createTodo, deleteTodo, updateTodo |
| `entities/` | 도메인 모델, API, 상태 | Todo 타입, todoStore, todo API |
| `shared/` | 도메인 없는 범용 코드 | HTTP 클라이언트, Button, TextField |

### 세그먼트 구조 (슬라이스 내부)

```
{layer}/{slice}/
├── ui/        — 컴포넌트
├── model/     — 상태, 스토어, 비즈니스 로직
├── api/       — API 호출 함수
├── lib/       — 유틸리티
├── types.ts   — 타입 정의
└── index.ts   — Public API (필수)
```

## 현재 구조 및 목표 구조

### 현재 (개선 전)

```
src/
├── app/
│   ├── api/          ← shared/api로 이동 필요
│   ├── lib/          ← shared/lib으로 이동 필요
│   ├── navigation/
│   ├── providers/
│   ├── App.tsx
│   └── StackRouter.tsx
├── entities/
│   └── todo/
│       ├── model/
│       │   └── todoStore.ts   ← Todo 타입 포함 (분리 필요)
│       └── type.ts            ← 비어 있음, index.ts 없음
├── features/
│   └── todo/
│       ├── createTodo/ui/     ← 비어 있음
│       ├── deleteTodo/ui/     ← 비어 있음
│       ├── updateTodo/ui/     ← 비어 있음
│       ├── enums.ts           ← entities/todo로 이동 필요
│       └── types.ts           ← entities/todo로 이동 필요
├── pages/
│   └── todo/TodoPage.tsx      ← index.ts 없음
├── shared/
│   ├── api/
│   │   └── todo/              ← entities/todo/api로 이동 필요
│   └── ui/
└── widgets/
    └── todos/
        ├── TodoInput.tsx      ← create 로직 포함, features로 이동 필요
        ├── TodoList.tsx
        └── TodoListItem.tsx   ← toggle 로직 포함, features로 이동 필요
```

### 목표 (개선 후)

```
src/
├── app/
│   ├── navigation/
│   ├── providers/
│   ├── App.tsx
│   └── StackRouter.tsx
├── entities/
│   └── todo/
│       ├── api/               ← todo API 함수
│       ├── model/
│       │   ├── todoStore.ts
│       │   └── types.ts       ← Todo 타입 분리
│       └── index.ts           ← Public API
├── features/
│   └── todo/
│       ├── createTodo/
│       │   ├── ui/TodoInput.tsx
│       │   └── index.ts
│       ├── deleteTodo/
│       │   ├── ui/
│       │   └── index.ts
│       └── updateTodo/
│           ├── ui/TodoListItem.tsx
│           └── index.ts
├── pages/
│   └── todo/
│       ├── TodoPage.tsx
│       └── index.ts
├── shared/
│   ├── api/
│   │   ├── client.ts
│   │   ├── interceptor.ts
│   │   └── index.ts
│   ├── lib/
│   └── ui/
│       ├── Button.tsx
│       ├── Checkbox.tsx
│       ├── TextField.tsx
│       └── index.ts
└── widgets/
    └── todos/
        ├── TodoList.tsx       ← feature UI 조합 역할만
        └── index.ts
```

## 개발 규칙

### Import 규칙

```ts
// 슬라이스 외부에서 접근 시 반드시 index.ts 경유
import { todoStore } from '@/entities/todo';       // ✅
import todoStore from '@/entities/todo/model/todoStore'; // ❌

// shared는 어디서든 접근 가능
import { Button } from '@/shared/ui';              // ✅
```

### 신규 슬라이스 생성 시 체크리스트

- [ ] `index.ts` 생성 후 외부에 공개할 것만 export
- [ ] 타입은 `types.ts` 또는 `model/types.ts`에 분리
- [ ] 도메인 API는 해당 entity의 `api/` 세그먼트에 작성
- [ ] `shared/`에 도메인 로직 포함 금지

### 상태 관리

- Zustand store는 `{entity}/model/` 에 위치
- store 파일에 타입 정의 혼재 금지 — `types.ts`에 분리

## 알려진 버그

### TodoListItem memo 비교 로직 반전

```ts
// widgets/todos/TodoListItem.tsx
// memo 두 번째 인자가 true → 리렌더 스킵
export default memo(TodoListItem, (prev, next) => {
  return prev.completed !== next.completed; // ❌ completed 변경 시 스킵됨
  return prev.completed === next.completed; // ✅ 올바른 로직
});
```

## 화면 구성

| 화면 | 경로 | 설명 |
|---|---|---|
| Todo | `pages/todo/TodoPage` | Todo CRUD 메인 화면 |

## 환경 변수

`.env` 파일에 정의, `react-native-config`로 접근

```
API_URL=https://...
```
