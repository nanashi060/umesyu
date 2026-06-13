export const DATABASE_NAME = 'umeshu.db';

export const migrations = [
  {
    id: 1,
    statements: `
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id INTEGER PRIMARY KEY,
        applied_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS app_settings (
        id TEXT PRIMARY KEY NOT NULL,
        locale TEXT NOT NULL,
        onboarding_completed INTEGER NOT NULL DEFAULT 0,
        first_launch_at_iso TEXT NOT NULL,
        app_launch_count INTEGER NOT NULL DEFAULT 0,
        reminder_hour INTEGER NOT NULL DEFAULT 9,
        reminder_minute INTEGER NOT NULL DEFAULT 0,
        last_review_attempted_version TEXT,
        analytics_opt_out INTEGER NOT NULL DEFAULT 0,
        purchase_entitlement_active INTEGER NOT NULL DEFAULT 0,
        updated_at_iso TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tips (
        id TEXT PRIMARY KEY NOT NULL,
        category TEXT NOT NULL,
        title_en TEXT NOT NULL,
        title_ja TEXT NOT NULL,
        body_en TEXT NOT NULL,
        body_ja TEXT NOT NULL,
        sort_order INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS batches (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        start_date_iso TEXT NOT NULL,
        plum_grams INTEGER NOT NULL,
        sugar_grams INTEGER NOT NULL,
        liquor_ml INTEGER NOT NULL,
        status TEXT NOT NULL,
        image_uri TEXT,
        created_at_iso TEXT NOT NULL,
        updated_at_iso TEXT NOT NULL
      );
    `,
  },
] as const;

