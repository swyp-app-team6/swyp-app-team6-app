// Jest setup for React Native
require('react-native-gesture-handler/jestSetup');

// Mock react-native-worklets to avoid initialization errors
jest.mock('react-native-worklets', () => ({
  addWorkletExtensionToNative: jest.fn(),
}));

jest.mock('react-native-worklets-core', () => ({
  addWorkletExtensionToNative: jest.fn(),
}));

// Mock react-native-config
jest.mock('react-native-config', () => ({
  API_URL: 'http://localhost:3000',
  DEFAULT_LANGUAGE: 'en',
}));

// Mock @notifee/react-native
jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    requestPermission: jest.fn(),
    onForegroundEvent: jest.fn(() => jest.fn()),
    onBackgroundEvent: jest.fn(() => jest.fn()),
    displayNotification: jest.fn(),
  },
  EventType: {
    NOTIFICATION_PRESSED: 0,
    CHANNEL_CREATED: 1,
    CHANNEL_UPDATED: 2,
    CHANNEL_DELETED: 3,
  },
}));

// Mock react-native-encrypted-storage
jest.mock('react-native-encrypted-storage', () => ({
  __esModule: true,
  default: {
    setItem: jest.fn().mockResolvedValue(undefined),
    getItem: jest.fn().mockResolvedValue(null),
    removeItem: jest.fn().mockResolvedValue(undefined),
    clear: jest.fn().mockResolvedValue(undefined),
  },
}));

// Mock react-native-reanimated with custom implementation
jest.mock('react-native-reanimated', () => ({
  createAnimatedComponent: (component) => component,
  createAnimatedProp: jest.fn(),
  addWhitelistedNativeProps: jest.fn(),
  addWhitelistedUIProps: jest.fn(),
  useSharedValue: jest.fn(() => ({ value: 0 })),
  useAnimatedStyle: jest.fn(() => ({})),
  useAnimatedReaction: jest.fn(),
  useAnimatedGestureHandler: jest.fn(),
  runOnUI: jest.fn((fn) => fn),
  runOnJS: jest.fn((fn) => fn),
  interpolate: jest.fn(),
  withTiming: jest.fn((target) => target),
  withSpring: jest.fn((target) => target),
  withDecay: jest.fn((target) => target),
  cancelAnimation: jest.fn(),
  Easing: {
    linear: jest.fn((t) => t),
    quad: jest.fn((t) => t * t),
    cubic: jest.fn((t) => t * t * t),
    ease: jest.fn((t) => t),
    in: jest.fn((t) => t),
    out: jest.fn((t) => 1 - (1 - t) ** 2),
    inOut: jest.fn((t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    bezier: jest.fn(() => (t) => t),
    circle: jest.fn((t) => 1 - Math.sqrt(1 - t * t)),
    sin: jest.fn((t) => 1 - Math.cos((t * Math.PI) / 2)),
    poly: jest.fn(() => (t) => t),
    exp: jest.fn((t) => t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
    elastic: jest.fn(() => (t) => t),
    back: jest.fn(() => (t) => t),
    bounce: jest.fn(() => (t) => t),
  },
  FlatList: require('react-native').FlatList,
  ScrollView: require('react-native').ScrollView,
  View: require('react-native').View,
  Text: require('react-native').Text,
  Image: require('react-native').Image,
  Modal: require('react-native').Modal,
  Switch: require('react-native').Switch,
  TextInput: require('react-native').TextInput,
  VirtualizedList: require('react-native').VirtualizedList,
  Pressable: require('react-native').Pressable,
  Animated: {
    View: require('react-native').View,
    Text: require('react-native').Text,
    Image: require('react-native').Image,
    ScrollView: require('react-native').ScrollView,
    FlatList: require('react-native').FlatList,
  },
  createAnimatedPropAdapter: jest.fn(),
  createSerializable: jest.fn(),
  default: {
    addWhitelistedUIProps: jest.fn(),
  },
}));
