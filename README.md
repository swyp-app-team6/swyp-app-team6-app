# RN-SCAFFOLD : react native 스캐폴딩 프로젝트

## 버전 정보

| 항목 | 버전 |
|---|---|
| App | 0.0.1 |
| React Native | 0.84.1 |
| React | 19.2.3 |
| Node.js | >= 22.11.0 |
| Yarn | 4.6.0 |

## 기술 스택

| 분류 | 라이브러리 | 버전 |
|---|---|---|
| 언어 | TypeScript | ^5.8.3 |
| 상태 관리 | Zustand + Immer | ^5.0.12 / ^11.1.4 |
| HTTP 클라이언트 | Axios | ^1.15.2 |
| 내비게이션 | React Navigation (Native Stack) | ^7.1.33 |
| 스타일링 | NativeWind (Tailwind CSS) | ^4.2.2 |
| 환경 변수 | react-native-config | ^1.6.1 |


## Automatic Configuration (Recommended)

Add Sentry automatically to your app with the [Sentry wizard](https://docs.sentry.io/platforms/react-native/#install) (call this inside your project directory).

```bash
npx @sentry/wizard@latest -i reactNative --saas --org swyp-team6 --project react-native
```

The Sentry wizard will automatically patch your project with the following:

- Configure the SDK with your DSN
- Add source maps upload to your build process
- Add debug symbols upload to your build process

## Manual Configuration

Alternatively, you can also set up the SDK manually, by following the [manual setup docs](https://docs.sentry.io/platforms/react-native/manual-setup/manual-setup/).

If you already have the configuration for Sentry in your application, and just need this project's (react-native) DSN, you can find it below:

```
https://c3fc0da854f50110868736093784afe7@o4511511582212096.ingest.us.sentry.io/4511511583588352
```