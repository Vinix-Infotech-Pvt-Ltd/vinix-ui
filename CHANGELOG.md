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

## [1.1.1] — 2026-08-03
### Changed
- **Relicensed under the MIT License** (was proprietary) — Vinix UI is now a public,
  open-source package installable by anyone via npm (`@vinix/ui`) and Composer
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
