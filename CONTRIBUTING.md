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
build, E2E) then `npm publish`:

```sh
npm version patch   # or minor / major
git push origin main --tags
```

One-time setup (repo Settings, Secrets and variables, Actions,
New repository secret):

- Name: `NPM_TOKEN`
- Value: your npm access token (npmjs.com, Access Tokens, Granular
  token scoped to `astro-ink` with read and write, or Classic
  Automation token).

No trusted publisher needed: the workflow authenticates with the token.

To verify locally what ships:

```sh
npm pack --dry-run
```

## Themes

A theme is token overrides only: `--ink-*` custom properties, no
`!important`, no component class restyling. Verify text contrast reaches
4.5:1 (normal) and 3:1 (large), and note the pairs in the file header
like `midnight.css` does.
