# 2026-06-16 Reference Past App Store Connect Apps

## Background

The current Umeshu Notes App Store version is blocked by missing review contact details, build attachment, app availability, and App Privacy answers. The user asked to reference past App Store Connect apps.

## Decisions

- Use `asc` API/CLI first because it is authenticated and avoids Chrome session issues.
- Read past apps only as reference. Do not submit Umeshu Notes for review in this task unless explicitly requested.
- If past review contact details are found, use them only for App Review contact fields and record that they were copied from a prior App Store Connect app.
- Do not print or commit private credentials, tokens, browser state, or Apple session data.

## Target Files

- `metadata/app-store-connect.json`
- `docs/APP_REVIEW.md`
- `docs/PRIVACY.md`
- `docs/CHANGELOG.md`
- `docs/MAINTENANCE_NOTES.md`
- `docs/specs/2026-06-16-reference-past-asc-apps.md`

## Non-Targets

- Final App Review submission.
- Changing billing, agreements, tax, account permissions, or paid pricing.
- Copying settings that do not match Umeshu Notes behavior.

## Verification

- `asc validate --app 6779993369 --version-id 8dd6246f-d332-421e-98b5-9ef9fa0abbd9 --platform IOS --output json`
- `npm run quality`

## Results

- Found 8 prior App Store Connect apps.
- Selected `カクテルレシピ` (`6757948136`) as the closest reference because it is alcohol-related and `READY_FOR_SALE`.
- Copied App Review contact fields from that app into Umeshu Notes review detail `c2ceab87-e1ba-4755-8aa1-072151f9d983`.
- `asc validate` decreased from 6 blocking errors to 2:
  - build attachment missing
  - app availability missing
- Past READY_FOR_SALE apps have app availability with `availableInNewTerritories=true`.
- Initialized Umeshu Notes app availability through `POST /v2/appAvailabilities` by creating all 175 territory availability records with local JSON:API IDs and territory relationships.
- `asc validate` now reports only 1 blocking error:
  - build attachment missing
- App Privacy answers still need App Store Connect UI verification because the available `asc` schema does not expose App Privacy endpoints.
- EAS interactive iOS build was started and incremented the remote build number from `3` to `4`, then stopped at Apple Developer login. The build was canceled without entering credentials.
