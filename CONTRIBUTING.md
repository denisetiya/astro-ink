# Contributing

## Setup

```sh
npm install
npm test
npm run docs:dev
```

## Coverage gate

Every catalog item in `scripts/spec-coverage.py` must stay mapped.
Run before pushing:

```sh
python3 scripts/spec-coverage.py
npm test
npm run check
```

If you add a component, export it from `src/index.ts`, add the mapping
entry, and add a docs page under `docs/src/pages/components/`.

## Release to npm

Publishing is automatic. Push a version tag and the `Release` workflow
runs the full gate (spec coverage, `astro check`, unit tests, docs
build, E2E) then `npm publish --provenance`:

```sh
npm version patch   # or minor / major
git push origin main --tags
```

First-time setup only (one per package, on npmjs.com):

1. Create the `astro-ink` package entry (or rename in `package.json`).
2. Enable trusted publishing: package Settings, Trusted Publisher,
   GitHub Actions, this repo, workflow `release.yml`.
3. No tokens needed: the workflow uses OIDC (`id-token: write`).

To verify locally what ships:

```sh
npm pack --dry-run
```

## Themes

A theme is token overrides only: `--ink-*` custom properties, no
`!important`, no component class restyling. Verify text contrast reaches
4.5:1 (normal) and 3:1 (large), and note the pairs in the file header
like `midnight.css` does.
