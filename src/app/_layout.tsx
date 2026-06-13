import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useColorScheme } from 'react-native';

import { AppProvider, useApp } from '@/providers/app-provider';

function RootStack() {
  const { t } = useApp();

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerBackButtonDisplayMode: 'minimal',
      }}>
      <Stack.Screen name="index" options={{ title: t('nav.home') }} />
      <Stack.Screen name="batches" options={{ title: t('nav.batches') }} />
      <Stack.Screen name="tips" options={{ title: t('nav.tips') }} />
      <Stack.Screen name="settings" options={{ title: t('nav.settings') }} />
      <Stack.Screen name="onboarding" options={{ title: t('nav.onboarding'), headerShown: false }} />
      <Stack.Screen name="design-system" options={{ title: t('nav.designSystem') }} />
    </Stack>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppProvider>
        <RootStack />
      </AppProvider>
    </ThemeProvider>
  );
}
