import { createLocalId } from '@/domain/ids';
import {
  normalizeBatchInput,
  type BatchInput,
  type BatchStatus,
  type UmeshuBatch,
} from '@/domain/umeshu';

import type { AppDatabase } from '../database';

type BatchRow = {
  id: string;
  name: string;
  start_date_iso: string;
  plum_grams: number;
  sugar_grams: number;
  liquor_ml: number;
  status: BatchStatus;
  image_uri: string | null;
  created_at_iso: string;
  updated_at_iso: string;
};

function mapBatchRow(row: BatchRow): UmeshuBatch {
  return {
    id: row.id,
    name: row.name,
    startDateISO: row.start_date_iso,
    plumGrams: row.plum_grams,
    sugarGrams: row.sugar_grams,
    liquorMl: row.liquor_ml,
    status: row.status,
    imageUri: row.image_uri,
    createdAtISO: row.created_at_iso,
    updatedAtISO: row.updated_at_iso,
  };
}

export async function listBatches(db: AppDatabase) {
  const rows = await db.getAllAsync<BatchRow>('SELECT * FROM batches ORDER BY start_date_iso DESC, created_at_iso DESC;');
  return rows.map(mapBatchRow);
}

export async function getActiveBatch(db: AppDatabase) {
  const row = await db.getFirstAsync<BatchRow>(
    "SELECT * FROM batches WHERE status = 'active' ORDER BY start_date_iso DESC, created_at_iso DESC LIMIT 1;",
  );
  return row ? mapBatchRow(row) : null;
}

export async function createBatch(db: AppDatabase, input: BatchInput, nowISO = new Date().toISOString()) {
  const batch = normalizeBatchInput(input);
  const id = createLocalId('batch');

  await db.runAsync(
    `INSERT INTO batches (
      id,
      name,
      start_date_iso,
      plum_grams,
      sugar_grams,
      liquor_ml,
      status,
      image_uri,
      created_at_iso,
      updated_at_iso
    ) VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?, ?);`,
    id,
    batch.name,
    batch.startDateISO,
    batch.plumGrams,
    batch.sugarGrams,
    batch.liquorMl,
    batch.imageUri ?? null,
    nowISO,
    nowISO,
  );

  const rows = await listBatches(db);
  return rows.find((row) => row.id === id) ?? null;
}

