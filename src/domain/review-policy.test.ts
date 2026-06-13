import { describe, expect, it } from 'vitest';

import { shouldRequestReview, type ReviewValueSignals } from './review-policy';

const baseSignals: ReviewValueSignals = {
  appLaunchCount: 3,
  onboardingCompleted: true,
  batchCount: 1,
  majorActionCount: 0,
  settingsChanged: false,
  sharedOrAffiliateOpened: false,
  purchaseSucceeded: false,
};

describe('review policy', () => {
  it('blocks review requests in disabled environments', () => {
    expect(
      shouldRequestReview({
        firstLaunchAtISO: '2026-06-01T00:00:00.000Z',
        nowISO: '2026-06-13T00:00:00.000Z',
        currentVersion: '1.0.0',
        lastAttemptedVersion: null,
        isDisabledEnvironment: true,
        isWeb: false,
        valueSignals: baseSignals,
      }),
    ).toBe(false);
  });

  it('requires 24 hours after first launch', () => {
    expect(
      shouldRequestReview({
        firstLaunchAtISO: '2026-06-13T00:00:00.000Z',
        nowISO: '2026-06-13T12:00:00.000Z',
        currentVersion: '1.0.0',
        lastAttemptedVersion: null,
        isDisabledEnvironment: false,
        isWeb: false,
        valueSignals: baseSignals,
      }),
    ).toBe(false);
  });

  it('allows when enough time, version not attempted, and value signal exists', () => {
    expect(
      shouldRequestReview({
        firstLaunchAtISO: '2026-06-01T00:00:00.000Z',
        nowISO: '2026-06-13T00:00:00.000Z',
        currentVersion: '1.0.0',
        lastAttemptedVersion: null,
        isDisabledEnvironment: false,
        isWeb: false,
        valueSignals: baseSignals,
      }),
    ).toBe(true);
  });
});

