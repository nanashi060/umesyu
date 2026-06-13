# Data Model

## SQLite

Database: `umeshu.db`

Web uses Expo SQLite's WASM path. `metro.config.js` registers `wasm` as an asset extension and adds COEP/COOP headers for SharedArrayBuffer support.

Tables:

- `schema_migrations`: applied forward-only migration IDs.
- `app_settings`: language, onboarding, notification, review, analytics, and purchase cache fields.
- `tips`: id, category code, localized title/body, sort order.
- `batches`: user-created umeshu batches with stable status code and optional image URI.

## Stable Codes

Stored values use English stable codes such as `active`, `ready`, `prep`, `storage`, and `troubleshooting`. Display labels come from i18n resources.
