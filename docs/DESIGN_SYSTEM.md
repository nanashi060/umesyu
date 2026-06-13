# Design System

`src/components/design-system/tokens.ts` is the source of truth for colors, spacing, radius, shadows, and typography.

Rules:

- Update tokens/components before changing screen styling.
- Screens consume design-system components where practical.
- Do not add ad, paywall, review prompt, or analytics-only UI to `/design-system`.
- Main palette uses plum, amber, leaf, and ink so the UI does not become a single beige or purple theme.

