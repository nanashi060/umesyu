import { daysBetween } from './umeshu';
import type { AppLocale } from './localized-text';

export type ShareTextInput = {
  locale: AppLocale;
  startDateISO: string;
  todayISO: string;
  appUrl: string;
};

export function buildShareText(input: ShareTextInput) {
  const daysAging = Math.max(0, daysBetween(input.startDateISO, input.todayISO));

  if (input.locale === 'ja') {
    return `梅酒を${daysAging}日熟成中。仕込みメモとリマインダーは Umeshu Notes で管理しています。 ${input.appUrl}`;
  }

  return `My homemade umeshu has been aging for ${daysAging} days. I track notes and reminders with Umeshu Notes. ${input.appUrl}`;
}

