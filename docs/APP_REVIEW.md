# App Review

## Current Capabilities

- No account required.
- Local notifications are used for user-created reminders.
- Optional photo library access may attach a photo URI to a batch.
- External browser links may open Amazon search URLs when the user chooses that action.
- In-app purchases, ads, analytics, and error reporting are disabled by default until configured.
- `ITSAppUsesNonExemptEncryption` is set to `false`; the MVP does not add non-exempt encryption beyond platform defaults.

## Review Notes Draft

Demo account is not required. The app helps users track homemade umeshu batches, reminders, and tips. It may contain alcohol-related content and should not be positioned for children.

## App Store Connect Setup Draft

- Intended team/account label: うさぎ開発
- Bundle ID: `com.yojiaoki.umesyu`
- Apple App ID: `6779993369`
- SKU: `umesyu-2026`
- EAS project: `@youchan6565/umesyu`
- EAS project ID: `24ddeda0-f5f5-4dd5-99da-e9bed8e16f4d`
- Apple Developer Team ID: `NM25VYJHAR`
- Primary app name ja: 梅酒ノート
- Primary app name en-US: Umeshu Notes
- Primary category draft: Food & Drink
- Secondary category draft: Lifestyle
- Subtitle ja draft: 梅仕事の熟成リマインダー
- Copyright draft: © 2026 うさぎ開発
- App icon source: `assets/generated/umeshu-icon-source.svg`
- App icon generator: `npm run icons:generate`
- Demo account: not required
- Alcohol-related content: present. Complete age rating accurately and avoid child-directed positioning.
- Version metadata saved in App Store Connect on 2026-06-14: promotional text, description, keywords, copyright, review notes, sign-in not required, manual release.
- App info metadata saved in App Store Connect on 2026-06-14: subtitle, primary category, secondary category.
- Support URL saved: `https://github.com/nanashi060/umesyu/issues`
- Privacy policy URL saved: `https://github.com/nanashi060/umesyu/blob/main/PRIVACY_POLICY.md`
- Content rights saved: does not use third-party content.
- Age rating saved: alcohol/tobacco/drug references `FREQUENT_OR_INTENSE`; other categories none/false.
- Screenshots uploaded: three `IPHONE_65` ja screenshots.
- Free price schedule created with base territory `JPN`.
- App availability initialized with `availableInNewTerritories=true`.
- App Review contact fields copied from prior `カクテルレシピ` App Store Connect app on 2026-06-16.
- Latest `asc validate` reports 1 blocker: build upload/attachment.
- Latest EAS interactive build attempt incremented remote iOS build number to `4`, then stopped at Apple Developer login.
- App Privacy answers still need App Store Connect UI/web-session verification before submission.
- Submission is not approved until an iOS build is uploaded and App Review metadata is completed.

## Recheck Triggers

Recheck this doc when changing ads, analytics, RevenueCat, Sentry, external links, notifications, photos, sharing, metadata, or store submission settings.
