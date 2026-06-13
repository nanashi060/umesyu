import Constants from 'expo-constants';

import { shouldRequestReview, type ReviewPolicyInput } from '@/domain/review-policy';

import { environment } from './environment';

export async function requestReviewIfEligible(input: Omit<ReviewPolicyInput, 'currentVersion' | 'isDisabledEnvironment' | 'isWeb'>) {
  const policyInput: ReviewPolicyInput = {
    ...input,
    currentVersion: Constants.expoConfig?.version ?? '0.0.0',
    isDisabledEnvironment: environment.disableReviewPrompt || environment.isScreenshotMode || __DEV__,
    isWeb: process.env.EXPO_OS === 'web',
  };

  if (!shouldRequestReview(policyInput)) {
    return { requested: false };
  }

  const StoreReview = await import('expo-store-review');
  if (!(await StoreReview.isAvailableAsync())) {
    return { requested: false };
  }

  await StoreReview.requestReview();
  return { requested: true, version: policyInput.currentVersion };
}

