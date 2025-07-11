// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  typography: {
    h1: number;
    h2: number;
    h3: number;
    body: number;
    caption: number;
  };
}

// App State Types
export interface AppState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  user: User | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Details: { id: string };
};

export type TabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
};

// Component Props
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
}

export interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  elevation?: number;
}

export interface ScreenContainerProps {
  children: ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
}

export type ReactNode = any;