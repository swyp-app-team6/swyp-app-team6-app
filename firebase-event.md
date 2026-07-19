# Firebase Analytics 이벤트 수집 작업계획

## 목적

가입자를 기준으로 각 단계의 완료율을 Firebase Analytics로 측정한다.

| 지표 | 계산식 | 목표 |
|------|--------|------|
| 프로필 등록 완료율 | profile_completed Users / signup_complete Users | 60% |
| 프로필 교환 완료율 | profile_exchange_completed Users / signup_complete Users | 40% |
| 후기 등록 완료율 | review_completed Users / signup_complete Users | 20% |

완료율 = 해당 이벤트를 1회 이상 수행한 사용자 수 / 전체 가입자 수
Firebase Analytics에서 Event Count가 아닌 **Users(고유 사용자 수)** 기준으로 분석한다.

---

## 수집 이벤트 설계

| 이벤트명 | 발생 시점 | 수정 파일 |
|---------|----------|----------|
| `signup_complete` | 소셜 로그인 API 성공 | `useGoogleLoginMutation.ts`, `useAppleLoginMutation.ts` |
| `profile_completed` | 프로필 등록 API 성공 (register 모드만) | `ProfileStep6Page.tsx` |
| `profile_exchange_completed` | 교환 ACCEPTED 수신 (스캐너+대기자 양측) | `useExchangeFlowStore.ts`, `useExchangeWait.ts` |
| `review_completed` | 후기 작성 API 성공 (write 모드만) | `WriteReviewPage.tsx` |

### setUserId 설정

로그인 성공 직후 `setAnalyticsUserId(String(user.id))`를 호출하여 사용자 기준 집계를 활성화한다.

### isFirst 플래그 (추후)

현재는 `isFirst` 플래그 없이 매번 이벤트를 전송한다. Firebase Users 기준 집계가 자동으로 고유 사용자를 구분하므로, 중복 전송되어도 완료율 계산에는 영향 없다. 추후 백엔드에서 `isFirst` 플래그를 제공하면 최초 수행 시에만 전송하도록 개선한다.

---

## 작업 1: setAnalyticsUserId 유틸 함수 추가

**수정 파일:** `src/shared/lib/analytics.ts`

`@react-native-firebase/analytics`에서 `setUserId`를 import하고, `setAnalyticsUserId` 함수를 추가한다.

```typescript
import {
  getAnalytics,
  logEvent as firebaseLogEvent,
  logScreenView as firebaseLogScreenView,
  setUserId as firebaseSetUserId,
} from '@react-native-firebase/analytics';
```

```typescript
/**
 * # setAnalyticsUserId
 * ---
 * - 간단설명: Firebase Analytics에 사용자 ID를 설정하여 사용자 기준 집계를 활성화한다
 * - 제약사항 및 특이사항:
 *   - 개발 환경(__DEV__)에서는 콘솔 로그만 출력
 *   - 로그인 성공 직후 호출해야 함
 * ---
 * @param userId 사용자 고유 ID (User.id를 문자열로 변환)
 * ---
 * @example
 * setAnalyticsUserId(String(user.id));
 */
export const setAnalyticsUserId = async (userId: string): Promise<void> => {
  if (__DEV__) {
    console.log('[Analytics] setUserId:', userId);
    return;
  }

  await firebaseSetUserId(getAnalytics(), userId);
};
```

---

## 작업 2: 로그인 성공 시 signup_complete 이벤트 + setUserId

### Google 로그인

**수정 파일:** `src/features/login/googleLogin/api/useGoogleLoginMutation.ts`

import 추가:
```typescript
import { logEvent, setAnalyticsUserId } from '@/shared/lib/analytics';
```

`onSuccess` 콜백에서 `fetchUserInfo()` 후 추가:
```typescript
onSuccess: async (data) => {
  if (!data) return;
  const { access_token, refresh_token } = data;
  await setTokens({ accessToken: access_token, refreshToken: refresh_token });
  await fetchUserInfo();

  // Firebase Analytics: 사용자 ID 설정 + 가입 완료 이벤트
  const user = useAuthStore.getState().user;
  if (user) {
    setAnalyticsUserId(String(user.id));
    logEvent('signup_complete');
  }

  return data;
},
```

### Apple 로그인

**수정 파일:** `src/features/login/appleLogin/api/useAppleLoginMutation.ts`

import 추가:
```typescript
import { logEvent, setAnalyticsUserId } from '@/shared/lib/analytics';
```

