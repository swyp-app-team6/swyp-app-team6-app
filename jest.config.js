module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/jest.styleMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|nativewind|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|react-native-toast-message|@gorhom|react-native-svg|react-native-worklets|react-native-worklets-core|react-native-css-interop|react-native-config|react-native-encrypted-storage|react-native-image-picker|axios|zustand|immer|@notifee|@testing-library|react-native-qrcode-svg|react-native-vision-camera)/)',
  ],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jest.setup.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e/',
    '/src/web-sample/',
  ],
};
