---
name: app-reference
description: Orbits 앱 전체 페이지 맵, 라우트, 컴포넌트 경로, 기획 정책 요약 — 신규 작업 시 참고용
---

# Orbits (오르비츠) 앱 레퍼런스

> 오프라인에서 만난 상대방과 QR 코드를 통해 프로필 카드를 교환하고, 교환한 프로필에 나만 보는 후기를 작성하여 인연을 관리하는 소셜 매칭 앱

---

## 1. 페이지 맵 & 컴포넌트 경로

### 라우트 설정 파일
- `src/shared/router/StackRouter.tsx` — React Navigation native-stack 설정
- `src/shared/types.ts` — `NavigatorType` (모든 라우트명 + 파라미터 정의)
- `src/shared/router/navigationRef.ts` — 명령형 내비게이션 ref

### 전체 페이지 목록

| 라우트명 | 페이지 컴포넌트 | 파일 경로 | 파라미터 |
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
| `playground` | ComponentPlaygroundPage | `src/pages/playground/ComponentPlaygroundPage.tsx` | DEV 전용 |
| `apiLog` | ApiLogPage | `src/pages/playground/ApiLogPage.tsx` | DEV 전용 |
| `safeAreaTest` | SafeAreaTestPage | `src/pages/playground/SafeAreaTestPage.tsx` | DEV 전용 |

### 하단 탭 네비게이션 (BottomNav)
| 탭 | 라우트 | 아이콘 |
|---|---|---|
| 홈 | `home` | `icon_home` |
| QR스캔 | `qr` | QR 아이콘 |
| 보관함 | `storage` | 보관함 아이콘 |

---

## 2. FSD 레이어별 주요 모듈

### Widgets (독립 작동 UI 블록)
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

### Shared (공용)
| 분류 | 경로 | 주요 항목 |
|---|---|---|
| UI 컴포넌트 | `src/shared/ui/` | Button, Header, Layout, BottomSheet, Card, ProfileCard, ChipSelect, Input, Dialog 등 50+ |
| 아이콘 | `src/shared/ui/icons/` | 50+ SVG 아이콘 컴포넌트 |
| API | `src/shared/api/` | httpClient(Axios), interceptors |
| 라우터 | `src/shared/router/` | StackRouter, navigationRef |
| 상태 | `src/shared/model/` | authStore, conditionStateStore |
| 유틸 | `src/shared/lib/` | cn, toast, uploadToS3, regionLabel, env 등 |
| HOC | `src/shared/hoc/` | withLayout, withAuthorization |

---

## 3. 기획 정책 요약 (PRD 기반)

### FR-01. 스플래시
- 최대 3초, 배경 #8743ED
- 최초 실행 → 온보딩 / 재실행 → 로그인/홈

### FR-02. 온보딩
- 4단계 스와이프 캐러셀 (최초 1회만)
- 1~3단계: "건너뛰기" 버튼 / 4단계: "시작하기" 버튼
- 단계: 프로필 등록 → 프로필 교환 → 관심사 찾기 → 후기 작성

### FR-03. 로그인
- 소셜: Google(1순위), Apple(1순위), 카카오(후순위/제외)
- 비회원: 회원가입 → 약관 → 권한안내 → 홈
- 회원: 바로 로그인 → 홈
- "로그인에 문제가 있나요?" → 바텀시트 → 안내 로그인(defaultLogin)

### FR-04. 이용약관
- 바텀시트, 회원가입 직후 1회
- 필수 3개: 서비스이용약관, 개인정보처리방침, 만 14세 이상
- 모두 체크 시 CTA 활성화

### FR-05. 앱 접근권한 안내
- 바텀시트, 약관 동의 후
- 카메라(선택), 사진보관함(선택), PUSH알림(선택/구현생략)
- 안내만, 실제 권한요청은 기능 사용 시

### FR-06. 프로필 등록 (6단계)
1. **필수정보** — 사진(필수), 이름(2~10자, 한글/영문), 성별(남/여)
2. **활동지역** — 시/도 + 구/군 드롭다운
3. **자기소개** — 선택, 최대 100자
4. **관심사** — 12개 중 3~5개 선택 (여행/운동/맛집카페/독서/게임/자기계발/재테크/콘서트뮤지컬/영화드라마/캠핑드라이브/음악/외국어)
5. **코스믹 유형 테스트** — 6문항 각 4지선다 (→ FR-07)
6. **TMI** — 선택, 카테고리별 질문 선택+답변 (전체/양자택일/빈칸채우기/커플논쟁/밸런스게임)
- 미리보기 → "등록 완료하기" CTA
- 뒤로가기 시 입력정보 있으면 이탈 확인 팝업

