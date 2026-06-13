import { View } from 'react-native';

import { BottomNav } from '@/components/bottom-nav';
import {
  AppText,
  Button,
  Card,
  Chip,
  Screen,
  colors,
  palette,
  radius,
  spacing,
  useDesignTheme,
} from '@/components/design-system';
import { useApp } from '@/providers/app-provider';

export function DesignSystemScreen() {
  const { t } = useApp();
  const theme = useDesignTheme();

  return (
    <Screen footer={<BottomNav />}>
      <AppText variant="title">{t('designSystem.title')}</AppText>

      <Card>
        <AppText variant="heading">{t('designSystem.colors')}</AppText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          {Object.entries(palette).map(([name, value]) => (
            <View key={name} style={{ width: 96, gap: spacing.xs }}>
              <View style={{ height: 44, borderRadius: radius.sm, backgroundColor: value }} />
              <AppText variant="label">{name}</AppText>
            </View>
          ))}
        </View>
        <AppText tone="muted">Light primary: {colors.light.primary}</AppText>
        <AppText tone="muted">Current border: {theme.border}</AppText>
      </Card>

      <Card>
        <AppText variant="heading">{t('designSystem.typography')}</AppText>
        <AppText variant="title">Title</AppText>
        <AppText variant="heading">Heading</AppText>
        <AppText>Body text</AppText>
        <AppText variant="small" tone="muted">
          Small muted text
        </AppText>
      </Card>

      <Card>
        <AppText variant="heading">{t('designSystem.components')}</AppText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          <Button label="Primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Ghost" variant="ghost" />
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          <Chip label="Selected" selected />
          <Chip label="Idle" />
        </View>
      </Card>

      <Card>
        <AppText variant="label" tone="primary">
          {t('designSystem.sampleCard')}
        </AppText>
        <AppText variant="heading">{t('milestones.taste_window')}</AppText>
        <AppText tone="muted">2026-09-13</AppText>
      </Card>
    </Screen>
  );
}

