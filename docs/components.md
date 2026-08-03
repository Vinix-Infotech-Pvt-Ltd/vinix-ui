# Vinix UI — Component Reference

The complete reference for every component in **Vinix UI**, the shared design
system for Vinix Infotech products. Every component ships in two forms:

- **Plain HTML / CSS** — drop `dist/vinix-ui.css` in and use `.vx-*` classes.
  No Tailwind, no build step required.
- **Laravel Blade** — `<x-vx-*>` components (registered by the service provider)
  that render the same `.vx-*` markup.

Some components have interactive behavior. Those are wired with `data-vx-*`
attributes and are **auto-initialized** by `dist/vinix-ui.js` on
`DOMContentLoaded` (and re-initable via `VinixUI.init(root)`). Where JS is
required it is called out per component.

**Conventions used below**

- Everything is prefixed `vx-`.
- Theme via CSS variables (`--vx-*`); never hard-code brand hex.
- Blade prop names below are exactly the `@props([...])` from each
  `resources/views/components/*.blade.php` file. Any extra HTML attributes you
  pass to a Blade component are merged onto the root element (`$attributes->merge`).
- Programmatic JS API: `VinixUI.toast()`, `VinixUI.openModal(id)`,
  `VinixUI.closeModal(id)`, `VinixUI.openDrawer(id)`, `VinixUI.closeDrawer(id)`,
  `VinixUI.init(root)`.

---

## Table of contents

