# Architecture

## Principles

- Expo Router owns routes in `src/app`.
- Domain logic lives in `src/domain` and imports no React, SQLite, or native SDKs.
- SQLite access lives in `src/data`.
- Native SDK boundaries live in `src/services`.
- Shared UI primitives and tokens live in `src/components/design-system`.
- Feature screens live in `src/features`.

## Local-First

The app initializes SQLite on launch, runs forward-only migrations, seeds preset tips idempotently, and loads settings before redirecting onboarding. Remote sync is intentionally not implemented.

## External SDKs

RevenueCat, AdMob, PostHog, Sentry, and Amazon Associates are represented by env-safe adapters and docs. Production SDK wiring requires a separate task after account setup.

