export const environment = {
  isScreenshotMode: process.env.EXPO_PUBLIC_SCREENSHOT_MODE === '1',
  disableAds: process.env.EXPO_PUBLIC_DISABLE_ADS !== '0',
  disableAnalytics: process.env.EXPO_PUBLIC_DISABLE_ANALYTICS !== '0',
  disablePaywall: process.env.EXPO_PUBLIC_DISABLE_PAYWALL !== '0',
  disableReviewPrompt: process.env.EXPO_PUBLIC_DISABLE_REVIEW_PROMPT !== '0',
  revenueCatApiKey: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY ?? '',
  admobIosAppId: process.env.EXPO_PUBLIC_ADMOB_IOS_APP_ID ?? '',
  admobAndroidAppId: process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID ?? '',
  admobBannerUnitId: process.env.EXPO_PUBLIC_ADMOB_BANNER_UNIT_ID ?? '',
  posthogKey: process.env.EXPO_PUBLIC_POSTHOG_KEY ?? '',
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  amazonAssociateTag: process.env.EXPO_PUBLIC_AMAZON_ASSOCIATE_TAG ?? '',
  publicAppUrl: process.env.EXPO_PUBLIC_APP_URL ?? 'https://example.com/umeshu-notes',
} as const;

