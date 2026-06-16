# 2026-06-16 App Review Submission Attempt

## Background

The user asked to submit Umeshu Notes to App Store review after updating the store screenshots.

## Decisions

- Use `asc` for App Store Connect inspection, screenshot upload, build lookup, and validation.
- Use EAS production iOS build for the required App Store build.
- Use Chrome only for logged-in App Store Connect UI checks and submission-button validation.
- Do not enter or store Apple ID credentials, passwords, 2FA codes, cookies, or browser session data.
- Revoke any temporary signing certificate if a local build tool exposes signing payloads in logs.

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
- Keeping temporary local signing secrets after a failed build attempt.

## Verification

- `asc builds latest --app 6779993369`
- `asc screenshots list --version-localization a8f862eb-883e-4307-abfc-f2b0f2fd2046 --output json`
- `asc validate --app 6779993369 --version-id 8dd6246f-d332-421e-98b5-9ef9fa0abbd9 --platform IOS --output json`
- `npm run screenshots:editor:build`
- `npm run quality`

## Results

- Updated ja `IPHONE_65` screenshots were uploaded to App Store Connect.
- App Privacy was completed in Chrome/App Store Connect and published as "Data Not Collected".
- `asc validate` now reports only the missing build attachment blocker.
- `asc builds latest --app 6779993369` confirmed there is still no uploaded build.
- Chrome submission-button validation returned "審査用に追加できません" because a build must be selected.
- EAS production iOS build was started but stopped at Apple Developer login after incrementing remote build number from `4` to `5`.
- A non-interactive EAS remote build using local credentials started as `be1b078b-893a-44b7-b719-d773a68df466` for build number `7`, but failed because `expo doctor` found SDK patch-version mismatches.
- SDK 56 patch dependencies were updated and `npm run quality` passed.
- A later EAS remote build attempt incremented remote build number from `7` to `8`, then stopped because the Expo Free plan iOS build quota is exhausted until 2026-07-01.
- A local EAS build attempt incremented remote build number from `8` to `9`, then failed during distribution-certificate keychain import.
- The temporary iOS Distribution certificate `92HF729Z6A` and provisioning profile `B56M3CKWCS` created for the local credential attempt were revoked/deleted, and local secret files were removed.
- App Review submission could not be created because a processed iOS build is required before attaching the version for review.
