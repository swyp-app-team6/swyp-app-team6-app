# FSD 구조 검토 보고서

## FSD 레이어 계층 (import 방향)

```
app → pages → widgets → features → entities → shared
```

상위 레이어는 하위 레이어만 import할 수 있으며, 같은 레이어 내 슬라이스 간 import는 금지입니다.

---

## 현재 디렉토리 구조

```
src/
├── app/
│   ├── api/          ← 문제 #6
│   ├── lib/          ← 문제 #6
│   ├── navigation/
│   ├── providers/
│   ├── types/
│   ├── App.tsx
│   └── StackRouter.tsx
├── entities/
│   └── todo/
│       ├── model/
│       │   └── todoStore.ts   ← 문제 #3
│       └── type.ts            ← 문제 #3 (index.ts 없음 → 문제 #1)
├── features/
│   └── todo/
│       ├── createTodo/
│       │   └── ui/            ← 비어 있음 (문제 #7)
│       ├── deleteTodo/
│       │   └── ui/            ← 비어 있음 (문제 #7)
│       ├── updateTodo/
│       │   └── ui/            ← 비어 있음 (문제 #7)
│       ├── enums.ts           ← 문제 #5
│       ├── index.ts           ← 문제 #5
│       └── types.ts           ← 문제 #5
├── pages/
│   ├── index.tsx
│   └── todo/
│       └── TodoPage.tsx       ← index.ts 없음 (문제 #1)
├── shared/
│   ├── api/
│   │   ├── client.ts
│   │   ├── index.ts
│   │   ├── interceptor.ts
│   │   └── todo/              ← 문제 #4
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── TextField.tsx
│   │   └── index.ts
│   └── enums.ts
└── widgets/
    └── todos/
        ├── TodoInput.tsx      ← 문제 #2, #7
        ├── TodoList.tsx       ← 문제 #2
        └── TodoListItem.tsx   ← 문제 #2, #7, #8
```

---

## 문제 목록

### 문제 #1 — Public API (index.ts) 누락

FSD에서 각 슬라이스는 반드시 `index.ts`를 통해서만 외부에 노출해야 합니다.
내부 파일 경로를 직접 import하는 것을 막기 위한 규칙입니다.

| 슬라이스 | 상태 |
|---|---|
| `entities/todo/` | `index.ts` 없음 |
| `pages/todo/` | `index.ts` 없음 |
| `widgets/todos/` | `index.ts` 없음 |

**해결:** 각 슬라이스 루트에 `index.ts` 추가 후 외부에 공개할 것만 re-export

```ts
// entities/todo/index.ts
export { default as todoStore } from './model/todoStore';
export type { Todo } from './model/types';
```

---

### 문제 #2 — 내부 경로 직접 접근 (Public API 우회)

`widgets/todos/` 파일들이 `entities/todo`의 내부 경로를 직접 import하고 있습니다.

```ts
// TodoInput.tsx, TodoList.tsx, TodoListItem.tsx
import todoStore from '../../entities/todo/model/todoStore'; // ❌

// 올바른 방법
import { todoStore } from '../../entities/todo'; // ✅
```

**해결:** 문제 #1 해결 후 모든 import를 슬라이스 루트 경로로 변경

---

### 문제 #3 — Todo 타입이 Store 파일에 정의됨

`entities/todo/model/todoStore.ts`에 `Todo` 인터페이스가 정의 및 export되고 있습니다.
타입은 별도 세그먼트(`model/types.ts` 또는 `types.ts`)에 분리해야 합니다.
`type.ts`는 현재 비어 있고 사용되지 않으며, FSD 컨벤션상 `types.ts`(복수형)가 올바릅니다.

```
entities/todo/
├── model/
│   ├── todoStore.ts   ← Todo 인터페이스 제거
│   └── types.ts       ← Todo 인터페이스 이동 (신규 생성)
├── type.ts            ← 삭제 (types.ts로 대체)
└── index.ts           ← 신규 생성 (문제 #1)
```

---

### 문제 #4 — shared/api/todo — shared에 도메인 API 배치

`shared` 레이어는 도메인 지식이 없는 범용 코드만 포함해야 합니다.
Todo 관련 API 함수는 도메인 로직이므로 shared에 있으면 안 됩니다.

```
shared/api/todo/   ❌
     ↓
entities/todo/api/  ✅
```

`shared/api/`에는 HTTP 클라이언트 설정(`client.ts`, `interceptor.ts`)만 남깁니다.

---

### 문제 #5 — features/todo 레벨에 공유 파일 존재

```
features/todo/
├── enums.ts     ❌
├── types.ts     ❌
└── index.ts     ❌
```

