# Getting Started with Vinix UI

Vinix UI is the shared design system and component library for Vinix Infotech products — one theme, every product. It ships from a single source to **npm** (`@vinixinfotech/ui`, for pure JS / HTML / bundlers) and **Composer** (`vinix/ui`, for Laravel Blade). The shipped CSS is plain and self-contained, driven entirely by `--vx-*` CSS variables — no framework or Tailwind required.

---

## Requirements

| Path | Needs |
| --- | --- |
| Any (CSS + JS) | A modern evergreen browser (Chrome, Edge, Firefox, Safari). |
| Composer / Laravel | PHP `^8.1` and Laravel 10, 11, or 12 (`illuminate/support ^10 \| ^11 \| ^12`). |
| Tailwind preset (optional) | Node.js — **only** if you consume the optional Tailwind preset. It is never required to use the components. |

The core stylesheet and JS have **zero runtime dependencies**. Drop in `dist/vinix-ui.css` (and optionally `dist/vinix-ui.js`) and it just works.

---

## Install via npm

```bash
npm install @vinixinfotech/ui
```

> Prefer to pin a git tag instead of the registry? `npm install "git+https://github.com/Vinix-Infotech-Pvt-Ltd/vinix-ui.git#v1.1.4"`

### (a) Plain HTML — link `dist` from `node_modules`

```html
<link rel="stylesheet" href="node_modules/@vinixinfotech/ui/dist/vinix-ui.css">
<script src="node_modules/@vinixinfotech/ui/dist/vinix-ui.js"></script>

<body class="vx">
  <button class="vx-btn vx-btn-primary">Save</button>
</body>
```

Add `class="vx"` to `<body>` (or wrap your app in an element with `class="vx-root"`) to apply the Vinix font and background.

### (b) Bundler (Vite, webpack, etc.) — import the package

```js
import '@vinixinfotech/ui/css';  // dist/vinix-ui.css
import '@vinixinfotech/ui';      // dist/vinix-ui.js — exposes window.VinixUI, auto-inits behaviors
```

The package exports map:

| Import | Resolves to |
| --- | --- |
| `@vinixinfotech/ui` | `dist/vinix-ui.js` (the JS behaviors, `main`) |
| `@vinixinfotech/ui/css` | `dist/vinix-ui.css` |
| `@vinixinfotech/ui/preset` | `tailwind-preset.cjs` (optional Tailwind preset) |

### (c) CDN (jsDelivr) — quick prototypes, no install

Pull the built files straight from the GitHub tag:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Vinix-Infotech-Pvt-Ltd/vinix-ui@v1.1.4/dist/vinix-ui.css">
<script src="https://cdn.jsdelivr.net/gh/Vinix-Infotech-Pvt-Ltd/vinix-ui@v1.1.4/dist/vinix-ui.js"></script>

<body class="vx">
  <button class="vx-btn vx-btn-primary">Save</button>
</body>
```

Great for a CodePen or a throwaway HTML file. For real apps, install via npm so you can pin and lock the version.

---

## Install via Composer (Laravel)

```bash
composer require vinix/ui
php artisan vendor:publish --tag=vinix-ui-assets
```

The service provider is auto-discovered — no manual registration needed. Publishing `vinix-ui-assets` copies the compiled CSS/JS to `public/vendor/vinix-ui/`.

Reference them in your layout's `<head>` / end of `<body>`:

```blade
<link rel="stylesheet" href="{{ asset('vendor/vinix-ui/vinix-ui.css') }}">
<script src="{{ asset('vendor/vinix-ui/vinix-ui.js') }}" defer></script>

<body class="vx">
    <x-vx-button variant="primary">Save</x-vx-button>
    <x-vx-badge variant="live">LIVE</x-vx-badge>
</body>
```

The `<x-vx-*>` components are registered automatically by `VinixUiServiceProvider` — no config to touch.

### Publish tags

Vinix UI exposes three `vendor:publish` tags:

| Tag | Publishes | Use it when |
| --- | --- | --- |
| `vinix-ui-assets` | `dist/` → `public/vendor/vinix-ui/` (`vinix-ui.css`, `vinix-ui.js`) | Always — this is the standard install that serves the compiled CSS/JS. |
| `vinix-ui-preset` | `tailwind-preset.cjs` → `base_path('vinix-ui-preset.cjs')` | Only if your app uses Tailwind and you want the Vinix tokens as a preset. |
| `vinix-ui-src` | `src/css/` → `resource_path('css/vinix-ui')` | Only if you compile the raw CSS source into your own bundle (e.g. via Vite) instead of serving the prebuilt file. |

```bash
# publish everything at once (optional)
php artisan vendor:publish --tag=vinix-ui-assets
php artisan vendor:publish --tag=vinix-ui-preset
php artisan vendor:publish --tag=vinix-ui-src
```

---

## Verify it works

### npm / CDN — a full page

Save this as `index.html` and open it in a browser. Clicking the button should fire a toast, which confirms `vinix-ui.js` loaded and `window.VinixUI` is live.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Vinix UI test</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Vinix-Infotech-Pvt-Ltd/vinix-ui@v1.1.4/dist/vinix-ui.css">
</head>
<body class="vx">
  <button class="vx-btn vx-btn-primary" onclick="VinixUI.toast('Vinix UI is working!', 'success')">
    Show toast
  </button>

  <script src="https://cdn.jsdelivr.net/gh/Vinix-Infotech-Pvt-Ltd/vinix-ui@v1.1.4/dist/vinix-ui.js"></script>
</body>
</html>
```

> Using node_modules paths instead of the CDN? Swap the two URLs for `node_modules/@vinixinfotech/ui/dist/vinix-ui.css` and `.../vinix-ui.js`.

### Laravel — a Blade snippet

Drop this into any Blade view (with the CSS/JS linked in your layout). The button renders styled, and clicking it fires a toast.

```blade
<x-vx-button variant="primary" onclick="VinixUI.toast('Vinix UI is working!', 'success')">
    Show toast
</x-vx-button>
```

Behaviors auto-init on `DOMContentLoaded` from `data-vx-*` attributes, so most components (dropdown, modal, tabs, toast, accordion, drawer, etc.) work with no wiring.

---

## Pin & upgrade

Consumers **pin a version** and are never affected by new releases until they explicitly update.

- **npm** — pin a caret range in `package.json` (e.g. `"@vinixinfotech/ui": "^1.1"`); the exact version is frozen in `package-lock.json`. Upgrade with `npm update @vinixinfotech/ui`.
- **Composer** — pin in `composer.json` (e.g. `"vinix/ui": "^1.1"`); frozen in `composer.lock`. Upgrade with `composer update vinix/ui`.

Vinix UI follows [semver](https://semver.org): PATCH = fixes, MINOR = new backward-compatible components, MAJOR = breaking changes. Because you pin, a v1.1 product stays on v1.1 until it opts in. Review what changed before upgrading in [CHANGELOG.md](https://github.com/Vinix-Infotech-Pvt-Ltd/vinix-ui/blob/main/CHANGELOG.md).

---

## Next steps

- [Components reference](./components.md) — every `.vx-*` class and `<x-vx-*>` component.
- [Theming](./theming.md) — re-brand a product and enable dark mode via `--vx-*` variables.
- [JavaScript behaviors](./javascript.md) — the `window.VinixUI` API and `data-vx-*` auto-init.
- [Live component gallery](gallery.html) — open in a browser to see everything rendered.
