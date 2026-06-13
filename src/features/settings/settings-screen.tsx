import * as React from 'react';
import { Link } from 'expo-router';
import { Switch, View } from 'react-native';

import { BottomNav } from '@/components/bottom-nav';
import { AppText, Button, Card, Chip, Screen, spacing, useDesignTheme } from '@/components/design-system';
import { summarizeBatch } from '@/domain/umeshu';
import { useApp } from '@/providers/app-provider';
import { captureEvent } from '@/services/analytics';
import { openUmeshuSupplySearch } from '@/services/affiliate';
import { scheduleLocalReminder } from '@/services/notifications';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function SettingsScreen() {
  const theme = useDesignTheme();
  const { activeBatch, locale, settings, setAnalyticsOptOut, setLocale, t } = useApp();
  const [notice, setNotice] = React.useState<string | null>(null);
  const nextMilestone = activeBatch ? summarizeBatch(activeBatch, todayISO()).nextMilestone : null;

  return (
    <Screen footer={<BottomNav />}>
      <AppText variant="title">{t('settings.title')}</AppText>

      <Card>
        <AppText variant="heading">{t('settings.language')}</AppText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          <Chip selected={locale === 'ja'} label={t('settings.japanese')} onPress={() => setLocale('ja')} />
          <Chip selected={locale === 'en'} label={t('settings.english')} onPress={() => setLocale('en')} />
        </View>
      </Card>

      <Card>
        <AppText variant="heading">{t('settings.notifications')}</AppText>
        <AppText tone="muted">
          {nextMilestone ? `${t(`milestones.${nextMilestone.code}`)}: ${nextMilestone.dateISO}` : t('common.notSet')}
        </AppText>
        <Button
          label={t('settings.scheduleReminder')}
          disabled={!nextMilestone}
          onPress={async () => {
            if (!nextMilestone || !settings) {
              return;
            }
            const result = await scheduleLocalReminder({
              milestone: nextMilestone,
              hour: settings.reminderHour,
              minute: settings.reminderMinute,
              title: t('notifications.title'),
              body: t('notifications.body', { milestone: t(`milestones.${nextMilestone.code}`) }),
            });
            if (result.status === 'scheduled') {
              await captureEvent('reminder_scheduled', { milestone: nextMilestone.code }, settings.analyticsOptOut);
              setNotice(t('settings.scheduleResult'));
            } else if (result.status === 'permission_denied') {
              setNotice(t('notifications.permissionDenied'));
            } else {
              setNotice(t('notifications.unavailable'));
            }
          }}
        />
        {notice ? <AppText tone="muted">{notice}</AppText> : null}
      </Card>

      <Card>
        <AppText variant="heading">{t('settings.privacy')}</AppText>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md }}>
          <AppText>{t('settings.analyticsOptOut')}</AppText>
          <Switch
            value={Boolean(settings?.analyticsOptOut)}
            onValueChange={setAnalyticsOptOut}
            trackColor={{ true: theme.success, false: theme.surfaceMuted }}
            thumbColor={theme.surface}
          />
        </View>
      </Card>

      <Card>
        <AppText variant="heading">{t('settings.affiliate')}</AppText>
        <AppText tone="muted">{t('settings.affiliateDisclosure')}</AppText>
        <Button
          label={t('settings.openAmazon')}
          variant="secondary"
          onPress={async () => {
            await openUmeshuSupplySearch(['保存瓶', '氷砂糖']);
            await captureEvent('affiliate_search_opened', { topic: 'supplies' }, settings?.analyticsOptOut);
          }}
        />
      </Card>

      <Card>
        <AppText variant="heading">{t('settings.internal')}</AppText>
        <Link href="/design-system" asChild>
          <Button label={t('settings.openDesignSystem')} variant="ghost" />
        </Link>
      </Card>
    </Screen>
  );
}

