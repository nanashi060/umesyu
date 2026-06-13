import { describe, expect, it } from 'vitest';

import { addMonths, buildAgingTimeline, calculateSugarRatio, daysBetween, getNextMilestone } from './umeshu';

describe('umeshu date logic', () => {
  it('adds months without rolling into the next month', () => {
    expect(addMonths('2026-01-31', 1)).toBe('2026-02-28');
  });

  it('calculates days between ISO dates using UTC day boundaries', () => {
    expect(daysBetween('2026-06-01', '2026-06-13')).toBe(12);
  });

  it('builds a stable milestone timeline', () => {
    const timeline = buildAgingTimeline('2026-06-01', '2026-06-13');
    expect(timeline.map((milestone) => milestone.code)).toEqual([
      'prep_day',
      'first_shake',
      'monthly_check',
      'taste_window',
      'bottling_window',
      'one_year',
    ]);
    expect(getNextMilestone(timeline)?.code).toBe('monthly_check');
  });

  it('calculates sugar ratio against plums', () => {
    expect(calculateSugarRatio(1000, 600)).toBe(0.6);
  });
});

