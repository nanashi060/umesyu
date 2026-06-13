# Screenshots

Screenshot mode must disable:

- Ads
- Review prompts
- Analytics sending
- Paywall auto display
- Permission dialogs where possible

Use deterministic seed data and capture ja/en-US with the same screen order.

Config: `metadata/screenshots/config/umeshu-mvp.json`

## App Store Screenshots

- Generator: `npm run screenshots:generate`
- iPhone 6.5 output: `metadata/screenshots/ios/<locale>/iphone-6.5`
- Required upload device type: `IPHONE_65`
- App Store Connect ja screenshot set ID: `858e4a4c-4a14-42d1-89dc-6cdd4fe28ee2`
- Uploaded ja asset IDs:
  - `df200d0e-92ee-4508-a103-cdbe4b995c7b` (`01-home.png`)
  - `89fba0e5-6032-4a3f-896b-71811ce8e35d` (`02-batches.png`)
  - `55cd0d48-c155-4e2e-9802-19182d6c89f6` (`03-tips.png`)
- Current order:
  1. Home value summary
  2. Batch reminder workflow
  3. Tips library

## App Icon

- Source SVG: `assets/generated/umeshu-icon-source.svg`
- Generator: `npm run icons:generate`
- Concept: no-text umeshu jar with green plums on a plum-colored background.