- [Buttons & actions](#buttons--actions) — [button](#button), [chip](#chip), [spinner](#spinner)
- [Forms & inputs](#forms--inputs) — [label / field](#label--field), [input](#input), [textarea](#textarea), [select](#select), [input-group](#input-group), [range](#range), [file (dropzone)](#file-dropzone), [switch](#switch), [checkbox](#checkbox), [radio](#radio), [combobox](#combobox), [multiselect](#multiselect), [datepicker](#datepicker)
- [Data display](#data-display) — [card](#card), [stat-card](#stat-card), [table](#table), [list](#list), [timeline](#timeline), [avatar](#avatar), [avatar-group](#avatar-group), [badge](#badge), [skeleton](#skeleton)
- [Feedback & overlays](#feedback--overlays) — [alert](#alert), [toast](#toast), [tooltip](#tooltip), [modal](#modal), [drawer](#drawer), [popover](#popover), [progress](#progress)
- [Navigation](#navigation) — [tabs](#tabs), [accordion](#accordion), [dropdown](#dropdown), [breadcrumb](#breadcrumb), [pagination](#pagination), [stepper](#stepper), [segmented](#segmented), [section-divider](#section-divider)
- [Layout / app shell](#layout--app-shell) — [header bar](#header-bar), [nav tabs](#nav-tabs), [quick panel](#quick-panel), [bottom bar](#bottom-bar), [container](#container), [mobile nav toggle](#mobile-nav-toggle)
- [Typography utilities](#typography-utilities) — [headings / text / link / mono](#headings--text--link--mono), [empty-state](#empty-state)

---

# Buttons & actions

## button

Inline-flex action button (or link) with color variants and sizes.

**Plain HTML**

```html
<button class="vx-btn vx-btn-primary">Save</button>
<button class="vx-btn vx-btn-secondary vx-btn-sm">Cancel</button>
<a href="/new" class="vx-btn vx-btn-accent vx-btn-lg">New deal</a>
<button class="vx-btn vx-btn-danger vx-btn-block">Delete</button>
<button class="vx-btn vx-btn-primary" disabled>Saving…</button>
```

**Blade**

```blade
<x-vx-button variant="primary">Save</x-vx-button>
<x-vx-button variant="secondary" size="sm">Cancel</x-vx-button>
<x-vx-button variant="accent" size="lg" href="/new">New deal</x-vx-button>
<x-vx-button variant="danger" type="submit" class="vx-btn-block">Delete</x-vx-button>
```

| Kind | Values |
| --- | --- |
| Variants | `vx-btn-primary`, `vx-btn-accent`, `vx-btn-secondary`, `vx-btn-danger`, `vx-btn-success`, `vx-btn-ghost` |
| Sizes | `vx-btn-sm`, (default), `vx-btn-lg` |
| Modifiers | `vx-btn-block` (full width) |
| States | `:disabled` / `[disabled]`, `:hover`, `:focus-visible` |
| Blade props | `variant` (default `primary`), `size` (`sm` \| `md` \| `lg`, default `md`), `type` (default `button`), `href` (renders `<a>` when set) |

## chip

Compact rounded tag/pill, optionally with a remove button.

**Plain HTML**

```html
<span class="vx-chip">Draft</span>
<span class="vx-chip vx-chip-primary">Featured</span>
<span class="vx-chip vx-chip-success">Paid
  <button type="button" class="vx-chip-remove" aria-label="Remove">&times;</button>
</span>
```

**Blade**

```blade
<x-vx-chip>Draft</x-vx-chip>
<x-vx-chip variant="primary">Featured</x-vx-chip>
<x-vx-chip variant="success" :removable="true">Paid</x-vx-chip>
```

| Kind | Values |
| --- | --- |
| Variants | (default neutral), `vx-chip-primary`, `vx-chip-success`, `vx-chip-danger`, `vx-chip-warning` |
| Parts | `.vx-chip-remove` (× button) |
| Blade props | `variant` (default `null`: `primary` \| `success` \| `danger` \| `warning`), `removable` (bool, adds the × button) |

## spinner

Spinning loading indicator; sizes plus an on-accent (white) variant.

**Plain HTML**

```html
<span class="vx-spinner" role="status" aria-label="Loading"></span>
<span class="vx-spinner vx-spinner-sm"></span>
<span class="vx-spinner vx-spinner-lg"></span>
<button class="vx-btn vx-btn-primary">
  <span class="vx-spinner vx-spinner-sm vx-spinner-on-accent"></span> Saving…
</button>
```

**Blade**

```blade
<x-vx-spinner />
<x-vx-spinner size="sm" />
<x-vx-spinner size="lg" />
<x-vx-spinner size="sm" :on-accent="true" />
```

| Kind | Values |
| --- | --- |
| Sizes | `vx-spinner-sm`, (default), `vx-spinner-lg` |
| Modifiers | `vx-spinner-on-accent` (white, for colored backgrounds) |
| Blade props | `size` (`sm` \| `md` \| `lg`, default `md`), `onAccent` (bool → `on-accent` attr). Renders `role="status" aria-label="Loading"`. |

---

# Forms & inputs

The form field components (`input`, `textarea`, `select`, `range`, `combobox`,
`multiselect`, `datepicker`) each wrap their control in a `.vx-field` container,
render an optional `.vx-label` (with a `.vx-required` asterisk), and show a
`.vx-field-error` message when an `error` prop is passed. The `is-error` state
class is added to the control when there's an error.

## label / field

The label + required-marker + error markup used by all field components. Use
directly when hand-rolling a control.

**Plain HTML**

```html
<div class="vx-field">
  <label class="vx-label" for="email">
    Email <span class="vx-required">*</span>
  </label>
  <input id="email" name="email" class="vx-input is-error" />
  <p class="vx-field-error">Email is required.</p>
</div>
```

| Class | Purpose |
| --- | --- |
| `.vx-field` | Field wrapper (grouping) |
| `.vx-label` | Block label above the control |
| `.vx-required` | Red `*` marker inside the label |
| `.vx-field-error` | Error message below the control |
| `.is-error` | Error state on `.vx-input` / `.vx-textarea` / `.vx-select` |

## input

Text input with label, required marker, error state, and a small size.

**Plain HTML**

```html
<div class="vx-field">
  <label class="vx-label" for="name">Name <span class="vx-required">*</span></label>
  <input type="text" id="name" name="name" class="vx-input" required />
</div>

<input class="vx-input vx-input-sm" placeholder="Search…" />
<input class="vx-input is-error" value="bad@" />
```

**Blade**

```blade
<x-vx-input label="Name" name="name" required />
<x-vx-input label="Email" name="email" type="email" value="a@b.com" />
<x-vx-input label="Amount" name="amount" :sm="true" placeholder="0.00" />
<x-vx-input label="Email" name="email" error="Email is required." />
```

| Kind | Values |
| --- | --- |
| Sizes | `vx-input-sm`, (default) |
| States | `:focus`, `:disabled`, `.is-error` |
| Blade props | `label`, `name` (sets `name`+`id`), `type` (default `text`), `value`, `required` (bool), `error` (string → error message + `is-error`), `sm` (bool → `vx-input-sm`) |

## textarea

Multi-line text input (min-height 88px, vertically resizable).

**Plain HTML**

```html
<div class="vx-field">
  <label class="vx-label" for="notes">Notes</label>
  <textarea id="notes" name="notes" rows="4" class="vx-textarea"></textarea>
</div>
```

**Blade**

```blade
<x-vx-textarea label="Notes" name="notes" :rows="4" />
<x-vx-textarea label="Bio" name="bio" required error="Required.">Prefilled text</x-vx-textarea>
```

| Kind | Values |
| --- | --- |
| States | `:focus`, `:disabled`, `.is-error` |
| Blade props | `label`, `name`, `required` (bool), `error` (string), `rows` (default `3`). Slot = initial value. |

## select

Styled native `<select>` with a custom chevron (options go in the slot).

**Plain HTML**

```html
<div class="vx-field">
  <label class="vx-label" for="status">Status</label>
  <select id="status" name="status" class="vx-select">
    <option>Live</option>
    <option>Billed</option>
  </select>
</div>
```

**Blade**

```blade
<x-vx-select label="Status" name="status" required>
  <option value="live">Live</option>
  <option value="billed">Billed</option>
</x-vx-select>
```

| Kind | Values |
| --- | --- |
| States | `:focus`, `:disabled`, `.is-error` |
| Blade props | `label`, `name`, `required` (bool), `error` (string). Slot = `<option>` elements. |

## input-group

Joins an input with leading/trailing addons (`.vx-input-addon`) into a single
seam-less control.

**Plain HTML**

```html
<div class="vx-input-group">
  <span class="vx-input-addon">₹</span>
  <input class="vx-input" placeholder="0.00" />
  <span class="vx-input-addon">.00</span>
</div>

<div class="vx-input-group">
  <input class="vx-input" placeholder="username" />
  <span class="vx-input-addon">@vinix.com</span>
</div>
```

**Blade**

```blade
<x-vx-input-group>
  <span class="vx-input-addon">₹</span>
  <input class="vx-input" placeholder="0.00">
  <span class="vx-input-addon">.00</span>
</x-vx-input-group>
```

| Kind | Values |
| --- | --- |
| Classes | `.vx-input-group` (flex wrapper), `.vx-input-addon` (leading/trailing label). First/last child get rounded outer corners automatically. |
| Blade props | none (compose children in the slot; put raw `.vx-input` / `.vx-select` inside) |

## range

Themed range slider.

**Plain HTML**

```html
<div class="vx-field">
  <label class="vx-label" for="vol">Volume</label>
  <input type="range" id="vol" name="vol" class="vx-range" min="0" max="100" step="1" value="40" />
</div>
```

**Blade**

```blade
<x-vx-range label="Volume" name="vol" :min="0" :max="100" :step="1" :value="40" />
```

| Kind | Values |
| --- | --- |
| States | `:focus-visible`, `:disabled` |
| Blade props | `label`, `name`, `min` (default `0`), `max` (default `100`), `step` (default `1`), `value` |

## file (dropzone)

Click-or-drag file upload with a dashed dropzone; JS shows chosen file names.

**Plain HTML**

```html
<label class="vx-file">
  <input type="file" name="doc" />
  <span class="vx-file-drop">
    <span><strong>Choose a file</strong> or drag it here</span>
    <span class="vx-text-sm vx-text-muted" data-vx-file-name></span>
  </span>
</label>
```

**Blade**

```blade
<x-vx-file name="doc" accept=".pdf,.png" />
<x-vx-file name="docs" :multiple="true" label="PDF or PNG, up to 10 MB" />
```

| Kind | Values |
| --- | --- |
| States | `.vx-file-drop:hover`, `.vx-file-drop.is-dragover` (added by JS while dragging) |
| Parts | `.vx-file-drop` (dashed zone), `[data-vx-file-name]` (filled with selected names) |
| Blade props | `name` (submits `name[]` when multiple), `label` (helper text under prompt), `accept`, `multiple` (bool). Slot overrides the default prompt. |

**JS:** auto-initialized on `.vx-file` — handles drag/drop, `is-dragover`, and writes chosen file names into `[data-vx-file-name]`.

## switch

Toggle switch backed by a hidden checkbox.

**Plain HTML**

```html
<label class="vx-switch">
  <input type="checkbox" name="notify" value="1" checked />
  <span class="vx-switch-track"></span>
  <span>Email notifications</span>
</label>
```

**Blade**

```blade
<x-vx-switch name="notify" label="Email notifications" :checked="true" value="1" />
<x-vx-switch name="dark">Dark mode</x-vx-switch>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-switch-track` (the pill/knob) |
| States | `:checked`, `:focus-visible`, `:disabled` |
| Blade props | `name`, `label` (or use the slot), `checked` (bool), `value` (default `'1'`) |

## checkbox

Custom-styled checkbox (checkmark) driven by a hidden native input.

**Plain HTML**

```html
<label class="vx-check">
  <input type="checkbox" name="agree" value="1" checked />
  <span class="vx-check-box"></span>
  <span>I agree</span>
</label>
```

**Blade**

```blade
<x-vx-checkbox name="agree" label="I agree" :checked="true" value="1" />
<x-vx-checkbox name="terms">Accept terms</x-vx-checkbox>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-check-box` (the box) |
| States | `:checked`, `:focus-visible`, `:disabled` |
| Blade props | `name`, `label` (or slot), `checked` (bool), `value` (default `'1'`) |

## radio

Radio button — same as checkbox but rounded (`.vx-check-radio`).

**Plain HTML**

```html
<label class="vx-check vx-check-radio">
  <input type="radio" name="plan" value="pro" checked />
  <span class="vx-check-box"></span>
  <span>Pro</span>
</label>
```

**Blade**

```blade
<x-vx-radio name="plan" value="pro" label="Pro" :checked="true" />
<x-vx-radio name="plan" value="free">Free</x-vx-radio>
```

| Kind | Values |
| --- | --- |
| Classes | `.vx-check .vx-check-radio` + `.vx-check-box` |
| States | `:checked`, `:focus-visible`, `:disabled` |
| Blade props | `name`, `label` (or slot), `checked` (bool), `value` (default `null`) |

## combobox

Single-select autocomplete: a text input with a filterable dropdown menu; writes
the chosen option's value into a hidden field.

**Plain HTML**

```html
<div class="vx-combobox" data-vx-combobox>
  <input type="text" class="vx-input" placeholder="Search…" data-vx-combobox-input autocomplete="off" />
  <input type="hidden" name="city" value="" data-vx-combobox-value />
  <div class="vx-combobox-menu" hidden>
    <div class="vx-combobox-option" data-value="mumbai">Mumbai</div>
    <div class="vx-combobox-option" data-value="delhi">Delhi</div>
    <div class="vx-combobox-empty" hidden>No matches</div>
  </div>
</div>
```

**Blade**

```blade
<x-vx-combobox
    label="City"
    name="city"
    :options="['mumbai' => 'Mumbai', 'delhi' => 'Delhi']"
    value="mumbai"
    placeholder="Search cities…" />
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-combobox-menu`, `.vx-combobox-option` (`.is-active` keyboard-focused, `.is-selected` chosen), `.vx-combobox-empty` |
| Hooks | `data-vx-combobox`, `data-vx-combobox-input`, `data-vx-combobox-value` |
| Blade props | `label`, `name` (hidden field), `options` (assoc `['value'=>'Label']` or list), `placeholder` (default `Search…`), `value` (pre-selected) |
| Events | fires `vx:select` (`detail: {value, label}`) on the input |

**JS:** auto-initialized on `[data-vx-combobox]`. Filters options as you type, supports ↑/↓/Enter/Esc, closes on outside click.

## multiselect

Multi-value picker: chosen options become removable chips inside the control;
each submits as `name[]`.

**Plain HTML**

```html
<div class="vx-multiselect" data-vx-multiselect="tags[]">
  <div class="vx-multiselect-control">
    <input type="text" class="vx-multiselect-input" placeholder="Add…" data-vx-multiselect-input autocomplete="off" />
  </div>
  <div class="vx-combobox-menu" hidden>
    <div class="vx-combobox-option" data-value="php">PHP</div>
    <div class="vx-combobox-option is-selected" data-value="js">JS</div>
  </div>
</div>
```

**Blade**

```blade
<x-vx-multiselect
    label="Tags"
    name="tags"
    :options="['php' => 'PHP', 'js' => 'JS', 'css' => 'CSS']"
    :selected="['js']"
    placeholder="Add…" />
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-multiselect-control`, `.vx-multiselect-input`; reuses `.vx-combobox-menu` / `.vx-combobox-option`; selected items rendered as `.vx-chip` + `.vx-chip-remove` |
| Hooks | `data-vx-multiselect="name[]"`, `data-vx-multiselect-input` |
| Blade props | `label`, `name` (submits `name[]`), `options` (assoc or list), `selected` (array of pre-selected values), `placeholder` (default `Add…`) |
| Events | fires `vx:add` (`detail: {value}`) on the box |

**JS:** auto-initialized on `[data-vx-multiselect]`. Adds/removes chips, Backspace removes the last chip, hydrates any option pre-marked `.is-selected`.

## datepicker

Text input that opens a calendar popover; the calendar DOM is built by JS.

**Plain HTML**

```html
<div class="vx-datepicker" data-vx-datepicker>
  <input type="text" class="vx-input" name="due" value="2026-08-03"
         placeholder="YYYY-MM-DD" data-vx-datepicker-input autocomplete="off" />
</div>
```

**Blade**

```blade
<x-vx-datepicker label="Due date" name="due" value="2026-08-03" placeholder="YYYY-MM-DD" />
```

| Kind | Values |
| --- | --- |
| Generated parts | `.vx-calendar`, `.vx-calendar-head`, `.vx-calendar-title`, `.vx-calendar-nav`, `.vx-calendar-grid`, `.vx-calendar-dow`, `.vx-calendar-day` (`.is-outside`, `.is-today`, `.is-selected`) |
| Hooks | `data-vx-datepicker`, `data-vx-datepicker-input` |
| Blade props | `label`, `name`, `value` (`YYYY-MM-DD`), `placeholder` (default `YYYY-MM-DD`) |
| Events | fires `vx:date` (`detail: {value}`) and a native `change` on the input |

**JS:** auto-initialized on `[data-vx-datepicker]`. Renders/navigates the month grid; Esc closes; closes on outside click.

---

# Data display

## card

Surface container with optional header/footer and outlined/interactive variants.

**Plain HTML**

```html
<div class="vx-card">
  <div class="vx-card-header">Recent activity</div>
  <div class="vx-card-body">…</div>
  <div class="vx-card-footer">…</div>
</div>

<div class="vx-card vx-card-outlined vx-card-interactive">
  <div class="vx-card-body">Clickable, no shadow.</div>
</div>
```

**Blade**

```blade
<x-vx-card title="Recent activity">
  Body content…
</x-vx-card>

<x-vx-card variant="outlined" :interactive="true">
  <x-slot:header>Custom header markup</x-slot:header>
  Body…
  <x-slot:footer><x-vx-button size="sm">Action</x-vx-button></x-slot:footer>
</x-vx-card>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-card-header`, `.vx-card-body`, `.vx-card-footer` |
| Variants | `vx-card-outlined` (no shadow), `vx-card-interactive` (hover lift, pointer) |
| Blade props | `title` (renders a header when no `header` slot), `variant` (`outlined`), `interactive` (bool); slots: `header`, `footer`, default (body) |

## stat-card

KPI card: label, big value, optional trend indicator.

**Plain HTML**

```html
<div class="vx-stat-card">
  <div class="vx-stat-label">Total Saudas</div>
  <div class="vx-stat-value">426</div>
  <div class="vx-stat-trend up">▲ 12%</div>
</div>

<div class="vx-stat-card">
  <div class="vx-stat-label">Cash</div>
  <div class="vx-stat-value cash">₹4.2L</div>
  <div class="vx-stat-trend down">▼ 3%</div>
</div>
```

**Blade**

```blade
<x-vx-stat-card label="Total Saudas" value="426" trend="▲ 12%" trend-dir="up" />
<x-vx-stat-card label="Cash" value="₹4.2L" :cash="true" trend="▼ 3%" trend-dir="down" />
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-stat-label`, `.vx-stat-value` (`.cash` = accent color), `.vx-stat-trend` |
| Trend dirs | `.vx-stat-trend.up`, `.down`, `.steady` |
| Blade props | `label`, `value`, `trend` (string, e.g. `"▲ 12%"`), `trendDir` (`up` \| `down` \| `steady`, default `steady`), `cash` (bool). Slot appends after the value. |

## table

Thin styled `<table>` wrapper; you provide `<thead>`/`<tbody>`.

**Plain HTML**

```html
<table class="vx-table">
  <thead>
    <tr><th>Party</th><th>Status</th><th class="vx-col-amount">Amount</th></tr>
  </thead>
  <tbody>
    <tr>
      <td class="vx-col-link">Acme Corp</td>
      <td><span class="vx-badge vx-badge-live">LIVE</span></td>
      <td class="vx-col-amount">₹1,20,000</td>
    </tr>
  </tbody>
</table>
```

**Blade**

```blade
<x-vx-table>
  <thead><tr><th>Party</th><th class="vx-col-amount">Amount</th></tr></thead>
  <tbody><tr><td class="vx-col-link">Acme</td><td class="vx-col-amount">₹1,20,000</td></tr></tbody>
</x-vx-table>
```

| Kind | Values |
| --- | --- |
| Cell modifiers | `.vx-col-amount` (right-aligned, mono, tabular nums), `.vx-col-link` (clickable link styling) |
| Behavior | row `:hover` highlight (neutral in dark mode) |
| Blade props | none — put `<thead>`/`<tbody>` in the slot |

## list

Vertical list surface of rows/links with title + right-aligned meta.

**Plain HTML**

```html
<div class="vx-list">
  <a href="/1" class="vx-list-item">
    <span class="vx-list-item-title">Invoice #1201</span>
    <span class="vx-list-item-meta">2 days ago</span>
  </a>
  <div class="vx-list-item is-clickable">
    <span class="vx-list-item-title">Invoice #1202</span>
    <span class="vx-list-item-meta">today</span>
  </div>
</div>
```

**Blade**

```blade
<x-vx-list>
  <x-vx-list-item href="/1" title="Invoice #1201" meta="2 days ago" />
  <x-vx-list-item title="Invoice #1202" meta="today">Extra body content</x-vx-list-item>
</x-vx-list>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-list-item`, `.vx-list-item-title`, `.vx-list-item-meta` |
| Modifiers | `a.vx-list-item` or `.vx-list-item.is-clickable` → hover/pointer |
| Blade props (`list`) | none |
| Blade props (`list-item`) | `href` (renders `<a>`), `title`, `meta`; slot = extra body |

## timeline

Vertical event timeline with dots + connecting line.

**Plain HTML**

```html
<div class="vx-timeline">
  <div class="vx-timeline-item success">
    <div class="vx-timeline-time">09:12</div>
    <div class="vx-timeline-title">Payment received</div>
    <div class="vx-timeline-text">₹1,20,000 from Acme.</div>
  </div>
  <div class="vx-timeline-item">
    <div class="vx-timeline-time">08:40</div>
    <div class="vx-timeline-title">Order placed</div>
  </div>
</div>
```

**Blade**

```blade
<x-vx-timeline>
  <x-vx-timeline-item title="Payment received" time="09:12" variant="success">
    ₹1,20,000 from Acme.
  </x-vx-timeline-item>
  <x-vx-timeline-item title="Order placed" time="08:40" />
</x-vx-timeline>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-timeline-time`, `.vx-timeline-title`, `.vx-timeline-text` |
| Dot variants | `.vx-timeline-item.success`, `.danger`, `.warning` (default = accent) |
| Blade props (`timeline`) | none |
| Blade props (`timeline-item`) | `title`, `time`, `variant` (`success` \| `danger` \| `warning`); slot = body text |

## avatar

Circular avatar showing an image or initials.

**Plain HTML**

```html
<span class="vx-avatar">MK</span>
<span class="vx-avatar vx-avatar-sm">AB</span>
<span class="vx-avatar vx-avatar-lg"><img src="/u.jpg" alt="User"></span>
```

**Blade**

```blade
<x-vx-avatar name="Mayank Kumar" />              {{-- shows "MK" --}}
<x-vx-avatar name="Ana Bose" size="sm" />
<x-vx-avatar name="User" src="/u.jpg" size="lg" />
```

| Kind | Values |
| --- | --- |
| Sizes | `vx-avatar-sm`, (default), `vx-avatar-lg` |
| Blade props | `name` (initials auto-derived, max 2), `src` (image URL), `size` (`sm` \| `md` \| `lg`, default `md`) |

## avatar-group

Overlapping stack of avatars.

**Plain HTML**

```html
<div class="vx-avatar-group">
  <span class="vx-avatar">MK</span>
  <span class="vx-avatar">AB</span>
  <span class="vx-avatar">+3</span>
</div>
```

**Blade**

```blade
<x-vx-avatar-group>
  <x-vx-avatar name="Mayank Kumar" />
  <x-vx-avatar name="Ana Bose" />
  <x-vx-avatar name="+3" />
</x-vx-avatar-group>
```

| Kind | Values |
| --- | --- |
| Behavior | children `.vx-avatar` overlap with a white ring |
| Blade props | none — nest `<x-vx-avatar>` in the slot |

## badge

Small uppercase status pill; solid and outline variants (with status aliases).

**Plain HTML**

```html
<span class="vx-badge vx-badge-live">LIVE</span>
<span class="vx-badge vx-badge-billed">BILLED</span>
<span class="vx-badge vx-badge-warning">HOLD</span>
<span class="vx-badge vx-badge-outline-success">PAID</span>
```

**Blade**

```blade
<x-vx-badge variant="live">LIVE</x-vx-badge>
<x-vx-badge variant="billed">BILLED</x-vx-badge>
<x-vx-badge variant="outline-success">PAID</x-vx-badge>
```

| Kind | Values |
| --- | --- |
| Solid variants | `vx-badge-success` / `vx-badge-live`, `vx-badge-danger` / `vx-badge-cancel`, `vx-badge-info` / `vx-badge-billed` |
| Soft variants | `vx-badge-warning`, `vx-badge-neutral` / `vx-badge-pending` |
| Outline variants | `vx-badge-outline-success`, `vx-badge-outline-danger`, `vx-badge-outline-info` |
| Blade props | `variant` (default `neutral`; any of the suffixes above) |

## skeleton

Shimmering placeholder block for loading states.

**Plain HTML**

```html
<div class="vx-skeleton" style="width:60%"></div>
<div class="vx-skeleton" style="height:3rem;width:3rem;border-radius:9999px"></div>
```

**Blade**

```blade
<x-vx-skeleton width="60%" />
<x-vx-skeleton width="3rem" height="3rem" />
```

| Kind | Values |
| --- | --- |
| Behavior | animated shimmer; default height `1rem` |
| Blade props | `width`, `height` (any CSS length → inline style) |

---

# Feedback & overlays

## alert

Left-bordered informational banner in four intents.

**Plain HTML**

```html
<div class="vx-alert vx-alert-info">Heads up — read this.</div>
<div class="vx-alert vx-alert-success">Saved successfully.</div>
<div class="vx-alert vx-alert-warning">Check your input.</div>
<div class="vx-alert vx-alert-danger">Something went wrong.</div>
```

**Blade**

```blade
<x-vx-alert variant="info">Heads up — read this.</x-vx-alert>
<x-vx-alert variant="danger">Something went wrong.</x-vx-alert>
```

| Kind | Values |
| --- | --- |
| Variants | `vx-alert-info`, `vx-alert-success`, `vx-alert-warning`, `vx-alert-danger` |
| Blade props | `variant` (default `info`: `info` \| `success` \| `warning` \| `danger`) |

## toast

Transient notification. There is **no Blade component** — created purely via JS.

**Plain HTML / JS**

```html
<!-- Optional: place your own host; otherwise one is auto-created top-right -->
<div class="vx-toast-host"></div>
<script>
  VinixUI.toast('Saved', 'success');       // types: success | error | info | warning
  VinixUI.toast('Heads up', 'info', 5000);  // custom timeout (ms), default 3000
</script>
```

| Kind | Values |
| --- | --- |
| Host | `.vx-toast-host` (auto-created if absent) |
| Type classes | `.vx-toast.success`, `.error`, `.info`, `.warning` |
| JS API | `VinixUI.toast(message, type?, timeout?)` — returns the toast element |

**JS:** required. Auto-dismisses after `timeout` (default 3000ms) with a fade.

## tooltip

Pure-CSS tooltip that appears on hover / keyboard focus. No JS.

**Plain HTML**

```html
<span class="vx-tooltip">
  <button class="vx-btn vx-btn-secondary">Info</button>
  <span class="vx-tooltip-bubble" role="tooltip">Helpful hint</span>
</span>

<span class="vx-tooltip">
  <span>?</span>
  <span class="vx-tooltip-bubble vx-tooltip-bottom" role="tooltip">Below</span>
</span>
```

**Blade**

```blade
<x-vx-tooltip text="Helpful hint">
  <button class="vx-btn vx-btn-secondary">Info</button>
</x-vx-tooltip>

<x-vx-tooltip text="Below" position="bottom">?</x-vx-tooltip>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-tooltip` (wrapper), `.vx-tooltip-bubble` |
| Position | default top; `.vx-tooltip-bottom` |
| Blade props | `text` (bubble contents), `position` (`top` \| `bottom`, default `top`); slot = the trigger |

## modal

Centered dialog over a backdrop. Opened/closed via JS.

**Plain HTML**

```html
<button class="vx-btn vx-btn-primary" data-vx-modal-open="myModal">Open</button>

<div id="myModal" class="vx-modal-backdrop" hidden>
  <div class="vx-modal" role="dialog" aria-modal="true">
    <div class="vx-modal-header">
      <span>Confirm</span>
      <button type="button" data-vx-modal-close class="vx-btn vx-btn-ghost vx-btn-sm" aria-label="Close">&times;</button>
    </div>
    <div class="vx-modal-body">Are you sure?</div>
    <div class="vx-modal-footer">
      <button class="vx-btn vx-btn-secondary" data-vx-modal-close>Cancel</button>
      <button class="vx-btn vx-btn-danger">Delete</button>
    </div>
  </div>
</div>
```

**Blade**

```blade
<x-vx-button variant="primary" data-vx-modal-open="myModal">Open</x-vx-button>

<x-vx-modal id="myModal" title="Confirm">
  Are you sure?
  <x-slot:footer>
    <x-vx-button variant="secondary" data-vx-modal-close>Cancel</x-vx-button>
    <x-vx-button variant="danger">Delete</x-vx-button>
  </x-slot:footer>
</x-vx-modal>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-modal-backdrop`, `.vx-modal`, `.vx-modal-header`, `.vx-modal-body`, `.vx-modal-footer` |
| Hooks | `data-vx-modal-open="id"` (trigger), `data-vx-modal-close` (any close button) |
| Blade props | `id` (default `vx-modal`), `title`; slots: `header` (overrides title), `footer`, default (body) |
| JS API | `VinixUI.openModal(id)`, `VinixUI.closeModal(id)` |

**JS:** auto-initialized. Closes on backdrop click, `data-vx-modal-close`, and Esc; traps Tab focus while open.

## drawer

Off-canvas side panel (right or left). Same open/close model as modal.

**Plain HTML**

```html
<button class="vx-btn vx-btn-primary" data-vx-drawer-open="myDrawer">Open</button>

<div id="myDrawer" class="vx-drawer-backdrop" hidden>
  <aside class="vx-drawer" role="dialog" aria-modal="true">
    <div class="vx-drawer-header">
      <span>Filters</span>
      <button type="button" data-vx-drawer-close class="vx-btn vx-btn-ghost vx-btn-sm" aria-label="Close">&times;</button>
    </div>
    <div class="vx-drawer-body">…</div>
    <div class="vx-drawer-footer">…</div>
  </aside>
</div>
```

**Blade**

```blade
<x-vx-button data-vx-drawer-open="myDrawer">Open</x-vx-button>

<x-vx-drawer id="myDrawer" title="Filters" side="right">
  Filter form…
  <x-slot:footer><x-vx-button variant="primary">Apply</x-vx-button></x-slot:footer>
</x-vx-drawer>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-drawer-backdrop`, `.vx-drawer` (`.vx-drawer-left` for left side), `.vx-drawer-header/-body/-footer` |
| Hooks | `data-vx-drawer-open="id"`, `data-vx-drawer-close` |
| Blade props | `id` (default `vx-drawer`), `title`, `side` (`right` \| `left`, default `right`); slots: `header`, `footer`, default (body) |
| JS API | `VinixUI.openDrawer(id)`, `VinixUI.closeDrawer(id)` |

**JS:** auto-initialized. Closes on backdrop click, `data-vx-drawer-close`, and Esc; traps Tab focus.

## popover

Anchored floating panel toggled by a trigger. Richer than a dropdown menu.

**Plain HTML**

```html
<div class="vx-popover">
  <button class="vx-btn vx-btn-secondary" data-vx-popover-toggle>Details</button>
  <div class="vx-popover-panel" hidden>
    <strong>Order #1201</strong><br>Some richer content here.
  </div>
</div>
```

**Blade**

```blade
<x-vx-popover align="left">
  <x-slot:trigger>
    <button class="vx-btn vx-btn-secondary" data-vx-popover-toggle>Details</button>
  </x-slot:trigger>
  Some richer content here.
</x-vx-popover>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-popover` (wrapper), `.vx-popover-panel` (`.vx-align-right` to right-align) |
| Hooks | `data-vx-popover-toggle` on the trigger |
| Blade props | `align` (`left` \| `right`, default `left`); slots: `trigger`, default (panel content) |

**JS:** auto-initialized on `[data-vx-popover-toggle]`. Toggles the panel; closes on outside click and Esc; only one popover open at a time.

## progress

Determinate or indeterminate progress bar with intent colors.

**Plain HTML**

```html
<div class="vx-progress"><div class="vx-progress-bar" style="width:60%"></div></div>
<div class="vx-progress"><div class="vx-progress-bar success" style="width:100%"></div></div>
<div class="vx-progress vx-progress-indeterminate"><div class="vx-progress-bar"></div></div>
```

**Blade**

```blade
<x-vx-progress :value="60" />
<x-vx-progress :value="100" variant="success" />
<x-vx-progress :indeterminate="true" />
```

| Kind | Values |
| --- | --- |
| Bar variants | `.vx-progress-bar.success`, `.warning`, `.danger` (default = accent) |
| Modifier | `.vx-progress-indeterminate` (animated sliding bar) |
| Blade props | `value` (default `0`), `max` (default `100`), `variant` (`success` \| `warning` \| `danger`), `indeterminate` (bool). Renders `role="progressbar"` + aria values. |

---

# Navigation

## tabs

Underlined tab strip that shows/hides matching panels.

**Plain HTML**

```html
<div data-vx-tabs>
  <div class="vx-tabs">
    <button type="button" class="vx-tab is-active" data-vx-tab="overview">Overview</button>
    <button type="button" class="vx-tab" data-vx-tab="activity">Activity</button>
  </div>
  <div data-vx-tab-panel="overview">Overview panel</div>
  <div data-vx-tab-panel="activity" hidden>Activity panel</div>
</div>
```

**Blade**

```blade
<x-vx-tabs :tabs="['overview' => 'Overview', 'activity' => 'Activity']" active="overview">
  <div data-vx-tab-panel="overview">Overview panel</div>
  <div data-vx-tab-panel="activity" hidden>Activity panel</div>
</x-vx-tabs>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-tabs`, `.vx-tab` (`.is-active`) |
| Hooks | `data-vx-tabs` (group), `data-vx-tab="key"` (button), `data-vx-tab-panel="key"` (panel) |
| Blade props | `tabs` (assoc `['key'=>'Label']`), `active` (key of initial tab; defaults to first). Panels go in the slot. |

**JS:** auto-initialized on `[data-vx-tabs]`. Clicking a tab activates it and toggles the matching panel via `hidden`.

## accordion

Stacked collapsible sections; optionally single-open.

**Plain HTML**

```html
<div class="vx-accordion" data-vx-accordion data-vx-accordion-single>
  <div class="vx-accordion-item is-open">
    <button type="button" class="vx-accordion-header" data-vx-accordion-toggle>Section one</button>
    <div class="vx-accordion-body">Body one.</div>
  </div>
  <div class="vx-accordion-item">
    <button type="button" class="vx-accordion-header" data-vx-accordion-toggle>Section two</button>
    <div class="vx-accordion-body">Body two.</div>
  </div>
</div>
```

**Blade**

```blade
<x-vx-accordion :single="true">
  <x-vx-accordion-item title="Section one" :open="true">Body one.</x-vx-accordion-item>
  <x-vx-accordion-item title="Section two">Body two.</x-vx-accordion-item>
</x-vx-accordion>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-accordion`, `.vx-accordion-item` (`.is-open`), `.vx-accordion-header`, `.vx-accordion-body` |
| Hooks | `data-vx-accordion` (group), `data-vx-accordion-single` (auto-collapse siblings), `data-vx-accordion-toggle` (header) |
| Blade props (`accordion`) | `single` (bool) |
| Blade props (`accordion-item`) | `title`, `open` (bool); slot = body |

**JS:** auto-initialized. Toggles `.is-open`, manages `aria-expanded`; with `data-vx-accordion-single` opening one closes the rest.

## dropdown

Menu of actions/links anchored under a trigger button.

**Plain HTML**

```html
<div class="vx-dropdown">
  <button type="button" class="vx-btn vx-btn-secondary" data-vx-dropdown-toggle>Menu</button>
  <div class="vx-dropdown-menu vx-align-right" hidden>
    <div class="vx-dropdown-heading">Actions</div>
    <a href="#" class="vx-dropdown-item">Edit</a>
    <a href="#" class="vx-dropdown-item">Duplicate</a>
    <div class="vx-dropdown-divider"></div>
    <a href="#" class="vx-dropdown-item">Delete</a>
  </div>
</div>
```

**Blade**

```blade
<x-vx-dropdown align="right" label="Menu">
  <div class="vx-dropdown-heading">Actions</div>
  <a href="#" class="vx-dropdown-item">Edit</a>
  <div class="vx-dropdown-divider"></div>
  <a href="#" class="vx-dropdown-item">Delete</a>
</x-vx-dropdown>

{{-- custom trigger --}}
<x-vx-dropdown>
  <x-slot:trigger><button class="vx-btn vx-btn-ghost" data-vx-dropdown-toggle>⋯</button></x-slot:trigger>
  <a href="#" class="vx-dropdown-item">Item</a>
</x-vx-dropdown>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-dropdown-menu` (`.vx-align-right`), `.vx-dropdown-item`, `.vx-dropdown-heading`, `.vx-dropdown-divider` |
| Hooks | `data-vx-dropdown-toggle` on the trigger |
| Blade props | `align` (`left` \| `right`, default `left`), `label` (default `Menu`, used when no `trigger` slot); slots: `trigger`, default (menu items) |

**JS:** auto-initialized on `[data-vx-dropdown-toggle]`. Toggles the menu; closes on outside click and Esc; only one dropdown open at a time.

## breadcrumb

Path trail of links ending in the current page.

**Plain HTML**

```html
<nav class="vx-breadcrumb" aria-label="Breadcrumb">
  <a href="/">Home</a>
  <span class="vx-sep">/</span>
  <a href="/deals">Deals</a>
  <span class="vx-sep">/</span>
  <span class="vx-current">#1201</span>
</nav>
```

**Blade**

```blade
<x-vx-breadcrumb :items="[
  ['label' => 'Home', 'url' => '/'],
  ['label' => 'Deals', 'url' => '/deals'],
  ['label' => '#1201'],
]" />
```

| Kind | Values |
| --- | --- |
| Parts | `a` (links), `.vx-sep` (separator), `.vx-current` (last item) |
| Blade props | `items` (array of `['label' => ..., 'url' => ...]`; the last item, or any without `url`, renders as `.vx-current`) |

## pagination

Numbered page controls with active/disabled states.

**Plain HTML**

```html
<nav class="vx-pagination" aria-label="Pagination">
  <span class="vx-page is-disabled">‹</span>
  <a href="?page=1" class="vx-page is-active">1</a>
  <a href="?page=2" class="vx-page">2</a>
  <a href="?page=3" class="vx-page">3</a>
  <a href="?page=2" class="vx-page">›</a>
</nav>
```

**Blade**

```blade
<x-vx-pagination :links="[
  ['label' => '‹', 'disabled' => true],
  ['label' => '1', 'url' => '?page=1', 'active' => true],
  ['label' => '2', 'url' => '?page=2'],
  ['label' => '›', 'url' => '?page=2'],
]" />
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-page` (`.is-active`, `.is-disabled`) |
| Blade props | `links` (array of `['label', 'url', 'active', 'disabled']`; `label` is rendered as raw HTML). Items without `url` or with `disabled` render as `<span>`. |

## stepper

Horizontal progress steps: complete / active / upcoming.

**Plain HTML**

```html
<div class="vx-stepper">
  <div class="vx-step is-complete">
    <span class="vx-step-marker">&#10003;</span>
    <span class="vx-step-label">Details</span>
  </div>
  <div class="vx-step is-active">
    <span class="vx-step-marker">2</span>
    <span class="vx-step-label">Payment</span>
  </div>
  <div class="vx-step">
    <span class="vx-step-marker">3</span>
    <span class="vx-step-label">Review</span>
  </div>
</div>
```

**Blade**

```blade
<x-vx-stepper :steps="['Details', 'Payment', 'Review']" :current="2" />
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-step` (`.is-complete`, `.is-active`), `.vx-step-marker`, `.vx-step-label` |
| Blade props | `steps` (array of labels), `current` (1-based index of the active step). Steps before `current` render as complete (with a ✓). |

## segmented

Segmented button control (single-select), like a compact tab pill.

**Plain HTML**

```html
<div class="vx-segmented" role="tablist" data-vx-segmented data-vx-segment-name="view">
  <button type="button" class="vx-segment is-active" value="grid">Grid</button>
  <button type="button" class="vx-segment" value="list">List</button>
</div>
```

**Blade**

```blade
<x-vx-segmented
    :options="['grid' => 'Grid', 'list' => 'List']"
    active="grid"
    name="view" />
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-segment` (`.is-active`) |
| Hooks | `data-vx-segmented` (group), optional `data-vx-segment-name` |
| Blade props | `options` (assoc `['key'=>'Label']` or list), `active` (key of active segment), `name` (optional group name) |
| Events | fires `vx:segment` (`detail: {value}`) on the group |

**JS:** auto-initialized on `[data-vx-segmented]`. Clicking a segment activates it and dispatches `vx:segment` with the button's `value`.

## section-divider

Labeled horizontal rule to break up long forms/pages.

**Plain HTML**

```html
<div class="vx-section-divider">
  <span class="vx-section-divider-text">Billing</span>
  <span class="vx-section-divider-line"></span>
</div>
```

**Blade**

```blade
<x-vx-section-divider>Billing</x-vx-section-divider>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-section-divider-text`, `.vx-section-divider-line` |
| Blade props | none — slot = the label text |

---

# Layout / app shell

These give every product the same DealSync360-style chrome. Wrap the page in
`.vx-app` / `.vx-app-content` (which pad for the fixed header + bottom bar).
There are no Blade wrappers for the app-shell pieces — use the classes directly.
Header/bottom heights come from the `--vx-header-h` / `--vx-bottom-h` tokens.

**Page scaffold**

```html
<body class="vx">
  <div class="vx-app">
    <header class="vx-header-bar"> … </header>
    <nav class="vx-nav"> … </nav>
    <div class="vx-app-content">
      <div class="vx-container"> … page … </div>
    </div>
    <footer class="vx-bottom-bar"> … </footer>
  </div>
</body>
```

## header bar

Fixed navy top bar with a search box and slots for logo/actions.

**Plain HTML**

```html
<header class="vx-header-bar">
  <button class="vx-nav-toggle" data-vx-toggle="#quickPanel" aria-label="Menu">☰</button>
  <a href="/" class="vx-h4" style="color:#fff">Vinix</a>
  <div class="vx-header-search">
    <input placeholder="Search…" />
  </div>
  <!-- right-side actions -->
</header>
```

| Class | Purpose |
| --- | --- |
| `.vx-header-bar` | Fixed navy header (height `--vx-header-h`) |
| `.vx-header-search` | Translucent search pill; `.vx-header-search input` for the field |

## nav tabs

Horizontal navigation tab strip that sits under the header.

**Plain HTML**

```html
<nav class="vx-nav">
  <div class="vx-nav-inner">
    <a href="/dashboard" class="vx-nav-tab is-active">Dashboard</a>
    <a href="/deals" class="vx-nav-tab">Deals</a>
    <a href="/reports" class="vx-nav-tab">Reports</a>
  </div>
</nav>
```

| Class | Purpose |
| --- | --- |
| `.vx-nav` / `.vx-nav-inner` | Strip wrapper (scrolls horizontally) |
| `.vx-nav-tab` | Individual tab (`.is-active` = accent background) |

Related: **quick action** shortcuts — `.vx-quick-action` (icon + `.vx-quick-action-label` stacked) for icon shortcut bars.

## quick panel

Right-hand utility panel that collapses to an off-canvas drawer under 1024px.

**Plain HTML**

```html
<aside id="quickPanel" class="vx-quick-panel">
  <div class="vx-quick-panel-title">Quick actions</div>
  <div class="vx-quick-panel-section">Recent</div>
  <!-- content -->
</aside>
<!-- backdrop used when it slides in on small screens -->
<div class="vx-shell-backdrop" hidden></div>
```

| Class | Purpose |
| --- | --- |
| `.vx-quick-panel` | The panel; `.is-open` slides it in on ≤1024px |
| `.vx-quick-panel-title` / `.vx-quick-panel-section` | Panel heading / section label |
| `.vx-shell-backdrop` | Shared off-canvas backdrop |

Toggle it with the mobile nav toggle (see below): `data-vx-toggle="#quickPanel"` flips `.is-open`.

## bottom bar

Fixed bottom status strip.

**Plain HTML**

```html
<footer class="vx-bottom-bar">
  <span>v1.0.0</span>
  <span class="vx-mono">Connected</span>
</footer>
```

| Class | Purpose |
| --- | --- |
| `.vx-bottom-bar` | Fixed bottom bar (height `--vx-bottom-h`) |

## container

Centered max-width page container.

**Plain HTML**

```html
<div class="vx-container">
  <!-- page content, capped at 88rem, auto side padding -->
</div>
```

| Class | Purpose |
| --- | --- |
| `.vx-container` | `max-width:88rem`, centered, responsive padding |

## mobile nav toggle

Hamburger button (shown ≤640px) that flips `.is-open` on any target — typically
the quick panel.

**Plain HTML**

```html
<button class="vx-nav-toggle" data-vx-toggle="#quickPanel" aria-label="Toggle panel">
  <span class="vx-nav-toggle-bar">☰</span>
</button>
```

| Kind | Values |
| --- | --- |
| Class | `.vx-nav-toggle` (hidden by default; shown on phones) |
| Hook | `data-vx-toggle="#selector"` — flips `.is-open` on the matched element |

**JS:** auto-initialized on `[data-vx-toggle]`. Toggles `.is-open` on the target and manages `aria-expanded`.

---

# Typography utilities

## headings / text / link / mono

Opt-in type + link utilities. Add `class="vx"` to `<body>` (or wrap in
`.vx-root`) to apply the Vinix font/background globally.

**Plain HTML**

```html
<h1 class="vx-h1">Page title</h1>
<h2 class="vx-h2">Section</h2>
<h3 class="vx-h3">Subsection</h3>
<h4 class="vx-h4">Minor heading</h4>

<p class="vx-text-sm vx-text-muted">Muted small print.</p>
<a href="#" class="vx-link">A themed link</a>
<code class="vx-mono">INV-1201</code>
```

| Class | Purpose |
| --- | --- |
| `.vx-h1` / `.vx-h2` / `.vx-h3` / `.vx-h4` | Heading scale (700/700/600/600 weight) |
| `.vx-text-muted` | Muted gray text color |
| `.vx-text-sm` | 13px small text |
| `.vx-link` | Themed link (primary color, underline on hover) |
| `.vx-mono` | Monospace font family |
| `body.vx` / `.vx-root` | Apply Vinix font + background to a scope |

These are CSS utilities only — no Blade wrappers.

## empty-state

Centered "nothing here" placeholder with optional icon, text, and an action.

**Plain HTML**

```html
<div class="vx-empty">
  <div class="vx-empty-icon"><!-- svg icon --></div>
  <div class="vx-empty-title">No deals yet</div>
  <div class="vx-empty-text">Create your first deal to get started.</div>
  <div style="margin-top:1rem">
    <button class="vx-btn vx-btn-primary">New deal</button>
  </div>
</div>
```

**Blade**

```blade
<x-vx-empty-state title="No deals yet" text="Create your first deal to get started.">
  <x-slot:icon><!-- svg --></x-slot:icon>
  <x-slot:action><x-vx-button variant="primary">New deal</x-vx-button></x-slot:action>
</x-vx-empty-state>
```

| Kind | Values |
| --- | --- |
| Parts | `.vx-empty-icon`, `.vx-empty-title`, `.vx-empty-text` |
| Blade props | `title` (default `Nothing here yet`), `text`; slots: `icon`, `action` |

---

*Reference generated from `src/css/*.css`, `src/js/vinix-ui.js`, and
`resources/views/components/*.blade.php`. Rebuild `dist/` after any source
change (`node scripts/build.mjs`) and keep this doc in sync when adding
components.*
