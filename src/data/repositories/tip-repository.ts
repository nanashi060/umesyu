import type { LocalizedText } from '@/domain/localized-text';
import type { TipCategoryCode } from '@/domain/umeshu';
import { tipSeeds } from '@/data/seeds/tips';

import type { AppDatabase } from '../database';

export type Tip = {
  id: string;
  category: TipCategoryCode;
  title: LocalizedText;
  body: LocalizedText;
  sortOrder: number;
};

type TipRow = {
  id: string;
  category: TipCategoryCode;
  title_en: string;
  title_ja: string;
  body_en: string;
  body_ja: string;
  sort_order: number;
};

function mapTipRow(row: TipRow): Tip {
  return {
    id: row.id,
    category: row.category,
    title: {
      en: row.title_en,
      ja: row.title_ja,
    },
    body: {
      en: row.body_en,
      ja: row.body_ja,
    },
    sortOrder: row.sort_order,
  };
}

export async function seedTips(db: AppDatabase) {
  for (const tip of tipSeeds) {
    await db.runAsync(
      `INSERT OR IGNORE INTO tips (
        id,
        category,
        title_en,
        title_ja,
        body_en,
        body_ja,
        sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      tip.id,
      tip.category,
      tip.title.en,
      tip.title.ja,
      tip.body.en,
      tip.body.ja,
      tip.sortOrder,
    );
  }
}

export async function listTips(db: AppDatabase) {
  const rows = await db.getAllAsync<TipRow>('SELECT * FROM tips ORDER BY sort_order ASC;');
  return rows.map(mapTipRow);
}

