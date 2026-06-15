# Screenshots

Screenshot mode must disable:

- Ads
- Review prompts
- Analytics sending
- Paywall auto display
- Permission dialogs where possible

Use deterministic seed data and capture ja/en-US with the same screen order.

Future store-marketing screenshot updates must use the interactive editor in
`tools/app-store-screenshots` before replacing upload-ready images.

Config: `metadata/screenshots/config/umeshu-mvp.json`

## App Store Screenshots

- Editor workflow: `npm run screenshots:editor`
- Editor build check: `npm run screenshots:editor:build`
- Deterministic baseline generator: `npm run screenshots:generate`
- iPhone 6.5 output: `metadata/screenshots/ios/<locale>/iphone-6.5`
- Required upload device type: `IPHONE_65`
- App Store Connect ja screenshot set ID: `858e4a4c-4a14-42d1-89dc-6cdd4fe28ee2`
- Uploaded ja asset IDs:
  - `8485e348-4447-40bf-bbab-e3a682c6b86b` (`01-home.png`)
  - `36836073-a1de-43c0-9f44-b42b245dd1eb` (`02-batches.png`)
  - `04ecc1be-3075-49d5-a023-d555ddfbaaf7` (`03-tips.png`)
- Latest export source: `tools/app-store-screenshots/app-store-screenshots.json`
- Latest export date: 2026-06-16
- Current order:
  1. Home value summary
  2. Batch reminder workflow
  3. Tips library

## Interactive Editor

- Editor: `npm run screenshots:editor`
- Build check: `npm run screenshots:editor:build`
- Location: `tools/app-store-screenshots`
- Upstream: `ParthJadhav/app-store-screenshots`
- State file: `tools/app-store-screenshots/app-store-screenshots.json`
- Initial assets:
  - Icon: `tools/app-store-screenshots/public/app-icon.png`
  - ja screenshots: `tools/app-store-screenshots/public/screenshots/apple/iphone/ja`
  - en-US screenshots: `tools/app-store-screenshots/public/screenshots/apple/iphone/en-US`

Use `npm run screenshots:generate` only for deterministic baseline app-screen assets. Use the editor for store-marketing screenshots, connected-canvas layouts, device frames, localized copy, and alternate compositions. Exports from the editor must be reviewed before replacing files in `metadata/screenshots`.

## App Icon

- Source SVG: `assets/generated/umeshu-icon-source.svg`
- Generator: `npm run icons:generate`
- Concept: no-text umeshu jar with green plums on a plum-colored background.
