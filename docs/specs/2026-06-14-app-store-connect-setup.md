# 2026-06-14 App Store Connect Setup

## Background

The app needs to be created in App Store Connect under the user's logged-in Apple account/team, described as "うさぎ開発", and prepared for an initial iOS upload.

## Decisions

- Use existing Chrome for App Store Connect because Apple login, 2FA, team selection, agreements, and account state are involved.
- Use bundle ID `com.yojiaoki.umesyu`.
- Use app name `梅酒ノート` for ja and `Umeshu Notes` for en-US metadata.
- Prepare EAS build/submit config locally, but do not assume App Store Connect app ID, Apple team ID, certificates, or agreements.
- Block Android `RECORD_AUDIO`; the MVP does not record audio.
- Created and linked EAS project `@youchan6565/umesyu` with project ID `24ddeda0-f5f5-4dd5-99da-e9bed8e16f4d`.
- Registered Apple Developer Bundle ID `com.yojiaoki.umesyu` under Team ID `NM25VYJHAR`.
- Created App Store Connect app `梅酒ノート` with Apple App ID `6779993369`.
- Set `ios.infoPlist.ITSAppUsesNonExemptEncryption` to `false`.
- Generated no-text app icons from `assets/generated/umeshu-icon-source.svg` via `npm run icons:generate`.
- Use App Store category draft `Food & Drink` with secondary `Lifestyle`.
- Store metadata source of truth is `metadata/app-store-connect.json`; do not overwrite entered values from memory.
- Entered and saved ja version metadata in App Store Connect: promotional text, description, keywords, copyright, review note, sign-in not required, and manual release.
- Entered and saved app info metadata in App Store Connect: subtitle, primary category, and secondary category.
- App icon is prepared locally and will be included by the next iOS build; App Store Connect does not accept a separate app icon upload on the version metadata page.

## Target Files

- `app.json`
- `eas.json`
- `package.json`
- `package-lock.json`
- `scripts/generate-app-icons.mjs`
- `assets/generated/`
- `assets/images/`
- `metadata/app-store-connect.json`
- `docs/APP_REVIEW.md`
- `docs/PRIVACY.md`
- `docs/SCREENSHOTS.md`
- `docs/CHANGELOG.md`
- `docs/MAINTENANCE_NOTES.md`

## Non-Targets

- Publishing or submitting for review.
- Changing account permissions, billing, tax, agreements, or production pricing.
- Creating certificates manually unless the user confirms the exact account/team flow.
- Inventing support URL, marketing URL, or privacy policy URL without a user-provided public URL.

## Verification

- `npx expo config --json` confirms unwanted audio permission is blocked.
- `npm run icons:generate`
- `npm run quality`
- Chrome App Store Connect check after the user closes the blocking extension UI.
- `eas project:info --json --non-interactive`
- App Store Connect app URL: `https://appstoreconnect.apple.com/apps/6779993369/distribution`
- `eas build --platform ios --profile production --non-interactive --auto-submit` currently requires interactive iOS credential validation.

## Metadata Entry Plan

- App name: `梅酒ノート`
- Subtitle: `梅仕事の熟成リマインダー`
- Promotional text: `梅酒づくりの仕込み日、味見、瓶詰めのタイミングを忘れず管理。ティップスと熟成タイムラインで、今年の梅仕事を落ち着いて記録できます。`
- Keywords: `梅酒,梅仕事,果実酒,リマインダー,熟成,保存瓶,氷砂糖,手作り,記録,通知`
- Copyright: `© 2026 うさぎ開発`
- Description, en-US localization, release notes, review notes, and icon source are recorded in `metadata/app-store-connect.json`.
- Pending user-provided public URLs: support URL and privacy policy URL.
- Not entered yet: review contact name/phone/email, screenshots, build, age rating questionnaire, App Privacy answers, support URL, privacy policy URL.

## Browser Choice

Use existing Chrome. Do not use Browser plugin for App Store Connect account operations.
