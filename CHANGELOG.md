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
