import 'react-native-gesture-handler/jestSetup';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
  };
});

// Mock expo modules
jest.mock('expo-constants', () => ({
  default: {
    appOwnership: 'standalone',
    deviceName: 'Test Device',
    platform: {
      ios: {
        platform: 'ios',
      },
    },
  },
}));

jest.mock('expo-notifications', () => ({
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
}));

jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn(),
  preventAutoHideAsync: jest.fn(),
}));

// Mock react-native-encrypted-storage
jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock styled-components
jest.mock('styled-components/native', () => {
  const React = require('react');
  const ReactNative = require('react-native');
  
  const styled = (Component) => (strings, ...values) => {
    return React.forwardRef((props, ref) => 
      React.createElement(Component, { ...props, ref })
    );
  };
  
  Object.keys(ReactNative).forEach(key => {
    styled[key] = styled(ReactNative[key]);
  });
  
  return {
    __esModule: true,
    default: styled,
    ThemeProvider: ({ children }) => children,
    useTheme: () => ({
      colors: {
        primary: '#007AFF',
        background: '#FFFFFF',
        text: '#000000',
      },
      spacing: { md: 16, lg: 24 },
      typography: { body: 16, h1: 32 },
    }),
  };
});

// Silence the warning about AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

global.__reanimatedWorkletInit = jest.fn();