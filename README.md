# Umeshu Notes

Umeshu Notes is a local-first Expo / React Native app for tracking homemade umeshu batches, aging reminders, and practical tips.

## Features

- Batch records for preparation date, ingredient amounts, tasting notes, and optional photos.
- Aging timeline and local reminder scheduling.
- Japanese and English UI through local i18n resources.
- SQLite persistence with forward-only migration structure.
- App Store Connect metadata source of truth in `metadata/app-store-connect.json`.
- Generated app icon assets from `assets/generated/umeshu-icon-source.svg`.

## Development

```bash
npm install
npm run quality
npm run web
```

## Useful Scripts

- `npm run icons:generate` regenerates app icon PNG assets.
- `npm run typecheck` runs TypeScript checks.
- `npm run lint` runs Expo lint.
- `npm run test` runs Vitest unit tests.
- `npm run i18n:check` verifies ja/en i18n key coverage.
- `npm run seed:check` verifies localized seed data.
- `npm run quality` runs all required checks.

## Documentation

Read `docs/INDEX.md` before implementation. Keep `docs/CHANGELOG.md`, affected docs, and `docs/MAINTENANCE_NOTES.md` updated with each change.
