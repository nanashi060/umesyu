# 2026-06-13 Umeshu MVP

## Background

This project starts as a local-first Expo app for people making umeshu at home. The first version focuses on reminder planning, practical tips, and one extra value feature: a batch aging timeline with ingredient notes.

## Decisions

- Use Expo SDK 56 with Expo Router and TypeScript.
- Keep data local-first in `expo-sqlite`; no account is required.
- Store stable codes in DB/domain objects and translate only at display time.
- Implement monetization, ads, analytics, error monitoring, and affiliate flows as no-op/env-safe adapters for MVP. Account dashboards are out of scope until credentials and logged-in browser sessions are available.
- Use local notifications only. No push token or server is used.
- Use Browser plugin / in-app browser for local web verification.
- Configure Metro for Expo SQLite Web WASM support.

## Target Files

- `src/app/*`
- `src/components/design-system/*`
- `src/domain/*`
- `src/data/*`
- `src/i18n/*`
- `src/providers/*`
- `src/services/*`
- `docs/*`
- `metadata/*`

## Non-Targets

- Creating RevenueCat, AdMob, PostHog, Sentry, Amazon Associates, App Store Connect, or Play Console projects.
- Production store submission.
- Remote sync, authentication, deep links, image generation, and push notification tokens.

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run i18n:check`
- `npm run seed:check`
- `npm run quality`
- Expo Web smoke test with Browser plugin.

## Privacy / Review Impact

- Local notification permission is requested only when scheduling a reminder.
- Photo library access is used only when the user attaches an optional batch photo.
- Affiliate links open in the external browser and are clearly marked.
- No analytics SDK sends data until env flags and project keys are configured.
