import * as React from 'react';
import { useRouter } from 'expo-router';

import { AppText, Button, Card, Screen, spacing } from '@/components/design-system';
import { useApp } from '@/providers/app-provider';
import { captureEvent } from '@/services/analytics';

export function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding, isReady, settings, t } = useApp();

  React.useEffect(() => {
    if (isReady && settings?.onboardingCompleted) {
      router.replace('/');
    }
  }, [isReady, router, settings]);

  async function finish() {
    await completeOnboarding();
    await captureEvent('onboarding_completed', {}, settings?.analyticsOptOut);
    router.replace('/');
  }

  return (
    <Screen contentContainerStyle={{ justifyContent: 'center', flexGrow: 1, gap: spacing.lg }}>
      <AppText variant="title">{t('onboarding.title')}</AppText>
      <Card>
        <AppText>{t('onboarding.stepOne')}</AppText>
        <AppText>{t('onboarding.stepTwo')}</AppText>
        <AppText>{t('onboarding.stepThree')}</AppText>
      </Card>
      <Button label={t('onboarding.complete')} onPress={finish} />
      <Button label={t('onboarding.skip')} variant="ghost" onPress={finish} />
    </Screen>
  );
}

