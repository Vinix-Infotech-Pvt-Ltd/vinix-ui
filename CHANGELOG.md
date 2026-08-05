# Changelog

All notable changes to **Vinix UI** are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/), and the
project adheres to [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

- **MAJOR** — breaking changes (renamed/removed classes or components, changed markup).
- **MINOR** — new components/features, backward-compatible.
- **PATCH** — bug fixes and visual tweaks, backward-compatible.

> Consumers pin a version (e.g. `^1.2`). Publishing a new version never changes
> an installed project until it runs `npm update` / `composer update`.

## [Unreleased]

## [1.3.1] — 2026-08-03
### Fixed
- Navbar menu-bar dropdown submenus were invisible/unclickable — `.vx-navbar-menu-inner`
  used `overflow-x: auto`, whose scroll container clipped the absolutely-positioned
  `.vx-dropdown-menu`. Changed to `overflow: visible` (matches DealSync) so tab
  dropdowns and their items work.

## [1.3.0] — 2026-08-03
### Added
- **Navbar rebuilt as a faithful DealSync360 chrome** — a white header bar
  (`.vx-navbar`: brand, search `.vx-navbar-search`, icon buttons `.vx-navbar-icon`
  with a red `.vx-navbar-icon-dot`, actions `.vx-navbar-end`) **plus** an optional
  light-gray menu bar (`.vx-navbar-menu` / `.vx-navbar-tab`) with navy active tabs
  (`--vx-accent`) and dropdown submenus (reusing `.vx-dropdown-menu`). At ≤1024px
  the menu bar + search collapse and the hamburger opens a slide-in drawer.
- New Blade components: `<x-vx-navbar-menu>`, `<x-vx-navbar-tab>` (supports a
  `menu` slot for a dropdown), `<x-vx-navbar-icon>` (with `dot`). `<x-vx-navbar>`
  gained a `search` slot and a `drawer` prop (mobile-only nav for the two-row layout).

### Changed
- The `.vx-navbar` breakpoint moved from 900px to **1024px** to match the DealSync
  layout; hamburger/search/icon styling refined to the reference.

## [1.2.0] — 2026-08-03
### Added
- **Navbar component** — a reusable, responsive top bar (`.vx-navbar`) with brand,
  nav links (`.vx-navbar-link`, `.is-active`), optional search (`.vx-navbar-search`),
  and a right-side actions slot (`.vx-navbar-end`). On screens ≤900px the links
  collapse into a **slide-in drawer** opened by a hamburger (`.vx-navbar-toggle`),
  with a backdrop and close-on-link/backdrop/Escape — modelled on the DealSync360
  header. Blade: `<x-vx-navbar>` + `<x-vx-navbar-link>`. JS auto-inits via
  `data-vx-navbar` / `data-vx-navbar-toggle`. Fully token-driven (works in dark mode).

## [1.1.5] — 2026-08-03
### Fixed
- **Laravel: the documented `<x-vx-button>` (hyphen) Blade syntax now works.**
  Previously the service provider only registered the components via
  `anonymousComponentPath(..., 'vx')`, which exposes them as `<x-vx::button>`
  (double-colon) — so every hyphen example in the docs failed with
  "Unable to locate a class or view for component". The provider now also
  registers a `vx-{name}` alias per component (mapped to `vinix-ui::components.{name}`),
  so **both** `<x-vx-button>` and `<x-vx::button>` work. No markup or CSS changes.

## [1.1.4] — 2026-08-03
### Fixed
- GitHub Pages gallery now loads its CSS/JS. Pages serves the site from the
  `docs/` folder as root, so the old `../dist/*` paths 404'd. The build now
  mirrors the compiled `vinix-ui.css` / `vinix-ui.js` into `docs/`, and
  `docs/gallery.html` references them with same-folder relative paths.

## [1.1.3] — 2026-08-03
### Added
- **Documentation set** under `docs/`: getting-started (npm + Composer install),
  full component reference, theming & tokens guide, JavaScript/behaviors reference,
  and a docs hub (`docs/README.md`). Rewrote the top-level README with badges and
  links into the guides. Added a Docsify site for GitHub Pages.

### Fixed
- `VinixUI.version` now reports the correct version (was hard-coded `"1.1.0"`).
- The build now injects the package version into the JS automatically, so
  `VinixUI.version` and the CSS banner can never drift from `package.json` again.

## [1.1.2] — 2026-08-03
### Changed
- **npm package renamed to `@vinixinfotech/ui`** (the `@vinix` scope was
  unavailable). The Composer package name is unchanged (`vinix/ui`). No code or
  API changes — CSS, JS, Blade components, and tokens are identical to 1.1.1.

## [1.1.1] — 2026-08-03
### Changed
- **Relicensed under the MIT License** (was proprietary) — Vinix UI is now a public,
  open-source package installable by anyone via npm (`@vinixinfotech/ui`) and Composer
  (`vinix/ui`). No API or component changes.
- npm package set to public access; added `repository` / `homepage` / `bugs`
  metadata and MIT `license` fields (npm + Composer). Build banner updated to MIT.

## [1.1.0] — 2026-08-03
### Added
- **Dark theme** — opt in with `<html data-vx-theme="dark">` or `class="vx-dark"`.
  Flips the neutral ramp + surfaces via tokens; every existing component adapts
  with no markup changes. Re-branding (`--vx-accent` etc.) still applies in both themes.
- **New components** (CSS + Blade): tooltip, switch, checkbox, radio, spinner,
  chip/tag, accordion, progress bar, drawer, popover, segmented control, stepper,
  range slider, file dropzone, input-group/addon, combobox/autocomplete, multiselect,
  datepicker (calendar), timeline, list, avatar-group, and card variants
  (`outlined`, `interactive`).
- **Typography utilities**: `.vx-h1`–`.vx-h4`, `.vx-text-muted`, `.vx-text-sm`, `.vx-link`.
- **New JS behaviors** (`vinix-ui.js`): accordion, drawer, popover, generic panel
  toggle (`data-vx-toggle` — used by the mobile nav), segmented control, combobox,
  multiselect, and datepicker. Added `VinixUI.openDrawer()` / `VinixUI.closeDrawer()`.
- **Accessibility**: focus-trap + first-focus in modal & drawer, `aria-expanded`
  on accordion headers, `aria` labels on interactive controls.
- **Responsive app shell**: the right quick panel collapses to an off-canvas drawer
  under 1024px; a `.vx-nav-toggle` hamburger appears on phones; header search hides
  on small screens.
- **Blade parity wrappers** for previously CSS-only pieces: `<x-vx-table>`,
  `<x-vx-pagination>`, `<x-vx-tabs>`, `<x-vx-dropdown>`, `<x-vx-skeleton>`.
- **Tokens**: `--vx-overlay` for modal/drawer backdrops.
- **Tailwind preset**: now exposes the neutral `gray` ramp, `surface`/`bg` colours,
  and the `vx-shimmer` / `vx-toast-in` / `vx-spin` / `vx-progress-slide` animations.
- Gallery (`docs/gallery.html`) showcases every component with a dark-mode toggle.

### Changed
- Component surfaces that were hard-coded `#fff` (stat-card, inputs, dropdown menu,
  modal, toast, pagination, secondary button, quick panel, bottom bar) now read
  `var(--vx-surface)`; backdrops read `var(--vx-overlay)`. Visually identical in
  light mode — this is what lets dark mode work. Fully backward-compatible.

## [1.0.0] — 2026-08-01
### Added
- Initial release of the Vinix UI design system, ported from DealSync360.
- **Design tokens** as CSS variables (`src/css/tokens.css`) + matching Tailwind preset (`tailwind-preset.cjs`).
- **Core CSS components**: button, card, stat-card, badge, table, input, select,
  textarea, label, alert, section-divider, dropdown, modal, avatar, skeleton,
  empty-state, breadcrumb, pagination, tabs.
- **App-shell layout**: header bar, horizontal nav tabs, quick panel, bottom status bar.
- **Vanilla-JS behaviors** (`dist/vinix-ui.js`): dropdown, modal, tabs, toast, mobile-nav — auto-initialised via `data-vx-*` attributes.
- **Laravel package**: `Vinix\Ui\VinixUiServiceProvider` registering `<x-vx-*>` Blade components and publishing assets/preset.
- Component gallery (`docs/gallery.html`).
