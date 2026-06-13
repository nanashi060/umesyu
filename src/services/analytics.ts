import { environment } from './environment';

export type AnalyticsEventName =
  | 'onboarding_completed'
  | 'batch_created'
  | 'reminder_scheduled'
  | 'tip_opened'
  | 'share_started'
  | 'affiliate_search_opened'
  | 'paywall_viewed'
  | 'purchase_started'
  | 'purchase_completed'
  | 'ad_placeholder_viewed'
  | 'review_condition_met';

export async function captureEvent(
  name: AnalyticsEventName,
  properties: Record<string, string | number | boolean | null> = {},
  analyticsOptOut = false,
) {
  if (environment.disableAnalytics || analyticsOptOut || !environment.posthogKey) {
    return { sent: false, reason: 'disabled' as const };
  }

  // PostHog SDK wiring is intentionally deferred until project keys and privacy review are ready.
  void name;
  void properties;
  return { sent: false, reason: 'not_configured' as const };
}

