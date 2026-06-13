# Privacy

## Data Collected

MVP stores data locally on device:

- Settings
- Onboarding state
- Batch names and ingredient amounts
- Optional local photo URI
- Reminder preferences
- Purchase/analytics/review state cache

No server account or push token is used.

## Store Metadata Status

- Privacy policy URL: `https://github.com/nanashi060/umesyu/blob/main/PRIVACY_POLICY.md`
- Support URL: `https://github.com/nanashi060/umesyu/issues`
- App Store description states that data is stored on device and is not synced to an external server.
- App Privacy answers still need to be completed in App Store Connect. MVP behavior supports "data not collected" because data is not transmitted off-device, but this must be verified in the App Store Connect privacy UI before submission.
- If ads, analytics, purchases, Sentry, or affiliate behavior is enabled later, update this document and App Store Connect privacy answers before submission.

## SDK Notes

AdMob, PostHog, RevenueCat, and Sentry are not actively sending data in the MVP adapters. Enabling them requires updating App Privacy, Data Safety, and this document.