`mutationFn` 내부, `return data;` 직전에 추가:
```typescript
const user = useAuthStore.getState().user;
if (user) {
  setAnalyticsUserId(String(user.id));
  logEvent('signup_complete');
}

return data;
```

---

## 작업 3: 프로필 등록 완료 시 profile_completed 이벤트

**수정 파일:** `src/pages/profileStep/ProfileStep6Page.tsx`

import 추가:
```typescript
import { logEvent } from '@/shared/lib/analytics';
```

`handleSubmit` 내부, register 모드 성공 시:
```typescript
try {
  if (isEdit) {
    await updateAsync(request);
  } else {
    await registerAsync(request);
    logEvent('profile_completed');
  }
  navigation.navigate('profileComplete', { mode });
} catch (e) {
  console.error(e);
  openErrorDialog({ message: '프로필 저장에 실패했습니다' });
}
```

---

## 작업 4: 프로필 교환 완료 시 profile_exchange_completed 이벤트

### 스캐너 측

**수정 파일:** `src/features/exchange/model/useExchangeFlowStore.ts`

import 추가:
```typescript
import { logEvent } from '@/shared/lib/analytics';
```

`startExchange` 내부, ACCEPTED 블록에서 `onComplete?.()` 직전:
```typescript
if (data.status === 'ACCEPTED' && data.result) {
  set({
    exchangeResult: data.result,
    scannedProfile: data.result.profile ?? get().scannedProfile,
    step: ExchangeFlowStep.RESULT,
    _abortController: null,
  });
  logEvent('profile_exchange_completed');
  onComplete?.();
}
```

### 대기자 측

**수정 파일:** `src/features/profileShare/lib/useExchangeWait.ts`

import 추가:
```typescript
import { logEvent } from '@/shared/lib/analytics';
```

`acceptExchange` 내부, ACCEPTED 블록에서 `resetState()` 직전:
```typescript
if (data.status === 'ACCEPTED' && data.result) {
  useExchangeFlowStore.setState({
    scannedProfile: data.result.profile ?? useExchangeFlowStore.getState().scannedProfile,
    exchangeResult: data.result,
    step: ExchangeFlowStep.RESULT,
  });
  logEvent('profile_exchange_completed');
  resetState();
  onForceCloseRef.current?.();
  navigation.navigate('exchangeResult');
}
```

---

## 작업 5: 후기 등록 완료 시 review_completed 이벤트

**수정 파일:** `src/pages/storage/WriteReviewPage.tsx`

import 추가:
```typescript
import { logEvent } from '@/shared/lib/analytics';
```

`handleSubmit`의 write 모드 `onSuccess`에 추가:
```typescript
onSuccess: () => {
  if (isEdit) {
    openDialog({
      type: 'confirm',
      message: '후기를 수정했습니다!',
      cancelLabel: '뒤로 가기',
      okLabel: '홈으로 가기',
      cancelFn: () => navigation.goBack(),
      okFn: () => navigation.navigate('home'),
      autoClose: false,
    });
  } else {
    logEvent('review_completed');
    openDialog({
      type: 'alert',
      message: '후기를 등록했습니다!',
      okFn: () => navigation.goBack(),
    });
  }
},
```

---

## 전체 수정 파일 목록

| 파일 | 변경 내용 |
|------|----------|
| `src/shared/lib/analytics.ts` | `setAnalyticsUserId` 함수 추가 |
| `src/features/login/googleLogin/api/useGoogleLoginMutation.ts` | `signup_complete` 이벤트 + setUserId |
| `src/features/login/appleLogin/api/useAppleLoginMutation.ts` | `signup_complete` 이벤트 + setUserId |
| `src/pages/profileStep/ProfileStep6Page.tsx` | `profile_completed` 이벤트 |
| `src/features/exchange/model/useExchangeFlowStore.ts` | `profile_exchange_completed` 이벤트 (스캐너) |
| `src/features/profileShare/lib/useExchangeWait.ts` | `profile_exchange_completed` 이벤트 (대기자) |
| `src/pages/storage/WriteReviewPage.tsx` | `review_completed` 이벤트 |

## 검증

1. 개발 환경에서 각 이벤트 발생 시 콘솔 로그 확인 (`[Analytics] event: signup_complete` 등)
2. Firebase Console > Analytics > Events에서 이벤트 수신 확인
3. Firebase Console > Analytics에서 Users 기준으로 완료율 계산 확인
