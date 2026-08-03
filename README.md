# Vinix UI

Shared design system & component library for Vinix Infotech products — **one theme,
every product**. Ships from a single source to **npm** (pure JS / HTML) and
**Composer** (Laravel Blade). Plain, self-contained CSS driven by CSS variables;
no framework required.

> Ported from the DealSync360 design system. Navy + blue, clean SaaS/ERP look.

## Install

### npm (pure JS / HTML / bundlers)
```bash
npm install @vinix/ui          # from the npm registry
# or pin a git tag:
npm install "git+https://github.com/Vinix-Infotech-Pvt-Ltd/vinix-ui.git#v1.1.1"
```
```html
<link rel="stylesheet" href="node_modules/@vinix/ui/dist/vinix-ui.css">
<script src="node_modules/@vinix/ui/dist/vinix-ui.js"></script>

<body class="vx">
  <button class="vx-btn vx-btn-primary">Save</button>
  <span class="vx-badge vx-badge-live">LIVE</span>
</body>
```

### Composer (Laravel)
```bash
composer require vinix/ui
php artisan vendor:publish --tag=vinix-ui-assets
```
```blade
<link rel="stylesheet" href="{{ asset('vendor/vinix-ui/vinix-ui.css') }}">
<script src="{{ asset('vendor/vinix-ui/vinix-ui.js') }}" defer></script>

<x-vx-button variant="primary">Save</x-vx-button>
<x-vx-stat-card label="Total Saudas" value="426" trend="▲ 12%" trend-dir="up" />
<x-vx-badge variant="live">LIVE</x-vx-badge>
<x-vx-card title="Recent"> … </x-vx-card>
<x-vx-input label="Party name" name="name" required />
```

## Theming (re-brand per product)
Override a few variables **after** the stylesheet:
```css
:root{ --vx-accent:#6D28D9; --vx-accent-hover:#5B21B6; --vx-primary-600:#7C3AED; }
```
Same layout & components, different brand colour.

## Dark mode
Opt in on any ancestor — the token-driven components flip automatically:
```html
<html data-vx-theme="dark">   <!-- or class="vx-dark" on any wrapper -->
```
Re-branding still applies in both themes.

## What's included
- **Tokens**: colours, type scale, spacing, radii, shadows (`--vx-*`) + a dark theme.
- **Components**: button, card (+ outlined/interactive), stat-card, badge, table,
  input, select, textarea, label, range, file dropzone, input-group, combobox,
  multiselect, datepicker, alert, section-divider, dropdown, modal, drawer, popover,
  tabs, accordion, tooltip, switch, checkbox, radio, spinner, chip, progress,
  segmented control, stepper, timeline, list, avatar (+ group), skeleton,
  empty-state, breadcrumb, pagination, toast.
- **Typography utilities**: `.vx-h1`–`.vx-h4`, `.vx-text-muted`, `.vx-link`.
- **App shell**: header bar, horizontal nav tabs, quick panel, bottom status bar —
  responsive, with a mobile nav toggle and off-canvas quick panel.
- **JS behaviors** (`window.VinixUI`): dropdown, modal (focus-trapped), tabs, toast,
  accordion, drawer, popover, segmented, combobox, multiselect, datepicker, and a
  generic `data-vx-toggle` — auto-init via `data-vx-*`.
- **Tailwind preset** (optional): `require('@vinix/ui/preset')`.

See **`docs/gallery.html`** for a live catalogue of every component.

## Develop
```bash
node scripts/build.mjs   # rebuild dist/ after editing src/
```
Versioning follows [semver](https://semver.org); consumers pin a version and are
never affected by new releases until they update. See `CHANGELOG.md` and `CLAUDE.md`.

© Vinix Infotech Pvt. Ltd. — released under the [MIT License](LICENSE).
