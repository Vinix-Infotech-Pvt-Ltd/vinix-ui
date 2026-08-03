# Vinix UI — Documentation

Everything you need to install, theme, and build with **Vinix UI** — the shared
design system for every Vinix Infotech product. One theme, one component library,
shipped to both **npm** (`@vinixinfotech/ui`) and **Composer** (`vinix/ui`) from a
single source.

## Guides

| Guide | What's inside |
|-------|---------------|
| **[Getting Started](./getting-started.md)** | Install & setup for both npm and Composer/Laravel, CDN quick-start, and a "verify it works" check. |
| **[Component Reference](./components.md)** | Every component — plain HTML/CSS **and** `<x-vx-*>` Blade usage, with variants, props, and states. |
| **[Theming & Tokens](./theming.md)** | The `--vx-*` token system, re-branding a product, dark mode, and the optional Tailwind preset. |
| **[JavaScript & Behaviors](./javascript.md)** | The `window.VinixUI` API, every `data-vx-*` behavior, and the events components emit. |
| **[Live Gallery](./gallery.html)** | Open in a browser — a rendered catalogue of every component, with a dark-mode toggle. |

## Install at a glance

**npm (pure JS / HTML / bundlers)**
```bash
npm install @vinixinfotech/ui
```
```html
<link rel="stylesheet" href="node_modules/@vinixinfotech/ui/dist/vinix-ui.css">
<script src="node_modules/@vinixinfotech/ui/dist/vinix-ui.js"></script>
<body class="vx">
  <button class="vx-btn vx-btn-primary">Save</button>
</body>
```

**Composer (Laravel Blade)**
```bash
composer require vinix/ui
php artisan vendor:publish --tag=vinix-ui-assets
```
```blade
<link rel="stylesheet" href="{{ asset('vendor/vinix-ui/vinix-ui.css') }}">
<script src="{{ asset('vendor/vinix-ui/vinix-ui.js') }}" defer></script>

<x-vx-button variant="primary">Save</x-vx-button>
```

See **[Getting Started](./getting-started.md)** for the full walkthrough.

## Core ideas

1. **Prefix everything `vx-`** — CSS classes, `data-vx-*`, `<x-vx-*>`.
2. **Plain CSS, no framework required.** The shipped `dist/vinix-ui.css` is self-contained and driven by `--vx-*` variables. Tailwind is an optional convenience, never a requirement.
3. **Theme via variables.** Re-brand a product by overriding a few `--vx-*` vars (usually `--vx-accent` + `--vx-primary-600`). See [Theming](./theming.md).
4. **Behaviors auto-init.** Load `vinix-ui.js` and components wire themselves from `data-vx-*` attributes. See [JavaScript](./javascript.md).
5. **Semver + pinning.** Consumers pin a version (`^1.1`) and are unaffected by new releases until they run `npm/composer update`. See the [Changelog](../CHANGELOG.md).

## Links

- **npm:** https://www.npmjs.com/package/@vinixinfotech/ui
- **Packagist:** https://packagist.org/packages/vinix/ui
- **Source:** https://github.com/Vinix-Infotech-Pvt-Ltd/vinix-ui
- **License:** [MIT](../LICENSE)
