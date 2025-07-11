import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, User } from '@/types';

interface AppContextType {
  state: AppState;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

const initialState: AppState = {
  isLoading: false,
  hasError: false,
  errorMessage: null,
  user: null,
};

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'CLEAR_ERROR' };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return {
        ...state,
        hasError: action.payload !== null,
        errorMessage: action.payload,
        isLoading: false,
      };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, hasError: false, errorMessage: null };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AppContextType = {
    state,
    setLoading,
    setError,
    setUser,
    clearError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}