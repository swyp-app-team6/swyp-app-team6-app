# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 작업 순서: 신규 작업 시, 반드시 다음 플로우를 준수하여 작업 진행할 것
1. 기획&요구사항 정리
- atlassian mcp 사용해 Jira 접근하여 기획 확인
- 전반적 작업 내용은 jira에서 확인
- 브랜치 명은 티켓 이름을 그대로 사용

# 커밋 시
- 커밋규칙: commit xxx: 커밋 메세지를 xxx를 반드시 포함하여 작성

필수 사항: 계획은 반드시 superpowers의 brainstorming skill 사용하여 진행

<!-- - 세부 기획, 제약사항 등은 confluence에서 확인(현재 세팅 안되었으므로 무시)
  - PDR: 기획 및 제약사항 어떻게, 어째서 했는지를 정리하는 문서
  - ADR: 특정 기술 도입 결정을 왜 하였는지 정리하는 문서 -->

2. 디자인: 주어지는 피그마 링크, mcp, 퍼블리싱 데이터 조합하여 ui 구성후 작성
- 반드시 shared/ui 의 컴포넌트를 사용할것, 새로 제작 필요할시는 개발자에게 허락 받아야 함

3. 개발: Jira, confluence, stitch mcp 통해 작업사항 바탕으로 하여  작업내용 파악
- 개발 과정은 red green refactor 원칙 기반 TDD로 작업 진행할 것
- superpowers의 brainstorming skill 사용하여 기획 구체화 진행
- 커밋 메세지: 내용은 전부 한글로 작성할것

- 현재 개발 시 테스트 작성은 생략
<!-- - 개발 방법론: superpowers의 test-driven-development skill 사용하여 TDD로 진행
1. 테스트 desc 작성, 작성후 검토 요청하기
2. 구현하려는 기능의 테스트 작성 
3. 테스트를 통과시키는 최소한의 코드 작성
4. 리팩토링 및 개선 -->

- 폴더 구조: fsd 패턴 사용하여 구조적으로 정리
규칙
폴더 구조: 레이어, 슬라이스, 세그먼트로 분류됨

레이어: fsd에서 정의된 폴더 분류
App: 최상위 app.tsx, provider, router 등 최상위 설정들
Pages; 개별 페이지 정의, 비즈니스 로직보다는 사용자 인터페이스 관련 로직만 관리
widgets: 페이지 내 독립적으로 작동하는 기능 관리, 다양한 페이지에서 재사용 가능 (ui): template
Features: 재사용 가능한 비즈니스 기능 위한 레이어, 재사용 가능한 ui+비즈니스 로직: organisms
Entities: 데이터 모델, 데이터에 대한 로직, 사용자 정보 관리 store, interface 정의
Shared: 공용 ui, 유틸 순수함수들-슬라이스 없이 세그먼트만 있음: atoms, molecules

슬라이스: 레이어의 컨텍스트별 폴더, 각 도메인에 대한 폴더명 구성
- index.ts: 해당 슬라이스에서 사용가능한 모든 기능 리턴, 구체적인 경로 몰라도 import 가능함
세그먼트: 컨텍스트별 세부 내용, 아래 디렉토리로 구별되나 커스터마이징 가능
    - Model: 상태관리, 비즈니스로직, 데이터 상태 저장및 관리
    - Ui: 각 기능에 대한 UI
    - api: 각 api 요청에 대한 코드 작성 (rq useQuery, useMutation hoook)
    - Lib: 유틸 순수함수
    - Types: interface, type


레이어는 반드시 자신의 하위요소만 참조해야 함
각 세그먼트의 폴더명은 컨벤션은 있으나 임의 변경 가능





- 중요!: Jsdoc 작성
- 각 작성한 요소의 스펙에 대해 jsdoc 형식의 간단 문서를 작성해야 한다
- 한국어로 작성하며, 함수, 변수, 클래스 등의 경우 요소 바로 위에 작성한다

- 아래의 양식에 따라 작성한다
/** 
 * # 컴포넌트/함수/클래스 이름
   ---
 * - 간단설명: 무슨역할인지 1줄로 설명
   - 제약사항 및 특이사항: 있으면 목록별로 나열
   ---
   @param: 쿼리파라미터
   ex) @param children react children
   ---
 * @example: 간단예제
 * 
 */
 
- type, interface, enum의 경우, jsdoc은 다음과 같은 형태로 작성한다
/**
 * 도서 검색 목록 정렬 기준
 * - ACCURACY = 정확도순
 * - LATEST = 발간일순
 */
export enum FETCH_BOOK_SORT {
	/** 정확도순 */
  ACCURACY = "accuracy",
  /** 발간일순 */
  LATEST = "latest",
}


4. 작업 마무리 및 PR
- 티켓 검토중으로 작업상태 변경
- 각 테스트 진행후 PR 
- AI 가 기본 내용 검토
- 사용자가 최종 검토
 

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

### Page 컴포넌트 구성 규칙

Page 컴포넌트는 **UI 조합과 화면 레이아웃만** 담당한다. 비즈니스 로직은 features/widgets에 위임.

