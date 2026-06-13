import * as React from 'react';
import { View } from 'react-native';

import { BottomNav } from '@/components/bottom-nav';
import { AppText, Card, Chip, Screen, TextField, spacing } from '@/components/design-system';
import { pickLocalizedText } from '@/domain/localized-text';
import type { TipCategoryCode } from '@/domain/umeshu';
import { useApp } from '@/providers/app-provider';
import { captureEvent } from '@/services/analytics';

const categories: (TipCategoryCode | 'all')[] = ['all', 'prep', 'storage', 'troubleshooting', 'serving'];

export function TipsScreen() {
  const { locale, settings, t, tips } = useApp();
  const [selectedCategory, setSelectedCategory] = React.useState<TipCategoryCode | 'all'>('all');
  const [query, setQuery] = React.useState('');

  const visibleTips = tips.filter((tip) => {
    const categoryMatches = selectedCategory === 'all' || tip.category === selectedCategory;
    const haystack = `${tip.title.en} ${tip.title.ja} ${tip.body.en} ${tip.body.ja}`.toLowerCase();
    return categoryMatches && haystack.includes(query.toLowerCase().trim());
  });

  return (
    <Screen footer={<BottomNav />}>
      <AppText variant="title">{t('tips.title')}</AppText>
      <TextField label={t('tips.searchPlaceholder')} value={query} onChangeText={setQuery} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
        {categories.map((category) => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            label={category === 'all' ? t('tips.all') : t(`categories.${category}`)}
            onPress={() => setSelectedCategory(category)}
          />
        ))}
      </View>
      {visibleTips.map((tip) => (
        <Card
          key={tip.id}
          onTouchEnd={() => {
            void captureEvent('tip_opened', { tip_id: tip.id, category: tip.category }, settings?.analyticsOptOut);
          }}>
          <AppText variant="label" tone="primary">
            {t(`categories.${tip.category}`)}
          </AppText>
          <AppText variant="heading">{pickLocalizedText(tip.title, locale)}</AppText>
          <AppText tone="muted">{pickLocalizedText(tip.body, locale)}</AppText>
        </Card>
      ))}
    </Screen>
  );
}
