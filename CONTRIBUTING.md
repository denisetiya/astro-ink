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

## Themes

A theme is token overrides only: `--ink-*` custom properties, no
`!important`, no component class restyling. Verify text contrast reaches
4.5:1 (normal) and 3:1 (large), and note the pairs in the file header
like `midnight.css` does.
