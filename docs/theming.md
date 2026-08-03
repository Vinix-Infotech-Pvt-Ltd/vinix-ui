# Theming & Tokens — Vinix UI

Vinix UI is **CSS-variable driven**. Every component — buttons, cards, tables,
modals, the app shell — reads its colors, radii, shadows, fonts and layout
metrics from `--vx-*` variables defined in one place. You never touch component
CSS to re-brand: you just override a handful of variables in your own stylesheet.

---

## 1. How theming works

The tokens live in `:root` (shipped inside `dist/vinix-ui.css`). Because they are
plain CSS custom properties, they **cascade** — any `--vx-*` you redefine
*after* the Vinix stylesheet wins, and every component that references that
variable updates automatically. No build step, no recompile, no markup change.

> **The one rule:** load `vinix-ui.css` first, then your override CSS.

```html
<!-- 1. the design system -->
<link rel="stylesheet" href="node_modules/@vinixinfotech/ui/dist/vinix-ui.css">
<!-- 2. your overrides, loaded AFTER -->
<link rel="stylesheet" href="css/app.css">
```

### Minimal re-brand (make a product purple)

Exactly the pattern from the `tokens.css` header — override the two variables
that drive the whole system (the primary-button / active-tab **accent**, plus
`--vx-primary-600` used for links and highlights):

```css
/* app.css — loaded AFTER vinix-ui.css */
:root{
  --vx-accent:       #6D28D9;
  --vx-accent-hover: #5B21B6;
  --vx-primary-600:  #7C3AED;
}
```

That is the entire re-brand. Everything else — layout, spacing, components —
stays identical.

---

## 2. Full token reference

All defaults below are the shipped **light-theme** values from
`src/css/tokens.css`. (Dark-theme overrides are listed in §3.)

### Brand / primary scale

The blue-by-default brand ramp. `--vx-accent` (navy) is what primary buttons and
active nav tabs use; override `--vx-accent` + `--vx-primary-600` to re-skin the
whole system.

| Token | Default | Controls |
|---|---|---|
| `--vx-primary-50`  | `#EFF6FF` | Lightest brand tint (subtle fills, hover bg) |
| `--vx-primary-100` | `#DBEAFE` | Brand tint |
| `--vx-primary-200` | `#BFDBFE` | Brand tint / borders |
| `--vx-primary-300` | `#93C5FD` | Brand mid-light |
| `--vx-primary-400` | `#60A5FA` | Brand mid |
| `--vx-primary-500` | `#3B82F6` | Brand base |
| `--vx-primary-600` | `#2563EB` | **Links, highlights, primary emphasis** |
| `--vx-primary-700` | `#1D4ED8` | Link hover / pressed |
| `--vx-primary-800` | `#1E3A5F` | Deep brand (matches default accent) |
| `--vx-primary-900` | `#1E2A3A` | Darkest brand |
| `--vx-primary-950` | `#172135` | Extra-dark brand |
| `--vx-accent`       | `#1E3A5F` | **Primary buttons + active nav tabs** |
| `--vx-accent-hover` | `#162D4A` | Accent hover / pressed state |

### Header / chrome

The navy app-shell chrome (top header bar).

| Token | Default | Controls |
|---|---|---|
| `--vx-header`       | `#1E2A3A` | Header bar background |
| `--vx-header-light` | `#2A3A4E` | Header hover / raised chrome |
| `--vx-header-muted` | `#94A3B8` | Muted text/icons inside the header |

### Section

| Token | Default | Controls |
|---|---|---|
| `--vx-section` | `#6366F1` | Section-heading accent (indigo) |

### Semantic

Status colors for success / warning / danger / info (badges, alerts, toasts). The
`50`/`100` steps are the soft fills, `500`/`600`/`700` the solid/emphasis steps.

| Token | Default | | Token | Default |
|---|---|---|---|---|
| `--vx-success-50`  | `#ECFDF5` | | `--vx-warning-50`  | `#FEF3C7` |
| `--vx-success-100` | `#D1FAE5` | | `--vx-warning-100` | `#FDE68A` |
| `--vx-success-500` | `#10B981` | | `--vx-warning-500` | `#F59E0B` |
| `--vx-success-600` | `#059669` | | `--vx-warning-600` | `#D97706` |
| `--vx-success-700` | `#047857` | | `--vx-warning-700` | `#B45309` |
| `--vx-danger-50`   | `#FEF2F2` | | `--vx-info-50`     | `#EFF6FF` |
| `--vx-danger-100`  | `#FEE2E2` | | `--vx-info-100`    | `#DBEAFE` |
| `--vx-danger-500`  | `#EF4444` | | `--vx-info-500`    | `#3B82F6` |
| `--vx-danger-600`  | `#DC2626` | | `--vx-info-600`    | `#2563EB` |
| `--vx-danger-700`  | `#B91C1C` | | `--vx-info-700`    | `#1D4ED8` |

