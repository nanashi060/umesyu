import { Share } from 'react-native';

import { buildShareText } from '@/domain/share';
import type { AppLocale } from '@/i18n/resources';

import { environment } from './environment';

export async function shareBatchProgress(input: {
  locale: AppLocale;
  startDateISO: string;
  todayISO: string;
}) {
  const message = buildShareText({
    ...input,
    appUrl: environment.publicAppUrl,
  });
  return Share.share({ message });
}