**기본 구조:**

```tsx
function MyPage() {
  return (
    <>
      <Header title="화면 제목" />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
        {/* widgets 또는 features UI 조합 */}
      </Layout.Body>
    </>
  )
}

export default withLayout(MyPage);
```

**규칙:**

- 반드시 `withLayout(MyPage)` 로 감싸서 export — 탭 네비게이션·공통 레이아웃 자동 적용
- 컴포넌트 내부는 `<Header>` + `<Layout.Body>` 구조만 렌더링 (`<Layout>` 직접 사용 금지)
- `Layout.Body`에 `styleClass={{ root: 'px-6 pt-10' }}` 기본 여백 적용 (좌우 패딩 + 상단 여백)
- 인증이 필요한 화면은 추가로 `withAuthorization` 적용

```tsx
export default withAuthorization(withLayout(MyPage));
```

- 페이지 자체에 비즈니스 로직(API 호출, 상태 관리) 작성 금지 — features/widgets에 위임
- `useNavigation`은 페이지 내 네비게이션 이동 목적으로만 사용 허용

**버튼 배치 규칙:**

- 주 액션 버튼: `variant='primary'` (기본값)
- 보조 액션 버튼(회원가입, 비밀번호 찾기 등): `variant='secondary'`
- 버튼이 여러 개인 행: `flex flex-row justify-between mt-4`

```tsx
<View className='w-full flex flex-row justify-between mt-4'>
  <Button title='회원가입' variant='secondary' onPress={...} />
  <Button title='비밀번호 찾기' variant='secondary' />
</View>
```

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

### 라우트 설정
- 라우트 정의: `src/shared/router/StackRouter.tsx`
- 타입 정의: `src/shared/types.ts` (`NavigatorType`)
- 내비게이션 ref: `src/shared/router/navigationRef.ts`

### 페이지 목록

| 라우트명 | 페이지 컴포넌트 | 경로 | 파라미터 |
|---|---|---|---|
| `onboarding` | OnboardingPage | `src/pages/onboarding/OnboardingPage.tsx` | - |
| `login` | LoginPage | `src/pages/login/LoginPage.tsx` | - |
| `defaultLogin` | DefaultLoginPage | `src/pages/login/DefaultLoginPage.tsx` | - |
| `home` | HomePage | `src/pages/home/HomePage.tsx` | - |
| `profileCard` | ProfileCardPage | `src/pages/profileCard/ProfileCardPage.tsx` | - |
| `mypage` | MyPage | `src/pages/mypage/MyPage.tsx` | - |
| `qr` | QRPage | `src/pages/qr/QRPage.tsx` | - |
| `storage` | StoragePage | `src/pages/storage/StoragePage.tsx` | - |
| `storageAll` | StorageAllPage | `src/pages/storage/StorageAllPage.tsx` | - |
| `exchangeResult` | ExchangeResultPage | `src/pages/exchangeResult/ExchangeResultPage.tsx` | - |
| `exchangedProfileDetail` | ExchangedProfileDetailPage | `src/pages/storage/ExchangedProfileDetailPage.tsx` | `{ profileId: number }` |
| `writeReview` | WriteReviewPage | `src/pages/storage/WriteReviewPage.tsx` | `{ profileId: number; mode?: 'write' \| 'edit' }` |
| `profileDetail` | ProfileDetailPage | `src/pages/profileDetail/ProfileDetailPage.tsx` | - |
| `profileStep1` | ProfileStep1Page | `src/pages/profileStep/ProfileStep1Page.tsx` | `{ mode: 'register' \| 'edit' }` |
| `profileStep2` | ProfileStep2Page | `src/pages/profileStep/ProfileStep2Page.tsx` | `{ mode: 'register' \| 'edit' }` |
| `profileStep3` | ProfileStep3Page | `src/pages/profileStep/ProfileStep3Page.tsx` | `{ mode: 'register' \| 'edit' }` |
| `profileStep4` | ProfileStep4Page | `src/pages/profileStep/ProfileStep4Page.tsx` | `{ mode: 'register' \| 'edit' }` |
| `profileStep5` | ProfileStep5Page | `src/pages/profileStep/ProfileStep5Page.tsx` | `{ mode: 'register' \| 'edit' }` |
| `profileStep6` | ProfileStep6Page | `src/pages/profileStep/ProfileStep6Page.tsx` | `{ mode: 'register' \| 'edit' }` |
| `profileComplete` | ProfileCompletePage | `src/pages/profileStep/ProfileCompletePage.tsx` | `{ mode: 'register' \| 'edit' }` |
| `cosmicTest` | CosmicTestPage | `src/pages/cosmicTest/CosmicTestPage.tsx` | - |
| `appSetting` | AppSettingPage | `src/pages/appSetting/AppSettingPage.tsx` | - |
| `accountEdit` | AccountEditPage | `src/pages/accountEdit/AccountEditPage.tsx` | - |
| `withdrawalReason` | WithdrawalReasonPage | `src/pages/withdrawal/WithdrawalReasonPage.tsx` | - |
| `withdrawalConfirm` | WithdrawalConfirmPage | `src/pages/withdrawal/WithdrawalConfirmPage.tsx` | `{ reason: string }` |

