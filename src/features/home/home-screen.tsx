import * as React from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { BottomNav } from '@/components/bottom-nav';
import { AppText, Button, Card, Screen, spacing } from '@/components/design-system';
import { summarizeBatch } from '@/domain/umeshu';
import { useApp } from '@/providers/app-provider';
import { captureEvent } from '@/services/analytics';
import { shareBatchProgress } from '@/services/share';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function HomeScreen() {
  const router = useRouter();
  const { activeBatch, error, isReady, locale, settings, t } = useApp();

  React.useEffect(() => {
    if (isReady && settings && !settings.onboardingCompleted) {
      router.replace('/onboarding');
    }
  }, [isReady, router, settings]);

  if (!isReady) {
    return (
      <Screen footer={<BottomNav />}>
        <AppText>{t('common.loading')}</AppText>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen footer={<BottomNav />}>
        <Card>
          <AppText variant="heading" tone="danger">
            {t('errors.generic')}
          </AppText>
          <AppText tone="muted">{error}</AppText>
        </Card>
      </Screen>
    );
  }

  const summary = activeBatch ? summarizeBatch(activeBatch, todayISO()) : null;
  const nextMilestone = summary?.nextMilestone;

  return (
    <Screen footer={<BottomNav />}>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="title">{t('home.title')}</AppText>
        <AppText tone="muted">{t('home.subtitle')}</AppText>
      </View>

      {activeBatch && summary ? (
        <Card>
          <AppText variant="label" tone="primary">
            {t('home.activeBatch')}
          </AppText>
          <AppText variant="heading">{activeBatch.name}</AppText>
          <AppText tone="muted">{t('home.daysAging', { count: summary.daysAging })}</AppText>
          <AppText tone="muted">{t('home.sugarRatio', { ratio: summary.sugarRatio })}</AppText>
          {nextMilestone ? (
            <View style={{ gap: spacing.xs }}>
              <AppText variant="label">{t('home.nextReminder')}</AppText>
              <AppText>
                {t(`milestones.${nextMilestone.code}`)}: {nextMilestone.dateISO}
              </AppText>
            </View>
          ) : null}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
            <Button label={t('home.viewBatches')} onPress={() => router.push('/batches')} />
            <Button
              label="Share"
              variant="secondary"
              onPress={async () => {
                await captureEvent('share_started', { batch_id: activeBatch.id }, settings?.analyticsOptOut);
                await shareBatchProgress({
                  locale,
                  startDateISO: activeBatch.startDateISO,
                  todayISO: todayISO(),
                });
              }}
            />
          </View>
        </Card>
      ) : (
        <Card>
          <AppText variant="heading">{t('home.noBatchTitle')}</AppText>
          <AppText tone="muted">{t('home.noBatchBody')}</AppText>
          <Button label={t('home.createBatch')} onPress={() => router.push('/batches')} />
        </Card>
      )}
    </Screen>
  );
}

