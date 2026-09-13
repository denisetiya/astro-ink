# astro-ink

[![npm version](https://img.shields.io/npm/v/astro-ink)](https://www.npmjs.com/package/astro-ink)
[![CI](https://github.com/denisetiya/astro-ink/actions/workflows/ci.yml/badge.svg)](https://github.com/denisetiya/astro-ink/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Lightweight, token-driven UI components for Astro. Server-rendered, zero
dependencies, fully themeable through CSS custom properties.

## Install

Requires Astro 7 in your project (`astro-ink` lists it as a peer
dependency, so your app owns the version):

```sh
npm install astro-ink
```

That is the only step. No extra setup, no config plugin, no client
framework. Styles ship as plain CSS files you import once; components
ship their own scoped CSS and a tiny script only when interactive.

## Quick start

Import the styles once in your base layout:

```astro
---
import "astro-ink/styles/tokens.css";
import "astro-ink/styles/base.css";
// optional dark theme:
import "astro-ink/styles/themes/dark.css";
---
```

Use components in any Astro page:

```astro
---
import { Button, Badge, Alert } from "astro-ink";
---

<Alert variant="success" dismissible>
  <strong>Saved.</strong> Your changes are live.
</Alert>
<Button href="/start">Start building</Button>
<Badge variant="accent">v1.0</Badge>
```

Pick any of the 9 preset themes with one import (default Paper and Ink
light needs none): `dark`, `midnight`, `brutal`, `forest`, `ocean`,
`ember`, `plum`, `slate`. Set it with an attribute:

```js
document.documentElement.dataset.theme = "midnight";
```

See [Theming](#theming) below and the full guide in the docs site for
the token reference and a custom theme template.

## Why

- **Light by construction.** Each component carries its own scoped CSS and a
  tiny script only when it needs one. A page using three components ships
  exactly three components' worth of code. Astro dedupes scripts
  automatically.
- **Customizable first.** Every color, radius, spacing value, and duration is
  a CSS custom property. Change `--ink-accent` once and the whole library
  follows. Component-level tokens (`--ink-button-radius`) override globally
  (`--ink-radius-md`).
- **Accessible by default.** WCAG AA contrast in every preset theme, full
  keyboard operation, visible focus rings.

## Theming

Override tokens on `:root` or any container:

    :root {
      --ink-accent: #0f766e;
      --ink-button-radius: 999px;
    }

See the full guide in the docs site (run `npm run docs:dev` in this repo,
then open the Theming page) for the token reference, the preset themes,
and a custom theme template.

Preset themes ship with the library: the default Paper and Ink light theme,
plus `dark`, `midnight` (dark-first), `brutal` (neo-brutalist),
`forest` (green-tinted light), `ocean` (deep-sea dark),
`ember` (warm hearth dark), `plum` (violet light), and `slate`
(graphite dark with amber accent). Each
preset is one import of token overrides, one theme per page:

    import "astro-ink/styles/tokens.css";
    import "astro-ink/styles/base.css";
    // pick one preset (or none for the default light theme):
    import "astro-ink/styles/themes/dark.css";
    import "astro-ink/styles/themes/midnight.css";
    import "astro-ink/styles/themes/brutal.css";
    import "astro-ink/styles/themes/forest.css";
    import "astro-ink/styles/themes/ocean.css";
    import "astro-ink/styles/themes/ember.css";
    import "astro-ink/styles/themes/plum.css";
    import "astro-ink/styles/themes/slate.css";

Set the theme with an attribute (the toggle logic belongs to your app):

    document.documentElement.dataset.theme = "midnight";
    // or: "light", "dark", "brutal", "forest", "ocean", "ember", "plum", "slate"

## Docs

The docs site lives in `docs/`. Run it locally with `npm run docs:dev`.
Every catalog component with a renderable UI has a live docs page with a
live demo, a copy-paste snippet, a props table, and accessibility notes.
Six catalog items are covered by guidance instead of pages: Portal, Popper,
ClickAwayListener, FocusTrap, Icon, and CSS Baseline.

## Status

120 catalog items, verified by
`scripts/spec-coverage.py`: 120/120 fully covered, plus 10 subpart/extra
exports. Full list: Button, Badge, Alert, Container,
VisuallyHidden, Field, TextField, NumberInput, PasswordInput, SearchInput,
Textarea, Select, Checkbox, RadioGroup, Switch, Slider, File,
InputGroup, Form, ButtonGroup, ToggleButton, Link, Breadcrumbs, Anchor,
Navbar, Sidebar, Tabs, Pagination, Stepper, Menu, Menubar, ContextMenu,
NavigationMenu, CommandMenu, Drawer, Sheet, SpeedDial, BottomNavigation,
Tour, Dialog, ConfirmDialog, Backdrop, Toast, Popover, HoverCard, Progress,
ProgressRing, Spinner, Callout, Banner, EmptyState, Result, LoadingOverlay,
SkipLink, CopyButton, Portal, Popper, ClickAwayListener, FocusTrap, Icon,
CSS Baseline, Chip, Divider, Kbd, Paper, Grid, Stack, AppShell,
PageHeader, ScrollArea, ScrollShadow, AspectRatio, Splitter, Affix,
Accordion, Avatar, AvatarGroup, Card, List, ImageList, Carousel, Table,
Tooltip, Typography, Blockquote, CodeBlock, Spoiler, Highlight, Statistic,
Descriptions, Skeleton, Timeline, TreeView, FAB, IconButton,
SegmentedControl, Rating, Combobox, Autocomplete, MultiSelect, OTPInput,
ColorPicker, TagInput, Cascader, TreeSelect, TransferList, Calendar,
DatePicker, TimePicker, DateTimePicker, DateRangePicker, DataGrid,
LineChart, BarChart, AreaChart, PieChart, Sparkline, Gauge, RadarChart,
ScatterChart.
Utilities: focus-trap, dismiss, roving, scrollspy, pagination builder,
autosize, slider fill, split math, highlight split, Popper, Portal, ClickAway.

Plus 10 subpart/extra exports beyond the catalog items: AccordionItem,
ListItem, TableHead, TableBody, TableRow, TableCell, TimelineItem,
TreeItem, Radio, CheckboxGroup.

## License

MIT