### Domain (accounting)

| Token | Default | Controls |
|---|---|---|
| `--vx-debit`  | `#DC2626` | Debit amounts (red) |
| `--vx-credit` | `#059669` | Credit amounts (green) |

### Neutrals & surfaces

The gray ramp for text, borders and fills, plus the three surface tokens. In
**dark mode** the gray ramp is inverted (see §3) so the same tokens keep working:
`50` stays the "darkest fill" end, `900` the "lightest text" end.

| Token | Default | Controls |
|---|---|---|
| `--vx-gray-50`  | `#F9FAFB` | Faintest fill |
| `--vx-gray-100` | `#F3F4F6` | Subtle fill |
| `--vx-gray-200` | `#E5E7EB` | Borders / dividers |
| `--vx-gray-300` | `#D1D5DB` | Strong borders |
| `--vx-gray-400` | `#9CA3AF` | Disabled / placeholder |
| `--vx-gray-500` | `#6B7280` | Muted text |
| `--vx-gray-600` | `#4B5563` | Secondary text |
| `--vx-gray-700` | `#374151` | Body text (strong) |
| `--vx-gray-800` | `#1F2937` | Default body text |
| `--vx-gray-900` | `#111827` | Headings / darkest text |
| `--vx-surface`  | `#FFFFFF` | Cards, menus, inputs |
| `--vx-bg`       | `#F1F5F9` | App background |
| `--vx-bg-soft`  | `#F8FAFC` | Table head, subtle fills |

### Typography

| Token | Default | Controls |
|---|---|---|
| `--vx-font-sans` | `'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif` | UI font (body, headings) |
| `--vx-font-mono` | `'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace` | Monospace (`.vx-mono`, code, numbers) |

### Radius

| Token | Default | Controls |
|---|---|---|
| `--vx-radius-xs`   | `2px`    | Tiny corners (chips, tags) |
| `--vx-radius-sm`   | `4px`    | Small corners (inputs, small buttons) |
| `--vx-radius`      | `6px`    | Default corner radius |
| `--vx-radius-lg`   | `8px`    | Cards, panels |
| `--vx-radius-xl`   | `12px`   | Modals, large surfaces |
| `--vx-radius-full` | `9999px` | Pills, avatars |

### Shadows

| Token | Default | Controls |
|---|---|---|
| `--vx-shadow-sm`       | `0 1px 2px rgba(0,0,0,.05)` | Faint elevation |
| `--vx-shadow-card`     | `0 1px 3px rgba(0,0,0,.06)` | Cards |
| `--vx-shadow`          | `0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)` | Default elevation |
| `--vx-shadow-dropdown` | `0 4px 12px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.06)` | Dropdowns / menus |
| `--vx-shadow-modal`    | `0 20px 40px rgba(0,0,0,.15)` | Modals |
| `--vx-shadow-header`   | `0 2px 8px rgba(0,0,0,.12)` | Header bar |

### Focus ring, overlay & layout metrics

| Token | Default | Controls |
|---|---|---|
| `--vx-ring`      | `rgba(37, 99, 235, .2)` | Focus-ring color |
| `--vx-overlay`   | `rgba(15, 23, 42, .5)`  | Modal / drawer backdrop |
| `--vx-header-h`  | `3.5rem` (56px)         | App header height |
| `--vx-bottom-h`  | `1.75rem` (28px)        | Bottom bar height |

---

## 3. Dark mode

Dark mode is **opt-in**. Turn it on by setting an attribute or class on any
ancestor — the whole page, or just one wrapper:

```html
<!-- whole app -->
<html data-vx-theme="dark"> … </html>

<!-- or scope to a wrapper -->
<div class="vx-dark"> … </div>
```

### How it works

The dark block (`[data-vx-theme="dark"], .vx-dark`) does not add per-component
rules. Instead it **flips the neutral ramp and surfaces** at the token level, so
every component that already reads `--vx-gray-*` / `--vx-surface` / `--vx-bg`
adapts with **no markup change**:

- Surfaces darken — `--vx-surface: #1B2430`, `--vx-bg: #0F1620`, `--vx-bg-soft: #232E3C`.
- The gray ramp inverts — `--vx-gray-50` becomes the darkest fill (`#1B2430`) and
  `--vx-gray-900` becomes the lightest text (`#F8FAFC`). So `color: var(--vx-gray-800)`
  stays "body text" in both themes; only the resolved value changes.
- Muted semantic tints get darker `50`/`100` fills (e.g. `--vx-success-50: #0E2A22`)
  so light text stays legible.
