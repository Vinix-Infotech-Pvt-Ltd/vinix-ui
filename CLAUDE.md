# CLAUDE.md — Vinix UI

Context for any Claude session working in this folder
(`.../Main Products/vinix-ui`). Read this first.

## What this is
**Vinix UI** is the shared design system + component library for **every product
Vinix Infotech builds**. One theme, one layout language, reused everywhere.

It ships from a **single source** to **two package managers**:
- **npm** → `@vinixinfotech/ui` — for pure-JS / plain-HTML projects (and bundlers).
- **Composer** → `vinix/ui` — for Laravel apps (`<x-vx-*>` Blade components).

The look was **ported from DealSync360** (`../DealSync360/DealSync360/dealsync360`).
That app is the visual reference ONLY. **Never modify DealSync360 from here** —
this repo is standalone; we only copied styles out of it.

## Golden rules
1. **Prefix everything `vx-`** (CSS classes, `data-vx-*`, `<x-vx-*>`).
2. **Components are plain CSS driven by `--vx-*` variables — NO Tailwind dependency.**
   A pure-JS consumer must be able to drop in `dist/vinix-ui.css` and it just works.
   The Tailwind preset is an *optional* convenience, never a requirement.
3. **Theme via variables.** Re-branding a product = override a few `--vx-*` vars
   (usually `--vx-accent` + `--vx-primary-600`) in the consumer's own CSS. Do not
   hard-code brand hex inside component rules — always `var(--vx-...)`.
4. **`dist/` is committed.** So git-tag installs (npm & composer) work with no
   build step on the consumer. After any CSS/JS change: run the build, commit dist.
5. **Backward compatibility is sacred.** See Versioning. Never rename/remove a
   class or change markup in a MINOR/PATCH release.

## File map
```
vinix-ui/
  package.json            npm package (@vinixinfotech/ui) — version lives here
  composer.json           composer package (vinix/ui)
  tailwind-preset.cjs     optional Tailwind preset (mirror of tokens.css)
  scripts/build.mjs       zero-dep build: inlines src/css/* -> dist, copies js
  src/
    css/
      tokens.css          --vx-* design tokens (the theme)
      base.css            minimal opt-in base (.vx-root / body.vx)
      components.css       all component styles (buttons, cards, badges, table, forms, alert, dropdown, modal, tabs, avatar, skeleton, empty, breadcrumb, pagination, toast, section-divider)
      layout.css           app shell (header bar, nav tabs, quick panel, bottom bar, container)
      vinix-ui.css         dev entry (@imports the 4 partials)
    js/vinix-ui.js         vanilla behaviors (dropdown/modal/tabs/toast) -> window.VinixUI
    laravel/VinixUiServiceProvider.php   registers <x-vx-*> + publish tags
  resources/views/components/*.blade.php   Blade components (anonymous, prefix vx)
  dist/vinix-ui.css        BUILT, committed
  dist/vinix-ui.js         BUILT, committed
  docs/gallery.html        component showcase (open in a browser)
  CHANGELOG.md             Keep-a-Changelog, semver
```

## How consumers use it

### Pure JS / HTML (npm)
```html
<link rel="stylesheet" href="node_modules/@vinixinfotech/ui/dist/vinix-ui.css">
<script src="node_modules/@vinixinfotech/ui/dist/vinix-ui.js"></script>
<body class="vx">
  <button class="vx-btn vx-btn-primary">Save</button>
</body>
```
`VinixUI.toast('Saved','success')`, `VinixUI.openModal('id')` available; behaviors
auto-init from `data-vx-*`.

### Laravel (Composer)
```bash
composer require vinix/ui
php artisan vendor:publish --tag=vinix-ui-assets   # -> public/vendor/vinix-ui/
```
Layout `<head>`/`<body>`:
```blade
<link rel="stylesheet" href="{{ asset('vendor/vinix-ui/vinix-ui.css') }}">
<script src="{{ asset('vendor/vinix-ui/vinix-ui.js') }}" defer></script>
```
Then use components:
```blade
<x-vx-button variant="primary">Save</x-vx-button>
<x-vx-badge variant="live">LIVE</x-vx-badge>
<x-vx-stat-card label="Total Saudas" value="426" trend="▲ 12%" trend-dir="up" />
<x-vx-card title="Recent"> … </x-vx-card>
<x-vx-input label="Name" name="name" required />
```

### Re-brand a product (one place)
```css
/* app.css, loaded AFTER vinix-ui.css */
:root{ --vx-accent:#6D28D9; --vx-accent-hover:#5B21B6; --vx-primary-600:#7C3AED; }
```

### Tailwind users (optional)
```js
// tailwind.config.js
module.exports = { presets: [require('@vinixinfotech/ui/preset')], content: [...] };
```

## Build
```bash
node scripts/build.mjs      # or: npm run build
```
Regenerates `dist/vinix-ui.css` (inlined tokens+base+components+layout) and
`dist/vinix-ui.js`. **Commit dist after building.** No other toolchain needed.

## Versioning & releases (THE important part)
Semantic versioning `MAJOR.MINOR.PATCH`:
- **PATCH** (1.2.0→1.2.1): bug/visual fix, no API change.
- **MINOR** (1.2→1.3): new component/feature, backward-compatible.
- **MAJOR** (1.x→2.0): breaking (renamed/removed class, changed markup/props).

Consumers pin (`"@vinixinfotech/ui":"^1.2"` / `"vinix/ui":"^1.2"`) and freeze the exact
version in their lockfile. **Publishing a new version never touches an existing
project** until it runs `npm/composer update`. So a v1.2 product stays on v1.2
until it opts in — exactly the isolation we want.

**Release checklist:**
1. Make the change (CSS/Blade/JS). Keep it backward-compatible unless it's a major.
2. `node scripts/build.mjs` and commit `dist/`.
3. Bump `version` in **package.json** (and note it — composer version comes from the git tag).
4. Update **CHANGELOG.md** under a new version heading.
5. Commit, then tag: `git tag v1.3.0 && git push --tags` (git tag = the composer/npm version).
6. Publish if using registries: `npm publish` (Packagist auto-syncs composer from the tag).

Because consumers pin versions, older products are unaffected. If a consumer wants
to stay on v1.2 forever, they simply never bump — no action needed here.

## Adding a new component (recipe)
1. Add plain CSS (using `--vx-*` vars) to `src/css/components.css` under a clear `/* --- NAME --- */` block, class `.vx-name`.
2. Add a Blade component `resources/views/components/name.blade.php` (anonymous, `@props`, render the `.vx-*` classes) so Laravel gets `<x-vx-name>`.
3. Add a demo block to `docs/gallery.html`.
4. `node scripts/build.mjs`, commit dist.
5. CHANGELOG entry, bump MINOR version, tag.

## Do / Don't
- ✅ Do keep component CSS self-contained + variable-driven.
- ✅ Do mirror any new token in BOTH `tokens.css` and `tailwind-preset.cjs`.
- ❌ Don't add runtime deps (keep JS vanilla, build zero-dep).
- ❌ Don't `@apply` Tailwind in the shipped CSS (breaks pure-JS consumers).
- ❌ Don't edit DealSync360 or any consumer app from this repo.
