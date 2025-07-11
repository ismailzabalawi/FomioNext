import { Theme } from '@/types';

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
};

const typography = {
  h1: 32,
  h2: 24,
  h3: 20,
  body: 16,
  caption: 14,
};

const lightColors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  text: '#000000',
  textSecondary: '#6D6D70',
  border: '#C6C6C8',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
};

const darkColors = {
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  background: '#000000',
  surface: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#AEAEB2',
  border: '#38383A',
  error: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
};

export const theme = {
  light: {
    colors: lightColors,
    spacing,
    borderRadius,
    typography,
  } as Theme,
  dark: {
    colors: darkColors,
    spacing,
    borderRadius,
    typography,
  } as Theme,
};