- Ring, overlay and all shadows are strengthened for the dark surface.
- `color-scheme: dark` is set so native controls / scrollbars match.

**Brand and semantic hues stay the same** — they read well on dark too. And
**re-branding still applies in both themes**: overriding `--vx-accent` /
`--vx-primary-600` (as in §1) cascades over the dark block automatically, so you
theme once and it works light *and* dark.

### JS toggle

Toggle the attribute on `document.documentElement` (`<html>`):

```js
function toggleTheme() {
  const el = document.documentElement;
  const isDark = el.getAttribute('data-vx-theme') === 'dark';
  if (isDark) {
    el.removeAttribute('data-vx-theme');
  } else {
    el.setAttribute('data-vx-theme', 'dark');
  }
  // optional: remember the choice
  localStorage.setItem('vx-theme', isDark ? 'light' : 'dark');
}

// restore on load
if (localStorage.getItem('vx-theme') === 'dark') {
  document.documentElement.setAttribute('data-vx-theme', 'dark');
}
```

See **`docs/gallery.html`** — it has a working light/dark toggle you can copy.

---

## 4. Per-product re-brand recipe

The recommended pattern for any Vinix product:

1. Import `dist/vinix-ui.css` in your layout.
2. Create a small **`app.css`** and load it **after** the Vinix stylesheet.
3. In `app.css`, override just the 2–3 brand variables. Usually that is
   `--vx-accent`, `--vx-accent-hover`, and `--vx-primary-600` — nothing else.

```css
/* app.css — the ONLY brand file a product needs */
:root{
  --vx-accent:       #0F766E;   /* teal product */
  --vx-accent-hover: #0D5F58;
  --vx-primary-600:  #0D9488;
}
```

Keep the override list small — that is the whole point. If you find yourself
redefining many tokens, prefer changing the primary ramp / accent and letting the
components follow.

### Multi-brand (scoped)

To run more than one brand on the same page, scope the overrides under a selector
instead of `:root` and wrap each brand's markup:

```css
.brand-acme{
  --vx-accent:      #6D28D9;
  --vx-accent-hover:#5B21B6;
  --vx-primary-600: #7C3AED;
}
.brand-globex{
  --vx-accent:      #0F766E;
  --vx-accent-hover:#0D5F58;
  --vx-primary-600: #0D9488;
}
```

```html
<div class="brand-acme">   … Acme UI …   </div>
<div class="brand-globex"> … Globex UI … </div>
```

Because custom properties cascade, everything inside each wrapper picks up that
brand. This composes cleanly with dark mode — e.g. `<div class="brand-acme vx-dark">`.

---

## 5. Tailwind preset (optional)

If your product uses Tailwind, you can share the exact Vinix tokens as **utility
classes** by adding the shipped preset:

```js
// tailwind.config.js  (CommonJS)
module.exports = {
  presets: [require('@vinixinfotech/ui/preset')],
  content: [ /* … your template paths … */ ],
};
```

> **The preset is never required.** `dist/vinix-ui.css` is plain, self-contained
> CSS driven by the `--vx-*` variables — a pure-JS / plain-HTML consumer needs no
> Tailwind at all. The preset is purely a convenience so that Tailwind utilities
> line up with the design system.

It **mirrors** `tokens.css` (values are kept in sync) and exposes:

- **Color ramps** — `header` (`DEFAULT`/`light`/`muted`), full `primary` 50–950,
  `section` (`DEFAULT`/`light`/`dark`), `success` / `warning` / `danger` / `info`
  (50/100/500/600/700), `debit`, `credit`, `rupee`, the `gray` 50–900 ramp,
  `surface`, and `bg` (`DEFAULT`/`soft`). → e.g. `bg-primary-600`, `text-danger-500`.
- **Fonts** — `font-sans` (Inter stack) and `font-mono` (JetBrains Mono stack).
- **Radii** — adds `rounded-xs` (`2px`) on top of Tailwind's defaults.
- **Shadows** — `shadow-header`, `shadow-card`, `shadow-dropdown`, `shadow-modal`,
  `shadow-bottom-bar`, `shadow-stat`.
- **Type scale** — a tightened `fontSize` set (`2xs`→`4xl`) with matched line
  heights, plus `tracking-widest-plus` (`0.15em`).
- **Spacing extras** — `4.5`, `13`, `15`, `18`, `72`, `84`, `88`.
- **Animations** — `animate-vx-shimmer`, `animate-vx-toast-in`, `animate-vx-spin`,
  `animate-vx-progress-slide` (with their matching keyframes).

Note the preset ships plain color values, so **runtime re-branding via `--vx-*`
does not retint pre-generated Tailwind utilities** — for brand switching, override
the CSS variables (§1/§4). The preset is for authoring convenience, not theming.
