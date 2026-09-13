# Changelog

All notable changes to `astro-ink` are recorded here. Format follows Keep a
Changelog; versioning follows SemVer.

## [1.0.0] - 2026-09-13

- 120/120 catalog items covered (verified by `scripts/spec-coverage.py`).
- 126 component exports, 16 script utilities, 9 preset themes
  (default Paper and Ink light, plus `dark`, `midnight`, `brutal`,
  `forest`, `ocean`, `ember`, `plum`, `slate`).
- 68 unit tests, 179 E2E specs (Playwright), Lighthouse a11y gate in CI.
- New input sizes (`sm`/`md`/`lg`) on TextField, NumberInput, Textarea,
  PasswordInput, SearchInput, and Select (`controlSize`).
- New component variants: Button `soft`/`outline`, Badge `outline`,
  Chip `outline`, Alert `filled`/`outline`, Callout `filled`, Progress
  tones and sizes, Tabs `pill`/`boxed`, Avatar `xl`, AvatarGroup sizes,
  Card horizontal orientation and density.
- Docs site rebuilt: theme picker with all nine presets, landing page,
  catalog cards with live demos, labeled examples, copy buttons,
  breadcrumbs, and skip link.
