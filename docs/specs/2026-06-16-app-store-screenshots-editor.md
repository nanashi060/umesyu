# App Store Screenshots Editor

## Goal

Introduce `ParthJadhav/app-store-screenshots` as an isolated screenshot editing tool for this repository without disrupting the Expo app, existing deterministic screenshot generator, or App Store Connect metadata.

## Scope

- Add the upstream Next.js screenshot editor under `tools/app-store-screenshots`.
- Seed the editor with Umeshu Notes app name, icon, locales, and current iPhone screenshot paths so it opens with relevant starter content.
- Add root npm scripts to install, run, and build the editor from the repository root.
- Keep the Expo app TypeScript and ESLint quality checks scoped away from the independent tool project.
- Document the relationship between the existing deterministic generator and the new interactive editor.

## Out of Scope

- Replacing `scripts/generate-store-screenshots.mjs`.
- Uploading screenshots to App Store Connect.
- Creating new final marketing screenshots from the editor.
- Adding Google Play screenshots or Android store metadata.

## Acceptance Criteria

- `npm run screenshots:editor` starts the editor from `tools/app-store-screenshots`.
- `npm run screenshots:editor:build` validates the editor can build.
- `npm run quality` continues to validate the Expo app.
- `docs/SCREENSHOTS.md`, `docs/BROWSER_AUTOMATION.md`, `docs/CHANGELOG.md`, and `docs/MAINTENANCE_NOTES.md` describe the new tool and any follow-up caveats.
