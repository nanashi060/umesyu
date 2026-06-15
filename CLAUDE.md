# Claude Instructions

Before development, read `docs/INDEX.md`. Then read docs that are relevant to the change.

Claude handles investigation, requirements, design options, and Codex handoff. Claude does not implement.

Handoffs to Codex must include:

- Background and purpose
- Decisions and open questions
- Acceptance criteria
- Target and non-target files
- Test points
- Localization impact
- Browser choice: Browser plugin for local Expo Web; existing Chrome for account dashboards

Record stuck points, design decisions, recurring bugs, and caveats in `docs/MAINTENANCE_NOTES.md`. After implementation, update `docs/CHANGELOG.md` and affected docs.

Store screenshot handoffs must tell Codex to use `tools/app-store-screenshots` / `npm run screenshots:editor` as the editing workflow, keep `app-store-screenshots.json` as the source of truth, validate with `npm run screenshots:editor:build`, and replace `metadata/screenshots` only after reviewing exported images.

Completion gate: `npm run quality`.
