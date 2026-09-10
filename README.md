# astro-ink

Lightweight, token-driven UI components for Astro. Server-rendered, zero
dependencies, fully themeable through CSS custom properties.

## Why

- **Light by construction.** Each component carries its own scoped CSS and a
  tiny script only when it needs one. A page using three components ships
  exactly three components' worth of code. Astro dedupes scripts
  automatically.
- **Customizable first.** Every color, radius, spacing value, and duration is
  a CSS custom property. Change `--ink-accent` once and the whole library
  follows. Component-level tokens (`--ink-button-radius`) override globally
  (`--ink-radius-md`).
- **Accessible by default.** WCAG AA contrast in light and dark mode, full
  keyboard operation, visible focus rings.

## Quick start

    npm install astro-ink

Import the styles once in your base layout:

    ---
    import "astro-ink/styles/tokens.css";
    import "astro-ink/styles/base.css";
    // optional dark theme:
    import "astro-ink/styles/themes/dark.css";
    ---

Use components in any Astro page:

    ---
    import { Button, Badge, Alert } from "astro-ink";
    ---

    <Alert variant="success" dismissible>
      <strong>Saved.</strong> Your changes are live.
    </Alert>
    <Button href="/start">Start building</Button>
    <Badge variant="accent">v0.1</Badge>

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
plus `dark`, `midnight` (dark-first), and `brutal` (neo-brutalist). Each
preset is one import of token overrides, one theme per page:

    import "astro-ink/styles/tokens.css";
    import "astro-ink/styles/base.css";
    // pick one preset (or none for the default light theme):
    import "astro-ink/styles/themes/dark.css";
    import "astro-ink/styles/themes/midnight.css";
    import "astro-ink/styles/themes/brutal.css";

Set the theme with an attribute (the toggle logic belongs to your app):

    document.documentElement.dataset.theme = "midnight";
    // or: "light", "dark", "brutal"

## Docs

The docs site lives in `docs/`. Run it locally with `npm run docs:dev`.
Every catalog component has a page with a live demo, a copy-paste snippet,
a props table, and accessibility notes.

## Status

Roadmap complete: 120/120 catalog components per spec §7
(`docs/superpowers/specs/2026-08-12-astro-ink-design.md`), verified by
`scripts/spec-coverage.py`: Button, Badge, Alert, Container,
VisuallyHidden, Field, TextField, NumberInput, PasswordInput, SearchInput,
Textarea, Select, Checkbox, Radio, RadioGroup, Switch, Slider, File,
InputGroup, Form, ButtonGroup, ToggleButton, Link, Breadcrumbs, Anchor,
Navbar, Sidebar, Tabs, Pagination, Stepper, Menu, Menubar, ContextMenu,
NavigationMenu, CommandMenu, Drawer, Sheet, SpeedDial, BottomNavigation,
Tour, Dialog, ConfirmDialog, Backdrop, Toast, Popover, HoverCard, Progress,
ProgressRing, Spinner, Callout, Banner, EmptyState, Result, LoadingOverlay,
SkipLink, CopyButton, Chip, Divider, Kbd, Paper, Grid, Stack, AppShell,
PageHeader, ScrollArea, ScrollShadow, AspectRatio, Splitter, Affix,
Accordion, Avatar, AvatarGroup, Card, List, ImageList, Carousel, Table,
Tooltip, Typography, Blockquote, CodeBlock, Spoiler, Highlight, Statistic,
Descriptions, Skeleton, Timeline, TreeView, Fab, IconButton,
SegmentedControl, Rating, Combobox, Autocomplete, MultiSelect, OTPInput,
ColorPicker, TagInput, Cascader, TreeSelect, TransferList, Calendar,
DatePicker, TimePicker, DateTimePicker, DateRangePicker, DataGrid,
LineChart, BarChart, AreaChart, PieChart, Sparkline, Gauge, RadarChart,
ScatterChart.
Utilities: focus-trap, dismiss, roving, scrollspy, pagination builder,
autosize, slider fill, split math, highlight split, Popper, Portal, ClickAway.

Plus 9 subpart/extra exports beyond the catalog items: AccordionItem,
ListItem, TableHead, TableBody, TableRow, TableCell, TimelineItem,
TreeItem, Radio.

## License

MIT
