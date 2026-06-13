export type BatchStatus = 'active' | 'ready' | 'bottled';

export type TipCategoryCode = 'prep' | 'storage' | 'troubleshooting' | 'serving';

export type MilestoneCode =
  | 'prep_day'
  | 'first_shake'
  | 'monthly_check'
  | 'taste_window'
  | 'bottling_window'
  | 'one_year';

export type MilestoneState = 'done' | 'due' | 'upcoming';

export type UmeshuBatch = {
  id: string;
  name: string;
  startDateISO: string;
  plumGrams: number;
  sugarGrams: number;
  liquorMl: number;
  status: BatchStatus;
  imageUri: string | null;
  createdAtISO: string;
  updatedAtISO: string;
};

export type BatchInput = {
  name: string;
  startDateISO: string;
  plumGrams: number;
  sugarGrams: number;
  liquorMl: number;
  imageUri?: string | null;
};

export type AgingMilestone = {
  code: MilestoneCode;
  dateISO: string;
  state: MilestoneState;
};

export type BatchSummary = {
  daysAging: number;
  sugarRatio: number;
  nextMilestone: AgingMilestone | null;
  milestones: AgingMilestone[];
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function assertISODate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Expected YYYY-MM-DD date, received "${value}"`);
  }
}

export function parseISODate(value: string) {
  assertISODate(value);
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function formatISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function addDays(dateISO: string, days: number) {
  const date = parseISODate(dateISO);
  date.setUTCDate(date.getUTCDate() + days);
  return formatISODate(date);
}

export function addMonths(dateISO: string, months: number) {
  const date = parseISODate(dateISO);
  const originalDay = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(originalDay, lastDay));
  return formatISODate(date);
}

export function daysBetween(startDateISO: string, endDateISO: string) {
  const start = parseISODate(startDateISO).getTime();
  const end = parseISODate(endDateISO).getTime();
  return Math.floor((end - start) / DAY_MS);
}

export function getMilestoneState(dateISO: string, todayISO: string): MilestoneState {
  const diff = daysBetween(todayISO, dateISO);
  if (diff < 0) {
    return 'done';
  }
  if (diff <= 2) {
    return 'due';
  }
  return 'upcoming';
}

export function buildAgingTimeline(startDateISO: string, todayISO: string): AgingMilestone[] {
  assertISODate(startDateISO);
  assertISODate(todayISO);

  const milestones: { code: MilestoneCode; dateISO: string }[] = [
    { code: 'prep_day', dateISO: startDateISO },
    { code: 'first_shake', dateISO: addDays(startDateISO, 7) },
    { code: 'monthly_check', dateISO: addMonths(startDateISO, 1) },
    { code: 'taste_window', dateISO: addMonths(startDateISO, 3) },
    { code: 'bottling_window', dateISO: addMonths(startDateISO, 6) },
    { code: 'one_year', dateISO: addMonths(startDateISO, 12) },
  ];

  return milestones.map((milestone) => ({
    ...milestone,
    state: getMilestoneState(milestone.dateISO, todayISO),
  }));
}

export function getNextMilestone(milestones: AgingMilestone[]) {
  return milestones.find((milestone) => milestone.state !== 'done') ?? null;
}

export function calculateSugarRatio(plumGrams: number, sugarGrams: number) {
  if (plumGrams <= 0 || sugarGrams < 0) {
    return 0;
  }
  return Math.round((sugarGrams / plumGrams) * 100) / 100;
}

export function summarizeBatch(batch: UmeshuBatch, todayISO: string): BatchSummary {
  const milestones = buildAgingTimeline(batch.startDateISO, todayISO);

  return {
    daysAging: Math.max(0, daysBetween(batch.startDateISO, todayISO)),
    sugarRatio: calculateSugarRatio(batch.plumGrams, batch.sugarGrams),
    nextMilestone: getNextMilestone(milestones),
    milestones,
  };
}

export function normalizeBatchInput(input: BatchInput): BatchInput {
  assertISODate(input.startDateISO);

  return {
    name: input.name.trim(),
    startDateISO: input.startDateISO,
    plumGrams: Math.max(0, Math.round(input.plumGrams)),
    sugarGrams: Math.max(0, Math.round(input.sugarGrams)),
    liquorMl: Math.max(0, Math.round(input.liquorMl)),
    imageUri: input.imageUri ?? null,
  };
}

export function isValidBatchInput(input: BatchInput) {
  try {
    const normalized = normalizeBatchInput(input);
    return (
      normalized.name.length > 0 &&
      normalized.plumGrams > 0 &&
      normalized.sugarGrams > 0 &&
      normalized.liquorMl > 0
    );
  } catch {
    return false;
  }
}
