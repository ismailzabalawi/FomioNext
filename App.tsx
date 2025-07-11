import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import { AppProvider } from './src/context/app-context';
import { useColorScheme } from './src/hooks/use-color-scheme';
import { theme } from './src/theme/theme';
import { RootNavigator } from './src/navigation/root-navigator';
import { ErrorBoundary } from './src/components/error-boundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App(): JSX.Element {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? theme.dark : theme.light;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={currentTheme}>
          <SafeAreaProvider>
            <AppProvider>
              <NavigationContainer>
                <RootNavigator />
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
              </NavigationContainer>
            </AppProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;