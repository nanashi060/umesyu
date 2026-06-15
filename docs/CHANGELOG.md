# Changelog

## 2026-06-16

- Added `ParthJadhav/app-store-screenshots` as an isolated Next.js editor under `tools/app-store-screenshots`.
- Seeded the screenshot editor with Umeshu Notes app name, icon, ja/en-US locales, and current iPhone screenshot assets.
- Added root npm scripts for installing, running, and building the interactive screenshot editor.
- Excluded the independent editor project from Expo app TypeScript and ESLint quality checks.
- Initialized App Store Connect app availability for Umeshu Notes; App Store validation now only blocks on missing iOS build attachment.
- Documented the latest EAS iOS build attempt stopping at Apple Developer login after remote build number advanced to `4`.
- Made the screenshot editor the required workflow for future store-image updates in `AGENTS.md` and `CLAUDE.md`.
- Re-exported ja/en-US iPhone 6.5 store screenshots from the editor and replaced the ja screenshots in App Store Connect.
- Documented the latest EAS iOS build attempt stopping at Apple Developer login after remote build number advanced to `5`.
- Recorded the App Review submission attempt; submission remains blocked because no processed iOS build is uploaded.

## 2026-06-14

- Added EAS build/submit configuration for iOS App Store Connect preparation.
- Created and linked EAS project `@youchan6565/umesyu`.
- Registered Apple Developer Bundle ID `com.yojiaoki.umesyu` and created App Store Connect app `梅酒ノート` (`6779993369`).
- Set App Store encryption declaration to `ITSAppUsesNonExemptEncryption=false`.
- Added App Store Connect setup spec and review metadata draft.
- Added generated app icon assets and recorded App Store metadata drafts in `metadata/app-store-connect.json`.
- Entered and saved App Store Connect ja metadata, subtitle, categories, review note, and manual release setting.
- Added support and privacy policy pages for public App Store URLs.
- Set App Store content rights, age rating, support URL, privacy policy URL, free price schedule, and uploaded ja iPhone 6.5 screenshots.
- Removed unused Expo template components/assets and replaced the template README.
- Referenced prior App Store Connect apps and copied App Review contact fields from `カクテルレシピ`; latest validate now has only build and availability blockers.
- Blocked Android `RECORD_AUDIO` permission because the MVP does not use audio capture.

## 2026-06-13

- Created Expo SDK 56 app for Umeshu Notes.
- Added documentation foundation, product spec, design-system rules, and MVP scope.
- Added local-first plan for reminders, tips, batch timeline, notifications, review, sharing, and env-safe external service adapters.
