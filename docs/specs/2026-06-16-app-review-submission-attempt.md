# 2026-06-16 App Review Submission Attempt

## Background

The user asked to submit Umeshu Notes to App Store review after updating the store screenshots.

## Decisions

- Use `asc` for App Store Connect inspection, screenshot upload, build lookup, and validation.
- Use EAS production iOS build for the required App Store build.
- Do not enter or store Apple ID credentials, passwords, 2FA codes, cookies, or browser session data.

## Target Files

- `docs/APP_REVIEW.md`
- `docs/SCREENSHOTS.md`
- `metadata/app-store-connect.json`
- `docs/CHANGELOG.md`
- `docs/MAINTENANCE_NOTES.md`

## Non-Targets

- Submitting without a processed iOS build.
- Handling Apple account credentials.
- Changing billing, tax, agreements, account permissions, or release mode.

## Verification

- `asc builds latest --app 6779993369`
- `asc screenshots list --version-localization a8f862eb-883e-4307-abfc-f2b0f2fd2046 --output json`
- `asc validate --app 6779993369 --version-id 8dd6246f-d332-421e-98b5-9ef9fa0abbd9 --platform IOS --output json`
- `npm run screenshots:editor:build`
- `npm run quality`

## Results

- Updated ja `IPHONE_65` screenshots were uploaded to App Store Connect.
- `asc builds latest --app 6779993369` confirmed there is still no uploaded build.
- EAS production iOS build was started but stopped at Apple Developer login after incrementing remote build number from `4` to `5`.
- App Review submission could not be created because a processed iOS build is required before attaching the version for review.
- `asc validate` was retried twice after screenshot upload, but Apple returned a server-side age rating declaration fetch error. The previous successful validation had only the missing build attachment blocker.
