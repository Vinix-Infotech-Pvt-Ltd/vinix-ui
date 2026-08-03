# Vinix UI

[![npm](https://img.shields.io/npm/v/@vinixinfotech/ui?logo=npm&label=npm)](https://www.npmjs.com/package/@vinixinfotech/ui)
[![Packagist](https://img.shields.io/packagist/v/vinix/ui?logo=composer&label=composer)](https://packagist.org/packages/vinix/ui)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CSS size](https://img.shields.io/badge/CSS-~48kB-informational)](dist/vinix-ui.css)
[![No dependencies](https://img.shields.io/badge/runtime%20deps-0-brightgreen)]()

Shared design system & component library for Vinix Infotech products — **one theme,
every product**. Ships from a single source to **npm** (pure JS / HTML) and
**Composer** (Laravel Blade). Plain, self-contained CSS driven by CSS variables —
**no framework required** — plus ~2 KB of dependency-free vanilla JS.

> Ported from the DealSync360 design system. Navy + blue, clean SaaS/ERP look.
> 40+ components, a full token system, dark mode, and a responsive app shell.

## Documentation

📖 **Docs site:** https://vinix-infotech-pvt-ltd.github.io/vinix-ui/ · source in [`docs/`](docs/README.md).

| Guide | What's inside |
|-------|---------------|
| [Getting Started](docs/getting-started.md) | Install & setup for npm **and** Composer/Laravel, CDN quick-start, verify-it-works. |
| [Component Reference](docs/components.md) | Every component — plain HTML/CSS **and** `<x-vx-*>` Blade usage, variants, props. |
| [Theming & Tokens](docs/theming.md) | The `--vx-*` tokens, per-product re-brand, dark mode, Tailwind preset. |
| [JavaScript & Behaviors](docs/javascript.md) | `window.VinixUI` API, all `data-vx-*` behaviors, and emitted events. |
| [Live Gallery](docs/gallery.html) | Rendered catalogue of every component (open in a browser). |

## Quick start

### npm — pure JS / HTML / bundlers
```bash
npm install @vinixinfotech/ui
```
```html
<link rel="stylesheet" href="node_modules/@vinixinfotech/ui/dist/vinix-ui.css">
<script src="node_modules/@vinixinfotech/ui/dist/vinix-ui.js"></script>

<body class="vx">
  <button class="vx-btn vx-btn-primary">Save</button>
  <span class="vx-badge vx-badge-live">LIVE</span>
</body>
```
In a bundler: `import '@vinixinfotech/ui/css';` and `import VinixUI from '@vinixinfotech/ui';`

**CDN (prototypes)** — via jsDelivr from a tag:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Vinix-Infotech-Pvt-Ltd/vinix-ui@v1.1.2/dist/vinix-ui.css">
<script src="https://cdn.jsdelivr.net/gh/Vinix-Infotech-Pvt-Ltd/vinix-ui@v1.1.2/dist/vinix-ui.js"></script>
```

### Composer — Laravel Blade
```bash
composer require vinix/ui
php artisan vendor:publish --tag=vinix-ui-assets   # -> public/vendor/vinix-ui/
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

> Full walkthrough (bundlers, all publish tags, verification): **[Getting Started](docs/getting-started.md)**.

## Theming

Re-brand a product by overriding a few variables **after** the stylesheet:
```css
:root{ --vx-accent:#6D28D9; --vx-accent-hover:#5B21B6; --vx-primary-600:#7C3AED; }
```
Same layout & components, different brand colour. **Dark mode** — opt in on any ancestor:
```html
<html data-vx-theme="dark">   <!-- or class="vx-dark" on any wrapper -->
```
The token-driven components flip automatically; re-branding still applies in both themes.
Details: **[Theming & Tokens](docs/theming.md)**.

## What's included

- **Tokens** — colours, type scale, radii, shadows (`--vx-*`) + a full dark theme.
- **40+ components** — button, card (+ outlined/interactive), stat-card, badge, table,
  input, select, textarea, label, range, file dropzone, input-group, combobox,
  multiselect, datepicker, alert, section-divider, dropdown, modal, drawer, popover,
  tabs, accordion, tooltip, switch, checkbox, radio, spinner, chip, progress,
  segmented control, stepper, timeline, list, avatar (+ group), skeleton,
  empty-state, breadcrumb, pagination, toast.
- **Typography utilities** — `.vx-h1`–`.vx-h4`, `.vx-text-muted`, `.vx-link`, `.vx-mono`.
- **Responsive app shell** — header bar, nav tabs, quick panel, bottom status bar,
  with a mobile nav toggle and off-canvas quick panel.
- **Vanilla JS** (`window.VinixUI`) — dropdown, modal (focus-trapped), tabs, toast,
  accordion, drawer, popover, segmented, combobox, multiselect, datepicker, and a
  generic `data-vx-toggle`; auto-init via `data-vx-*`.
- **Tailwind preset** (optional) — `require('@vinixinfotech/ui/preset')`.

## Versioning

Semantic versioning (`MAJOR.MINOR.PATCH`). Consumers pin a version (`^1.1`) and are
**never affected** by new releases until they run `npm update` / `composer update`.
See the [Changelog](CHANGELOG.md).

## Develop

```bash
node scripts/build.mjs   # rebuild dist/ after editing src/  (zero-dependency)
```
`dist/` is committed so git-tag installs work with no build step on the consumer side.
Contributor notes and the release process live in [`CLAUDE.md`](CLAUDE.md).

---

© Vinix Infotech Pvt. Ltd. — released under the [MIT License](LICENSE).