FSD에서 feature 슬라이스(`createTodo`, `deleteTodo`, `updateTodo`)는 서로 독립적이어야 합니다.
슬라이스 그룹 레벨의 공유 파일은 슬라이스 간 암묵적 결합을 만듭니다.

**해결:** Todo 공통 타입/enum은 `entities/todo/`로 이동

---

### 문제 #6 — app/api, app/lib — 잘못된 레이어 배치

`app` 레이어는 앱 진입점 초기화(`App.tsx`, providers, navigation, router)만 담당합니다.
API 클라이언트나 범용 유틸리티는 `shared`에 있어야 합니다.

```
app/api/   ❌  →  shared/api/  ✅ (또는 entities 내부)
app/lib/   ❌  →  shared/lib/  ✅
```

---

### 문제 #7 — Feature 슬라이스 UI와 Widget 역할 혼재

`features/todo/*/ui/`가 만들어져 있지만 비어 있고,
실제 feature 로직이 담긴 컴포넌트는 `widgets/`에 있습니다.

`widgets/`는 여러 feature/entity를 **조합**하는 역할입니다.
단일 feature 액션만 수행하는 컴포넌트는 해당 feature 슬라이스의 `ui/`에 있어야 합니다.

| 현재 위치 | 문제 | 올바른 위치 |
|---|---|---|
| `widgets/todos/TodoInput.tsx` | addTodo 호출 (create feature 로직) | `features/todo/createTodo/ui/` |
| `widgets/todos/TodoListItem.tsx` | toggleStatus 호출 (update feature 로직) | `features/todo/updateTodo/ui/` |

**올바른 Widget 역할 예시:**
```
widgets/todos/TodoList.tsx  ✅ (entities에서 목록 가져와 feature UI 조합)
```

---

### 문제 #8 — TodoListItem memo 비교 로직 버그

FSD 규칙은 아니지만 발견된 버그입니다.

```ts
// widgets/todos/TodoListItem.tsx
export default memo(TodoListItem, (prev, next) => {
  return prev.completed !== next.completed; // ❌ 반전된 로직
});
```

`memo`의 두 번째 인자가 `true`를 반환하면 **리렌더를 스킵**합니다.
현재 로직은 `completed`가 바뀌었을 때 `true`(스킵)를 반환하므로
상태 변경이 화면에 반영되지 않는 버그입니다.

```ts
return prev.completed === next.completed; // ✅
```

---

## 개선 후 목표 구조

```
src/
├── app/
│   ├── navigation/
│   ├── providers/
│   ├── types/
│   ├── App.tsx
│   └── StackRouter.tsx
├── entities/
│   └── todo/
│       ├── api/           ← shared/api/todo/ 이동
│       ├── model/
│       │   ├── todoStore.ts
│       │   └── types.ts   ← Todo 타입 분리
│       └── index.ts       ← Public API
├── features/
│   └── todo/
│       ├── createTodo/
│       │   ├── ui/
│       │   │   └── TodoInput.tsx   ← widgets에서 이동
│       │   └── index.ts
│       ├── deleteTodo/
│       │   ├── ui/
│       │   └── index.ts
│       └── updateTodo/
│           ├── ui/
│           │   └── TodoListItem.tsx ← widgets에서 이동
│           └── index.ts
├── pages/
│   ├── index.tsx
│   └── todo/
│       ├── TodoPage.tsx
│       └── index.ts       ← Public API
├── shared/
│   ├── api/
│   │   ├── client.ts
│   │   ├── interceptor.ts
│   │   └── index.ts
│   ├── lib/               ← app/lib/ 이동
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── TextField.tsx
│   │   └── index.ts
│   └── enums.ts
└── widgets/
    └── todos/
        ├── TodoList.tsx   ← feature UI들을 조합하는 역할만
        └── index.ts       ← Public API
```

---

## 우선순위 요약

| 순위 | 문제 | 영향 |
|---|---|---|
| 1 | Public API(index.ts) 누락 (#1) | 캡슐화 붕괴 |
| 2 | 내부 경로 직접 import (#2) | 캡슐화 붕괴 |
| 3 | Todo API를 shared에 배치 (#4) | 레이어 규칙 위반 |
| 4 | Feature 슬라이스 UI 위치 불일치 (#7) | 레이어 역할 혼재 |
| 5 | Feature 그룹 레벨 공유 파일 (#5) | 슬라이스 결합 |
| 6 | app에 api/lib 배치 (#6) | 레이어 규칙 위반 |
| 7 | Todo 타입이 store에 정의 (#3) | 세그먼트 분리 위반 |
| 8 | memo 비교 로직 버그 (#8) | 기능 버그 |
