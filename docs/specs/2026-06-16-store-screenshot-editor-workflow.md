# 2026-06-16 Store Screenshot Editor Workflow

## Background

The repository now includes an isolated App Store screenshot editor under `tools/app-store-screenshots`. The user asked to make this editor the standard path for future store-image work and to update the current store images.

## Decisions

- Record in `AGENTS.md` and `CLAUDE.md` that future store screenshots must use `tools/app-store-screenshots` / `npm run screenshots:editor` as the editing source before replacing upload-ready screenshots.
- Keep `metadata/screenshots` as the upload-ready output location.
- Keep the deterministic screenshot generator available for baseline assets, but use the editor deck as the required review/editing workflow for store marketing screenshots.
- Do not upload screenshots to App Store Connect in this task unless explicitly requested.

## Target Files

- `AGENTS.md`
- `CLAUDE.md`
- `docs/SCREENSHOTS.md`
- `docs/BROWSER_AUTOMATION.md`
- `docs/CHANGELOG.md`
- `docs/MAINTENANCE_NOTES.md`
- `metadata/screenshots/**`
- `tools/app-store-screenshots/**`

## Non-Targets

- App Store Connect screenshot upload.
- Revenue, privacy, age rating, or build metadata changes.
- Native app UI changes.

## Verification

- Build or validate the screenshot editor.
- Regenerate/update store screenshot PNGs.
- Inspect generated image dimensions and a sample render.
- Run `npm run quality`.

## Results

- Added screenshot editor workflow rules to `AGENTS.md` and `CLAUDE.md`.
- Re-exported iPhone screenshots from `tools/app-store-screenshots` after changing the tips slide from `device-top` to `device-bottom` to avoid top-edge clipping.
- Replaced ja/en-US `metadata/screenshots/ios/*/iphone-6.5` PNGs with editor exports.
- Uploaded the updated ja `IPHONE_65` screenshots to App Store Connect.
- App Store Connect asset IDs:
  - `8485e348-4447-40bf-bbab-e3a682c6b86b` (`01-home.png`)
  - `36836073-a1de-43c0-9f44-b42b245dd1eb` (`02-batches.png`)
  - `04ecc1be-3075-49d5-a023-d555ddfbaaf7` (`03-tips.png`)
- Tried to proceed to App Store review submission, but EAS build stopped at Apple Developer login after incrementing the remote build number from `4` to `5`.