### FR-07. 코스믹 유형 테스트
- 6문항, 각 4개 선택지, 문항별 일러스트
- 선택 시 자동 다음 이동, 이전으로 돌아가 수정 가능
- 미응답 문항 있으면 팝업 ("6문항 중 질문 N번 미응답")
- 결과 유형: 슈팅스타형 / 갤럭시형 / (+2개 추가예정)
- 결과 카드 앞면(유형명+일러스트+한줄설명) / 뒷면(연애스타일/궁합/끌리는타입)
- "이미지 저장" + "카드 적용" 버튼

### FR-08. 홈화면
- 프로필 미생성: "새로운 프로필 카드를 추가하세요" + 생성 버튼
- 프로필 생성: 카드 앞면(이름/나이/유형태그/관심사태그) ↔ 뒷면(유형정보)
- 카드 우측상단 QR 아이콘 → 프로필 공유 모달 (QR코드, 1분마다 갱신, nn초 카운터)
- "프로필 전체보기" → profileDetail
- 하단 탭: 홈 / QR스캔 / 보관함

### FR-09. QR 프로필 교환
- QR스캔 탭 → 카메라 (카메라 권한 필요)
- 스캔 성공 → 교환 확인 모달 ("교환하시겠습니까?" / 철회하기 / 미리보기)
- 미리보기: 상대에게 보이는 내 프로필카드
- 교환하기 CTA → 로딩(상호 수락 대기) → 공통관심사 결과 화면
- 공통관심사 있음: "우리 서로 좋아하는 관심사가 있어요!" + 태그
- 공통관심사 없음: "아쉽지만 서로 같은 관심사가 아직 없어요!" + 상대 관심사

### FR-10. 보관함
- 첫 진입: 최신 4개만 / "전체보기" → storageAll
- 전체목록: 검색(이름/태그), 좋아요 필터, 전체선택 체크, 선택삭제(확인 모달)
- 프로필 클릭 → exchangedProfileDetail (프로필카드/기본정보/공통관심사/전체보기 아코디언)
- 하단 "만남후기 작성" CTA → writeReview
- 신고: 바텀시트(유형 선택, 기타 시 텍스트), 신고제출 CTA
- 차단: "차단할까요?" 모달, 차단 시 상호 블러처리

### FR-11. 마이페이지
- 상단: 회원명 + 계정정보수정 버튼
- 메뉴: 내 프로필 / 보관함 / 콘텐츠 / 더보기 / 앱설정 / 계정정보수정 / FAQ / 공지사항 / 1:1문의 / 이용약관 / 개인정보처리방침 / 로그아웃 / 앱버전
- 계정정보수정: SNS연결, 이메일, 가입일, 휴대폰번호 수정, 차단/신고 계정, 탈퇴하기
- 탈퇴: 사유 복수선택(기타 시 직접입력) → 탈퇴 내용확인 → 최종 확인 팝업

---

## 4. 상태 관리

| Store | 위치 | 역할 |
|---|---|---|
| authStore | `src/entities/user/model/authStore.ts` | 인증 토큰, 로그인 상태 |
| profileDataStore | `src/entities/user/model/profileDataStore.ts` | 유저 프로필 데이터 |
| conditionStateStore | `src/shared/model/conditionStateStore.ts` | 앱 상태 플래그 (온보딩 완료 등) |
| permissionStore | `src/widgets/permissions/model/usePermissionStore.ts` | 권한 상태 |

---

## 5. 앱 초기화 플로우

1. 스플래시 표시 (최대 3초)
2. 토큰 복원, 권한 확인, 조건 플래그 초기화
3. `hasSeenOnboarding === false` → `onboarding`
4. 그 외 → `home`

---

## 6. UI 규격 (디자인 기준)

- **기준 해상도**: 390 × 844 (iPhone 13/14)
- **좌우 패딩**: 20px / 콘텐츠 너비: 350px
- **CTA 버튼**: 350×56 (`btn_bottom`)
- **선택지 버튼**: 350×80
- **태그 크기**: 169×52 (관심사) / 80×52 (성별)
- **StatusBar**: h=47 / HomeIndicator: h=34 (y=810)
- **탭바**: 390×60, 3탭 균등분할

---

## 7. 기술 스택

- **프레임워크**: React Native CLI 0.84.1
- **네비게이션**: @react-navigation/native-stack
- **상태관리**: Zustand (클라이언트) + TanStack Query (서버)
- **HTTP**: Axios + interceptors
- **스타일링**: NativeWind (Tailwind CSS)
- **이미지 업로드**: S3 (uploadToS3)
- **모니터링**: Sentry
- **환경변수**: react-native-config (.env)
