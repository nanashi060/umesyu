import * as React from 'react';
import { Image } from 'expo-image';
import { View } from 'react-native';

import { BottomNav } from '@/components/bottom-nav';
import { AppText, Button, Card, Screen, TextField, spacing } from '@/components/design-system';
import { buildAgingTimeline, isValidBatchInput, summarizeBatch, type BatchInput } from '@/domain/umeshu';
import { useApp } from '@/providers/app-provider';
import { captureEvent } from '@/services/analytics';
import { pickBatchImage } from '@/services/image-picker';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function BatchesScreen() {
  const { addBatch, batches, settings, t } = useApp();
  const [form, setForm] = React.useState({
    name: '',
    startDateISO: todayISO(),
    plumGrams: '1000',
    sugarGrams: '600',
    liquorMl: '1800',
    imageUri: null as string | null,
  });
  const [notice, setNotice] = React.useState<string | null>(null);

  const batchInput: BatchInput = {
    name: form.name,
    startDateISO: form.startDateISO,
    plumGrams: Number(form.plumGrams),
    sugarGrams: Number(form.sugarGrams),
    liquorMl: Number(form.liquorMl),
    imageUri: form.imageUri,
  };

  return (
    <Screen footer={<BottomNav />}>
      <AppText variant="title">{t('batches.title')}</AppText>

      <Card>
        <AppText variant="heading">{t('batches.newBatch')}</AppText>
        <TextField
          label={t('batches.batchName')}
          value={form.name}
          onChangeText={(name) => setForm((current) => ({ ...current, name }))}
          placeholder="2026 plum batch"
        />
        <TextField
          label={t('batches.startDate')}
          value={form.startDateISO}
          onChangeText={(startDateISO) => setForm((current) => ({ ...current, startDateISO }))}
          placeholder="YYYY-MM-DD"
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          <TextField
            label={t('batches.plumGrams')}
            value={form.plumGrams}
            keyboardType="number-pad"
            onChangeText={(plumGrams) => setForm((current) => ({ ...current, plumGrams }))}
            style={{ minWidth: 120 }}
          />
          <TextField
            label={t('batches.sugarGrams')}
            value={form.sugarGrams}
            keyboardType="number-pad"
            onChangeText={(sugarGrams) => setForm((current) => ({ ...current, sugarGrams }))}
            style={{ minWidth: 120 }}
          />
          <TextField
            label={t('batches.liquorMl')}
            value={form.liquorMl}
            keyboardType="number-pad"
            onChangeText={(liquorMl) => setForm((current) => ({ ...current, liquorMl }))}
            style={{ minWidth: 120 }}
          />
        </View>
        {form.imageUri ? (
          <Image source={{ uri: form.imageUri }} style={{ width: '100%', aspectRatio: 16 / 9, borderRadius: 8 }} />
        ) : null}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          <Button
            label={t('batches.pickPhoto')}
            variant="secondary"
            onPress={async () => {
              const result = await pickBatchImage();
              if (result.status === 'selected') {
                setForm((current) => ({ ...current, imageUri: result.uri }));
              }
            }}
          />
          <Button
            label={t('batches.saveBatch')}
            disabled={!isValidBatchInput(batchInput)}
            onPress={async () => {
              if (!isValidBatchInput(batchInput)) {
                setNotice(t('batches.invalid'));
                return;
              }
              await addBatch(batchInput);
              await captureEvent('batch_created', { has_photo: Boolean(form.imageUri) }, settings?.analyticsOptOut);
              setForm({
                name: '',
                startDateISO: todayISO(),
                plumGrams: '1000',
                sugarGrams: '600',
                liquorMl: '1800',
                imageUri: null,
              });
              setNotice(t('batches.saved'));
            }}
          />
        </View>
        {notice ? <AppText tone="muted">{notice}</AppText> : null}
      </Card>

      {batches.length === 0 ? (
        <Card>
          <AppText variant="heading">{t('batches.emptyTitle')}</AppText>
          <AppText tone="muted">{t('batches.emptyBody')}</AppText>
        </Card>
      ) : (
        batches.map((batch) => {
          const summary = summarizeBatch(batch, todayISO());
          return (
            <Card key={batch.id}>
              <AppText variant="heading">{batch.name}</AppText>
              <AppText tone="muted">{t('home.daysAging', { count: summary.daysAging })}</AppText>
              <View style={{ gap: spacing.xs }}>
                {buildAgingTimeline(batch.startDateISO, todayISO()).map((milestone) => (
                  <View
                    key={milestone.code}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: spacing.sm,
                    }}>
                    <AppText>{t(`milestones.${milestone.code}`)}</AppText>
                    <AppText tone={milestone.state === 'due' ? 'primary' : 'muted'}>{milestone.dateISO}</AppText>
                  </View>
                ))}
              </View>
            </Card>
          );
        })
      )}
    </Screen>
  );
}

