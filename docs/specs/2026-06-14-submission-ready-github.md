# 2026-06-14 Submission Ready and GitHub Publish

## Background

The user wants the app prepared as close as possible to App Store submission without actually submitting it, and wants a GitHub repository created with the current project committed and pushed.

## Decisions

- Do not submit to App Review or publish the app in this task.
- Use existing Chrome for App Store Connect account pages.
- Use GitHub CLI account `nanashi060` if authenticated.
- Create a project-local Git repository in `/Users/yojiaoki/umesyu`; the parent home directory is also a Git repository and must not be used for this app's commit.
- Create the GitHub repository as public so App Store support and privacy policy URLs are accessible to reviewers.
- Keep support URL, privacy policy URL, and App Review contact details unresolved unless the user provides real public/contact values.
- Use `https://github.com/nanashi060/umesyu/issues` as the support URL after the repository is created.
- Use `https://github.com/nanashi060/umesyu/blob/main/PRIVACY_POLICY.md` as the privacy policy URL after the repository is created.
- Set App Store Connect content rights to `DOES_NOT_USE_THIRD_PARTY_CONTENT`.
- Set age rating with alcohol/tobacco/drug references as `FREQUENT_OR_INTENSE` and other categories as none/false.
- Create a free price schedule with base territory `JPN`.
- Generate and upload three `IPHONE_65` screenshots for ja.
- App Privacy answers and availability still require App Store Connect UI because Chrome extension communication failed after retry and `asc` cannot initialize app availability.

## Target Files

- `metadata/app-store-connect.json`
- `docs/APP_REVIEW.md`
- `docs/PRIVACY.md`
- `docs/SCREENSHOTS.md`
- `docs/CHANGELOG.md`
- `docs/MAINTENANCE_NOTES.md`
- `docs/specs/2026-06-14-submission-ready-github.md`
- Store screenshot assets if generated.
- Git repository metadata under `/Users/yojiaoki/umesyu/.git`.
- `PRIVACY_POLICY.md`
- `SUPPORT.md`

## Non-Targets

- Final App Review submission.
- Inventing support, privacy policy, phone, or email values.
- Paid account, billing, tax, agreement, or permission changes.
- Uploading credentials, tokens, browser profiles, or private account screenshots.

## Verification

- `npm run quality`
- App Store Connect page recheck after updates.
- GitHub repository exists and commit is pushed.
- App Store blockers are recorded in `metadata/app-store-connect.json` and docs.

## Latest App Store Validate

`asc validate --app 6779993369 --version-id 8dd6246f-d332-421e-98b5-9ef9fa0abbd9 --platform IOS --output json` now reports 6 blocking errors:

- Review contact first name
- Review contact last name
- Review contact email
- Review contact phone
- No build attached
- App availability missing

Support URL, privacy policy URL, screenshots, age rating, content rights, and free price schedule are set.
