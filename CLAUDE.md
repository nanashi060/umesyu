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

Completion gate: `npm run quality`.

