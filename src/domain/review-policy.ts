export type ReviewValueSignals = {
  appLaunchCount: number;
  onboardingCompleted: boolean;
  batchCount: number;
  majorActionCount: number;
  settingsChanged: boolean;
  sharedOrAffiliateOpened: boolean;
  purchaseSucceeded: boolean;
};

export type ReviewPolicyInput = {
  firstLaunchAtISO: string;
  nowISO: string;
  currentVersion: string;
  lastAttemptedVersion: string | null;
  isDisabledEnvironment: boolean;
  isWeb: boolean;
  valueSignals: ReviewValueSignals;
};

const MIN_HOURS_AFTER_FIRST_LAUNCH = 24;

export function hasReviewValueSignal(signals: ReviewValueSignals) {
  return (
    signals.appLaunchCount >= 3 ||
    signals.onboardingCompleted ||
    signals.batchCount > 0 ||
    signals.majorActionCount > 0 ||
    signals.settingsChanged ||
    signals.sharedOrAffiliateOpened ||
    signals.purchaseSucceeded
  );
}

export function hoursBetweenISO(startISO: string, endISO: string) {
  return (new Date(endISO).getTime() - new Date(startISO).getTime()) / (60 * 60 * 1000);
}

export function shouldRequestReview(input: ReviewPolicyInput) {
  if (input.isDisabledEnvironment || input.isWeb) {
    return false;
  }

  if (input.lastAttemptedVersion === input.currentVersion) {
    return false;
  }

  if (hoursBetweenISO(input.firstLaunchAtISO, input.nowISO) < MIN_HOURS_AFTER_FIRST_LAUNCH) {
    return false;
  }

  return hasReviewValueSignal(input.valueSignals);
}

