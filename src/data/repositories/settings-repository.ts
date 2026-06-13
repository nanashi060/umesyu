import type { AppLocale } from '@/i18n/resources';

import type { AppDatabase } from '../database';

const SETTINGS_ID = 'default';

export type AppSettings = {
  id: string;
  locale: AppLocale;
  onboardingCompleted: boolean;
  firstLaunchAtISO: string;
  appLaunchCount: number;
  reminderHour: number;
  reminderMinute: number;
  lastReviewAttemptedVersion: string | null;
  analyticsOptOut: boolean;
  purchaseEntitlementActive: boolean;
  updatedAtISO: string;
};

type SettingsRow = {
  id: string;
  locale: AppLocale;
  onboarding_completed: number;
  first_launch_at_iso: string;
  app_launch_count: number;
  reminder_hour: number;
  reminder_minute: number;
  last_review_attempted_version: string | null;
  analytics_opt_out: number;
  purchase_entitlement_active: number;
  updated_at_iso: string;
};

function mapSettingsRow(row: SettingsRow): AppSettings {
  return {
    id: row.id,
    locale: row.locale === 'ja' ? 'ja' : 'en',
    onboardingCompleted: row.onboarding_completed === 1,
    firstLaunchAtISO: row.first_launch_at_iso,
    appLaunchCount: row.app_launch_count,
    reminderHour: row.reminder_hour,
    reminderMinute: row.reminder_minute,
    lastReviewAttemptedVersion: row.last_review_attempted_version,
    analyticsOptOut: row.analytics_opt_out === 1,
    purchaseEntitlementActive: row.purchase_entitlement_active === 1,
    updatedAtISO: row.updated_at_iso,
  };
}

export async function ensureSettings(db: AppDatabase, locale: AppLocale, nowISO: string) {
  await db.runAsync(
    `INSERT OR IGNORE INTO app_settings (
      id,
      locale,
      onboarding_completed,
      first_launch_at_iso,
      app_launch_count,
      reminder_hour,
      reminder_minute,
      updated_at_iso
    ) VALUES (?, ?, 0, ?, 0, 9, 0, ?);`,
    SETTINGS_ID,
    locale,
    nowISO,
    nowISO,
  );
}

export async function getSettings(db: AppDatabase) {
  const row = await db.getFirstAsync<SettingsRow>('SELECT * FROM app_settings WHERE id = ?;', SETTINGS_ID);
  if (!row) {
    throw new Error('Settings row is missing');
  }
  return mapSettingsRow(row);
}

export async function incrementLaunchCount(db: AppDatabase, nowISO: string) {
  await db.runAsync(
    'UPDATE app_settings SET app_launch_count = app_launch_count + 1, updated_at_iso = ? WHERE id = ?;',
    nowISO,
    SETTINGS_ID,
  );
}

export async function updateSettings(
  db: AppDatabase,
  patch: Partial<Pick<AppSettings, 'locale' | 'onboardingCompleted' | 'reminderHour' | 'reminderMinute' | 'analyticsOptOut' | 'lastReviewAttemptedVersion'>>,
  nowISO = new Date().toISOString(),
) {
  const current = await getSettings(db);
  await db.runAsync(
    `UPDATE app_settings
      SET locale = ?,
          onboarding_completed = ?,
          reminder_hour = ?,
          reminder_minute = ?,
          analytics_opt_out = ?,
          last_review_attempted_version = ?,
          updated_at_iso = ?
      WHERE id = ?;`,
    patch.locale ?? current.locale,
    (patch.onboardingCompleted ?? current.onboardingCompleted) ? 1 : 0,
    patch.reminderHour ?? current.reminderHour,
    patch.reminderMinute ?? current.reminderMinute,
    (patch.analyticsOptOut ?? current.analyticsOptOut) ? 1 : 0,
    patch.lastReviewAttemptedVersion ?? current.lastReviewAttemptedVersion,
    nowISO,
    SETTINGS_ID,
  );
  return getSettings(db);
}
