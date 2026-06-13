import * as SQLite from 'expo-sqlite';

import { getDeviceLocale } from '@/i18n';

import { seedTips } from './repositories/tip-repository';
import { ensureSettings, incrementLaunchCount } from './repositories/settings-repository';
import { DATABASE_NAME, migrations } from './schema';

export type AppDatabase = SQLite.SQLiteDatabase;

export async function openAppDatabase() {
  return SQLite.openDatabaseAsync(DATABASE_NAME);
}

export async function runMigrations(db: AppDatabase, nowISO = new Date().toISOString()) {
  await db.execAsync('CREATE TABLE IF NOT EXISTS schema_migrations (id INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);');
  const rows = await db.getAllAsync<{ id: number }>('SELECT id FROM schema_migrations;');
  const appliedIds = new Set(rows.map((row) => row.id));

  for (const migration of migrations) {
    if (!appliedIds.has(migration.id)) {
      await db.execAsync(migration.statements);
      await db.runAsync('INSERT INTO schema_migrations (id, applied_at) VALUES (?, ?);', migration.id, nowISO);
    }
  }
}

export async function initializeDatabase(nowISO = new Date().toISOString()) {
  const db = await openAppDatabase();
  await runMigrations(db, nowISO);
  await ensureSettings(db, getDeviceLocale(), nowISO);
  await incrementLaunchCount(db, nowISO);
  await seedTips(db);
  return db;
}