### 하단 탭 네비게이션

| 탭 | 라우트 | 설명 |
|---|---|---|
| 홈 | `home` | 프로필 카드 영역 |
| QR스캔 | `qr` | QR 스캔/생성 |
| 보관함 | `storage` | 교환 프로필 보관함 |

### Widgets (독립 UI 블록)

| 위젯 | 경로 | 역할 |
|---|---|---|
| HomeWidget | `src/widgets/home/ui/HomeWidget.tsx` | 홈 프로필 카드 위젯 |
| HomeCardBack | `src/widgets/home/ui/HomeCardBack.tsx` | 프로필 카드 뒷면 |
| QRWidget | `src/widgets/qr/ui/QRWidget.tsx` | QR 스캔/생성 탭 |
| QRCodeView | `src/widgets/qr/ui/QRCodeView.tsx` | QR 코드 생성 뷰 |
| QRScanView | `src/widgets/qr/ui/QRScanView.tsx` | QR 스캔 카메라 뷰 |
| StorageWidget | `src/widgets/storage/ui/StorageWidget.tsx` | 보관함 프리뷰 (최신 4개) |
| StorageAllWidget | `src/widgets/storage/ui/StorageAllWidget.tsx` | 보관함 전체 목록 |
| ProfileGrid | `src/widgets/storage/ui/ProfileGrid.tsx` | 프로필 그리드 표시 |
| EditToolbar | `src/widgets/storage/ui/EditToolbar.tsx` | 보관함 일괄 삭제 툴바 |

### Features (비즈니스 기능)

| 기능 | 경로 | 역할 |
|---|---|---|
| 프로필 등록 | `src/features/register/` | 6단계 프로필 등록 (ui/model/api/lib) |
| 프로필 수정 | `src/features/editProfile/` | 프로필 편집 (ui/model/api/lib) |
| 프로필 이미지 | `src/features/profile/editProfileImage/` | 이미지 선택/업로드 |
| 소셜 로그인 | `src/features/login/` | 로그인 + 문제 안내 바텀시트 |
| 기본 로그인 | `src/features/login/defaultLogin/` | 안내 로그인 폴백 |
| QR 교환 | `src/features/exchange/` | 교환 확인/로딩/미리보기/결과 모달 |
| 프로필 공유 | `src/features/profileShare/` | QR 모달로 프로필 공유 |
| 보관함 상세 | `src/features/storage/` | 교환 프로필 상세/후기/신고/필터 |
| 이용약관 | `src/features/terms/` | 약관 동의 바텀시트 |
| 권한 안내 | `src/features/permissionGuide/` | 앱 접근권한 안내 바텀시트 |
| 탈퇴 | `src/features/withdrawal/` | 탈퇴 사유/확인 |

### Entities (도메인 모델)

| 엔티티 | 경로 | 포함 내용 |
|---|---|---|
| user | `src/entities/user/` | authStore, profileDataStore, userApi, profileApi |
| exchange | `src/entities/exchange/` | 교환 데이터 타입/API |
| storage | `src/entities/storage/` | 보관함 데이터 타입/API |
| cosmic | `src/entities/cosmic/` | 코스믹 유형 테스트 타입/API |
| interest | `src/entities/interest/` | 관심사 태그 타입/API |
| question | `src/entities/question/` | TMI 질문 타입/API |
| terms | `src/entities/terms/` | 이용약관 타입/API |

### Shared (공용 모듈)

| 분류 | 경로 | 주요 항목 |
|---|---|---|
| UI 컴포넌트 | `src/shared/ui/` | Button, Header, Layout, BottomSheet, Card, ProfileCard, ChipSelect, Input, Dialog 등 |
| 아이콘 | `src/shared/ui/icons/` | 50+ SVG 아이콘 컴포넌트 |
| API | `src/shared/api/` | httpClient(Axios), interceptors |
| 라우터 | `src/shared/router/` | StackRouter, navigationRef |
| 상태 | `src/shared/model/` | authStore, conditionStateStore |
| 유틸 | `src/shared/lib/` | cn, toast, uploadToS3, regionLabel, env 등 |
| HOC | `src/shared/hoc/` | withLayout, withAuthorization |

### 상태 관리 Store 목록

| Store | 위치 | 역할 |
|---|---|---|
| authStore | `src/entities/user/model/authStore.ts` | 인증 토큰, 로그인 상태 |
| profileDataStore | `src/entities/user/model/profileDataStore.ts` | 유저 프로필 데이터 |
| conditionStateStore | `src/shared/model/conditionStateStore.ts` | 앱 상태 플래그 (온보딩 완료 등) |
| permissionStore | `src/widgets/permissions/model/usePermissionStore.ts` | 권한 상태 |

## 환경 변수

`.env` 파일에 정의, `react-native-config`로 접근

```
API_URL=https://...
```
