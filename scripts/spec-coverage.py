#!/usr/bin/env python3
"""Mechanical coverage check: spec section 7 catalog (120 items) vs actual repo.

Maps every catalog item to one of:
  export  - same-name `export { default as X }` in src/index.ts
  variant - same component under a documented variant name (FAB->Fab, ...)
  prop    - covered by a prop on another export (Upload/Dropzone->File[dropzone])
  script  - covered by a TS util in src/scripts/ (Portal, Popper, ...)
  style   - covered by a stylesheet (CSS Baseline -> styles/base.css)
  slot    - covered by a documented slot (Icon -> EmptyState slot="icon")

Known partials (Slider range, Checkbox group) are derived mechanically below
and FAIL coverage: exit 1 with the partial named.

Exit 0: all 120 fully covered. Exit 1: gaps and/or known partials remain.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

exports = re.findall(
    r'export \{ default as ([A-Za-z]+) \}', (ROOT / 'src/index.ts').read_text()
)
EXPORTS = set(exports)
assert len(exports) == len(EXPORTS), 'duplicate export names in src/index.ts'

FILE = (ROOT / 'src/components/File.astro').read_text()
TEXTAREA = (ROOT / 'src/components/Textarea.astro').read_text()
TOGGLE = (ROOT / 'src/components/ToggleButton.astro').read_text()
EMPTYSTATE = (ROOT / 'src/components/EmptyState.astro').read_text()
SLIDER = (ROOT / 'src/components/Slider.astro').read_text()
CHECKBOX = (ROOT / 'src/components/Checkbox.astro').read_text()

# (spec name, kind, evidence)
# evidence: export name(s), or 'path:substring' that must exist in the file.
CATALOG = [
    # A. Inputs & Form (35)
    ('Button', 'export', 'Button'),
    ('IconButton', 'export', 'IconButton'),
    ('ButtonGroup', 'export', 'ButtonGroup'),
    ('ToggleButton (+group exclusive)', 'prop', 'ToggleButton:exclusiveGroup'),
    ('SegmentedControl', 'export', 'SegmentedControl'),
    ('FAB', 'variant', 'Fab'),
    ('Checkbox', 'export', 'Checkbox'),
    ('RadioGroup', 'export', 'RadioGroup'),
    ('Switch', 'export', 'Switch'),
    ('Select', 'export', 'Select'),
    ('MultiSelect', 'export', 'MultiSelect'),
    ('Combobox', 'export', 'Combobox'),
    ('Autocomplete', 'export', 'Autocomplete'),
    ('Slider', 'export', 'Slider'),
    ('Rating', 'export', 'Rating'),
    ('TextField', 'export', 'TextField'),
    ('NumberInput', 'export', 'NumberInput'),
    ('PasswordInput', 'export', 'PasswordInput'),
    ('SearchInput', 'export', 'SearchInput'),
    ('OTPInput', 'variant', 'OtpInput'),
    ('ColorPicker', 'export', 'ColorPicker'),
    ('Textarea (+autosize)', 'prop', 'Textarea:autosize'),
    ('Upload/Dropzone', 'prop', 'File:dropzone'),
    ('TransferList', 'export', 'TransferList'),
    ('TagInput', 'export', 'TagInput'),
    ('Cascader', 'export', 'Cascader'),
    ('TreeSelect', 'export', 'TreeSelect'),
    ('DatePicker', 'export', 'DatePicker'),
    ('TimePicker', 'export', 'TimePicker'),
    ('DateTimePicker', 'export', 'DateTimePicker'),
    ('DateRangePicker', 'export', 'DateRangePicker'),
    ('Calendar', 'export', 'Calendar'),
    ('Field (label + hint + error)', 'export', 'Field'),
    ('InputGroup', 'export', 'InputGroup'),
    ('Form (validation)', 'export', 'Form'),
    # B. Data display (23)
    ('Accordion', 'export', 'Accordion+AccordionItem'),
    ('Avatar', 'export', 'Avatar'),
    ('AvatarGroup', 'export', 'AvatarGroup'),
    ('Badge', 'export', 'Badge'),
    ('Chip (spec name: Tag)', 'export', 'Chip'),
    ('Card', 'export', 'Card'),
    ('Divider', 'export', 'Divider'),
    ('Kbd', 'export', 'Kbd'),
    ('List (+ListItem)', 'export', 'List+ListItem'),
    ('ImageList', 'export', 'ImageList'),
    ('Carousel', 'export', 'Carousel'),
    ('Table', 'export', 'Table+TableHead+TableBody+TableRow+TableCell'),
    ('DataGrid', 'export', 'DataGrid'),
    ('TreeView', 'variant', 'Tree+TreeItem'),
    ('Timeline', 'export', 'Timeline+TimelineItem'),
    ('Statistic', 'export', 'Statistic'),
    ('Descriptions', 'export', 'Descriptions'),
    ('Tooltip', 'export', 'Tooltip'),
    ('Typography', 'export', 'Typography'),
    ('Blockquote', 'export', 'Blockquote'),
    ('CodeBlock', 'export', 'CodeBlock'),
    ('Spoiler', 'export', 'Spoiler'),
    ('Highlight', 'export', 'Highlight'),
    # C. Feedback (14)
    ('Alert', 'export', 'Alert'),
    ('Callout', 'export', 'Callout'),
    ('Banner', 'export', 'Banner'),
    ('Toast/Snackbar', 'variant', 'Toast'),
    ('Backdrop', 'export', 'Backdrop'),
    ('Dialog/Modal', 'variant', 'Dialog'),
    ('ConfirmDialog', 'export', 'ConfirmDialog'),
    ('Progress', 'export', 'Progress'),
    ('ProgressRing', 'export', 'ProgressRing'),
    ('Spinner', 'export', 'Spinner'),
    ('Skeleton', 'export', 'Skeleton'),
    ('EmptyState', 'export', 'EmptyState'),
    ('Result', 'export', 'Result'),
    ('LoadingOverlay', 'export', 'LoadingOverlay'),
    # D. Surfaces & Layout (13)
    ('Container', 'export', 'Container'),
    ('Grid', 'export', 'Grid'),
    ('Stack', 'export', 'Stack'),
    ('Paper', 'export', 'Paper'),
    ('AppShell', 'export', 'AppShell'),
    ('PageHeader', 'export', 'PageHeader'),
    ('Navbar/AppBar', 'variant', 'Navbar'),
    ('Sidebar', 'export', 'Sidebar'),
    ('ScrollArea', 'export', 'ScrollArea'),
    ('Splitter', 'export', 'Splitter'),
    ('ScrollShadow', 'export', 'ScrollShadow'),
    ('AspectRatio', 'export', 'AspectRatio'),
    ('Affix', 'export', 'Affix'),
    # E. Navigation (16)
    ('Tabs', 'export', 'Tabs'),
    ('Breadcrumbs', 'export', 'Breadcrumbs'),
    ('Pagination', 'export', 'Pagination'),
    ('Menu/Dropdown', 'variant', 'Menu'),
    ('NavigationMenu', 'export', 'NavigationMenu'),
    ('Menubar', 'export', 'Menubar'),
    ('ContextMenu', 'export', 'ContextMenu'),
    ('Link', 'export', 'Link'),
    ('Stepper', 'export', 'Stepper'),
    ('BottomNavigation', 'export', 'BottomNavigation'),
    ('Anchor (scrollspy)', 'export', 'Anchor'),
    ('CommandMenu', 'export', 'CommandMenu'),
    ('Drawer', 'export', 'Drawer'),
    ('Sheet', 'export', 'Sheet'),
    ('SpeedDial', 'export', 'SpeedDial'),
    ('Tour', 'export', 'Tour'),
    # F. Overlay & Utils (11)
    ('Popover', 'export', 'Popover'),
    ('HoverCard', 'export', 'HoverCard'),
    ('Portal (util)', 'script', 'src/scripts/portal.ts'),
    ('Popper (util positioning)', 'script', 'src/scripts/popper.ts'),
    ('ClickAwayListener (util)', 'script', 'src/scripts/clickaway.ts'),
    ('FocusTrap (util)', 'script', 'src/scripts/focus-trap.ts'),
    ('VisuallyHidden', 'export', 'VisuallyHidden'),
    ('SkipLink', 'export', 'SkipLink'),
    ('CopyButton', 'export', 'CopyButton'),
    ('Icon (inline SVG + slot icon)', 'slot', 'EmptyState:slot name="icon"'),
    ('CSS Baseline (= base.css)', 'style', 'src/styles/base.css'),
    # G. Charts (8)
    ('LineChart', 'export', 'LineChart'),
    ('BarChart', 'export', 'BarChart'),
    ('AreaChart', 'export', 'AreaChart'),
    ('PieChart/Donut', 'variant', 'PieChart'),
    ('Sparkline', 'export', 'Sparkline'),
    ('RadarChart', 'export', 'RadarChart'),
    ('ScatterChart', 'export', 'ScatterChart'),
    ('Gauge', 'export', 'Gauge'),
]

SOURCES = {'File': FILE, 'Textarea': TEXTAREA,
           'ToggleButton': TOGGLE, 'EmptyState': EMPTYSTATE}

failures = []
consumed: set[str] = set()
for name, kind, evidence in CATALOG:
    if kind in ('export', 'variant', 'prop'):
        parts = evidence.split(':')
        for export_name in parts[0].split('+'):
            if export_name not in EXPORTS:
                failures.append(f'{name}: missing export {export_name}')
            else:
                consumed.add(export_name)
        if kind == 'prop':
            comp, needle = parts[0].split('+')[0], parts[1]
            if needle not in SOURCES[comp]:
                failures.append(f'{name}: prop {needle} not found in {comp}')
    elif kind == 'slot':
        comp, needle = evidence.split(':', 1)
        if needle not in SOURCES[comp]:
            failures.append(f'{name}: {needle} not found in {comp}')
    elif kind in ('script', 'style'):
        if not (ROOT / evidence).exists():
            failures.append(f'{name}: missing file {evidence}')

# Known partials, derived mechanically from component sources (fail coverage).
partials = []
if SLIDER.count('type="range"') < 2:
    partials.append('Slider: range variant missing')
if 'group' not in CHECKBOX.lower():
    partials.append('Checkbox: no group API')

print(f'catalog items: {len(CATALOG)} (spec section 7 target: 120)')
print(f'index.ts exports: {len(EXPORTS)}')
print(f'exports consumed by mapping: {len(consumed)}')
non_export = sum(1 for _, kind, _ in CATALOG if kind in ('script', 'slot', 'style'))
print(f'script/slot/style equivalents (no export): {non_export}')
multi = [e for _, _, e in CATALOG if '+' in e.split(':')[0]]
multi_count = sum(len(e.split(':')[0].split('+')) - 1 for e in multi)
print(f'extra subpart exports named in mapping: {multi_count}')
extra = sorted(EXPORTS - consumed)
print(f'extra exports beyond catalog mapping ({len(extra)}): '
      + (', '.join(extra) if extra else 'none'))

if len(CATALOG) != 120:
    failures.append(f'catalog list has {len(CATALOG)} items, expected 120')
if failures:
    print('UNCOVERED:')
    for failure in failures:
        print(f'  - {failure}')
if partials:
    print(f'KNOWN PARTIALS ({len(partials)}):')
    for partial in partials:
        print(f'  - {partial}')
full = len(CATALOG) - len(partials)
if failures or partials:
    print(f'coverage: {full}/120 fully covered, '
          f'{len(partials)} known partials')
    sys.exit(1)
print('coverage: 120/120 catalog items mapped, no gaps')
