import * as React from 'react';

import { initializeDatabase, type AppDatabase } from '@/data/database';
import { createBatch, getActiveBatch, listBatches } from '@/data/repositories/batch-repository';
import { getSettings, updateSettings, type AppSettings } from '@/data/repositories/settings-repository';
import { listTips, type Tip } from '@/data/repositories/tip-repository';
import type { BatchInput, UmeshuBatch } from '@/domain/umeshu';
import { translate, type TranslationKey } from '@/i18n';
import type { AppLocale } from '@/i18n/resources';

type AppContextValue = {
  db: AppDatabase | null;
  isReady: boolean;
  error: string | null;
  settings: AppSettings | null;
  batches: UmeshuBatch[];
  activeBatch: UmeshuBatch | null;
  tips: Tip[];
  locale: AppLocale;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  reload: () => Promise<void>;
  setLocale: (locale: AppLocale) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  setAnalyticsOptOut: (value: boolean) => Promise<void>;
  addBatch: (input: BatchInput) => Promise<void>;
};

const AppContext = React.createContext<AppContextValue | null>(null);

export function AppProvider({ children }: React.PropsWithChildren) {
  const [db, setDb] = React.useState<AppDatabase | null>(null);
  const [settings, setSettings] = React.useState<AppSettings | null>(null);
  const [tips, setTips] = React.useState<Tip[]>([]);
  const [batches, setBatches] = React.useState<UmeshuBatch[]>([]);
  const [activeBatch, setActiveBatch] = React.useState<UmeshuBatch | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loadData = React.useCallback(async (database: AppDatabase) => {
    const [nextSettings, nextTips, nextBatches, nextActiveBatch] = await Promise.all([
      getSettings(database),
      listTips(database),
      listBatches(database),
      getActiveBatch(database),
    ]);
    setSettings(nextSettings);
    setTips(nextTips);
    setBatches(nextBatches);
    setActiveBatch(nextActiveBatch);
  }, []);

  const bootstrap = React.useCallback(async () => {
    try {
      setError(null);
      const database = await initializeDatabase();
      setDb(database);
      await loadData(database);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unknown error');
    } finally {
      setIsReady(true);
    }
  }, [loadData]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      void bootstrap();
    }, 0);
    return () => clearTimeout(timeout);
  }, [bootstrap]);

  const reload = React.useCallback(async () => {
    if (!db) {
      await bootstrap();
      return;
    }
    await loadData(db);
  }, [bootstrap, db, loadData]);

  const locale = settings?.locale ?? 'en';

  const t = React.useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => translate(locale, key, params),
    [locale],
  );

  const setLocale = React.useCallback(
    async (nextLocale: AppLocale) => {
      if (!db) {
        return;
      }
      const nextSettings = await updateSettings(db, { locale: nextLocale });
      setSettings(nextSettings);
    },
    [db],
  );

  const completeOnboarding = React.useCallback(async () => {
    if (!db) {
      return;
    }
    const nextSettings = await updateSettings(db, { onboardingCompleted: true });
    setSettings(nextSettings);
  }, [db]);

  const setAnalyticsOptOut = React.useCallback(
    async (value: boolean) => {
      if (!db) {
        return;
      }
      const nextSettings = await updateSettings(db, { analyticsOptOut: value });
      setSettings(nextSettings);
    },
    [db],
  );

  const addBatch = React.useCallback(
    async (input: BatchInput) => {
      if (!db) {
        return;
      }
      await createBatch(db, input);
      await loadData(db);
    },
    [db, loadData],
  );

  const value = React.useMemo<AppContextValue>(
    () => ({
      db,
      isReady,
      error,
      settings,
      batches,
      activeBatch,
      tips,
      locale,
      t,
      reload,
      setLocale,
      completeOnboarding,
      setAnalyticsOptOut,
      addBatch,
    }),
    [
      db,
      isReady,
      error,
      settings,
      batches,
      activeBatch,
      tips,
      locale,
      t,
      reload,
      setLocale,
      completeOnboarding,
      setAnalyticsOptOut,
      addBatch,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = React.use(AppContext);
  if (!value) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return value;
}
