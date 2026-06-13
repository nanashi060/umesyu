# Agent Instructions

Before implementation, read `docs/INDEX.md`. Then read the affected docs for the area being changed.

Rules:

- Write a spec in `docs/specs/YYYY-MM-DD-<topic>.md` before work.
- Keep domain logic pure TypeScript in `src/domain`.
- Keep Expo/native SDK adapters in `src/services`.
- Keep SQLite schema, migrations, repositories, and seeds in `src/data`.
- Add ja/en i18n keys for visible UI strings.
- Update `docs/CHANGELOG.md` and affected docs after changes.
- Add maintenance findings to `docs/MAINTENANCE_NOTES.md`.
- Run `npm run quality` before completion.

Browser policy:

- Use Browser plugin for localhost, Expo Web, design-system, and deterministic screenshots.
- Use existing Chrome for logged-in dashboards, SSO, 2FA, billing, account settings, and store submission.

