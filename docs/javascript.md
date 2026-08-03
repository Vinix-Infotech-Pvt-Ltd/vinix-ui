# Vinix UI — JavaScript / Behaviors Reference

Vinix UI ships a single, dependency-free JavaScript file that powers all
interactive behaviors (dropdowns, modals, tabs, combobox, datepicker, and more).
It exposes a global `window.VinixUI` and **auto-initializes** on
`DOMContentLoaded` by scanning the document for `data-vx-*` attributes.

This reference documents the file exactly as implemented in
`src/js/vinix-ui.js` (built to `dist/vinix-ui.js`). Nothing here is aspirational —
every method, attribute, and event below is present in the source.

---

## 1. Loading it

### Plain `<script>` (auto-inits)

Drop the built file in with a `<script>` tag. It attaches `VinixUI` to `window`
and wires up every `data-vx-*` behavior automatically once the DOM is ready
(if the document is still `loading` it waits for `DOMContentLoaded`; otherwise it
inits immediately).

```html
<link rel="stylesheet" href="dist/vinix-ui.css">
<script src="dist/vinix-ui.js"></script>

<body class="vx">
  <button class="vx-btn vx-btn-primary" onclick="VinixUI.toast('Saved','success')">
    Save
  </button>
</body>
```

No initialization call is required for markup present at page load.

### Bundler / ES module import

The file also assigns to `module.exports`, so it works through a bundler.

```js
import VinixUI from '@vinixinfotech/ui';

VinixUI.toast('Hello from a bundle', 'info');
```

> The module still attaches to `window.VinixUI` and still runs its auto-init on
> load, so `data-vx-*` markup keeps working whether you import it or drop it in
> via `<script>`. The `import` simply gives you a direct reference to the same
> object.

---

## 2. Public API

Every method on `VinixUI` is listed below with its exact behavior.

### `VinixUI.init(root)`

Scans `root` (or `document` when omitted) and binds all behaviors found under it:
dropdowns, modals, tabs, accordions, drawers, popovers, toggles, segmented
controls, comboboxes, multiselects, datepickers, and file dropzones. Binding is
idempotent — already-bound elements are skipped (see
[Dynamic content](#5-dynamic-content)).

```js
// Re-scan a freshly injected fragment
VinixUI.init(document.getElementById('injected-panel'));

// Re-scan the whole document (safe to call repeatedly)
VinixUI.init();
```

### `VinixUI.toast(message, type, timeout)`

Shows a transient toast. Creates the `.vx-toast-host` container automatically
(appending it to `<body>`) if one doesn't already exist, appends a `.vx-toast`
element, then fades and removes it after the timeout.

- `message` — text content of the toast.
- `type` *(optional)* — added as a CSS class on the toast: `success` | `error` |
  `info` | `warning`. If omitted, no type class is added.
- `timeout` *(optional)* — milliseconds before dismissal. **Defaults to `3000`.**
  (After the timeout the toast fades for ~200ms, then is removed from the DOM.)

Returns the created toast element.

```js
VinixUI.toast('Profile updated', 'success');       // 3000ms default
VinixUI.toast('Could not connect', 'error', 6000); // custom timeout
VinixUI.toast('Heads up');                          // no type class
```

### `VinixUI.openModal(id)` / `VinixUI.closeModal(id)`

Open or close a modal **by element id**.

- `openModal(id)` — looks up the element by `id`, removes its `hidden` attribute,
  sets `document.body.style.overflow = 'hidden'` (locks page scroll), and moves
  focus to the first focusable element inside it.
- `closeModal(id)` — looks up the element by `id`, re-adds `hidden`, and restores
  `document.body.style.overflow`.

```js
VinixUI.openModal('myModal');
VinixUI.closeModal('myModal');
```

### `VinixUI.openDrawer(id)` / `VinixUI.closeDrawer(id)`

Same contract as the modal helpers, for drawers (off-canvas panels).

- `openDrawer(id)` — unhides the element, locks body scroll, focuses the first
  focusable child.
- `closeDrawer(id)` — hides the element, restores body scroll.

```js
VinixUI.openDrawer('filtersDrawer');
VinixUI.closeDrawer('filtersDrawer');
```

### `VinixUI.version`

The library version string.

```js
console.log(VinixUI.version); // "1.1.2"
```

---

## 3. Data-attribute behaviors

Each behavior below auto-initializes from markup during `init()`. A minimal
example is given for each.

### Dropdown

Toggle button carries `data-vx-dropdown-toggle`; the menu is a `.vx-dropdown-menu`
inside the same `.vx-dropdown` wrapper (falls back to the button's parent element
if there's no `.vx-dropdown` ancestor). Clicking the button toggles the menu's
`hidden` attribute; opening one **closes all other open dropdown menus first**.
Menus also close on outside click and on Escape (see
[Global handlers](#6-global-handlers)).

```html
<div class="vx-dropdown">
  <button class="vx-btn" data-vx-dropdown-toggle>Menu ▾</button>
  <div class="vx-dropdown-menu" hidden>
    <a class="vx-dropdown-item" href="#">Edit</a>
    <a class="vx-dropdown-item" href="#">Delete</a>
  </div>
</div>
```

### Modal

A trigger with `data-vx-modal-open="id"` opens the `.vx-modal-backdrop` whose
`id` matches. Any `[data-vx-modal-close]` element inside the backdrop closes it.
The backdrop also closes when you **click the backdrop itself** (clicks that
originate on inner content don't close it), traps `Tab`/`Shift+Tab` focus within
the modal, and closes on **Escape**. Opening locks body scroll and focuses the
first focusable element.

```html
<button class="vx-btn" data-vx-modal-open="myModal">Open modal</button>

<div class="vx-modal-backdrop" id="myModal" hidden>
  <div class="vx-modal">
    <button class="vx-modal-close" data-vx-modal-close aria-label="Close">×</button>
    <h3>Title</h3>
    <p>Body…</p>
  </div>
</div>
```

### Tabs

Wrap the group in `[data-vx-tabs]`. Each tab button carries
`data-vx-tab="key"`; each panel carries `data-vx-tab-panel="key"`. Clicking a tab
toggles `.is-active` on the tabs and shows only the panel whose key matches
(other panels get `hidden = true`).

```html
<div data-vx-tabs>
  <div class="vx-tabs">
    <button class="vx-tab is-active" data-vx-tab="a">First</button>
    <button class="vx-tab" data-vx-tab="b">Second</button>
  </div>
  <div data-vx-tab-panel="a">Panel A</div>
  <div data-vx-tab-panel="b" hidden>Panel B</div>
</div>
```

### Accordion

The group is `[data-vx-accordion]`; add `data-vx-accordion-single` to make opening
one item auto-collapse its siblings. Each item is a `.vx-accordion-item` and its
header button carries `data-vx-accordion-toggle`. Clicking a header toggles
`.is-open` on the item and keeps the header's `aria-expanded` in sync
(initialized from whether the item starts with `.is-open`).

```html
<div class="vx-accordion" data-vx-accordion data-vx-accordion-single>
  <div class="vx-accordion-item is-open">
    <button class="vx-accordion-header" data-vx-accordion-toggle>Section one</button>
    <div class="vx-accordion-body">Content one…</div>
  </div>
  <div class="vx-accordion-item">
    <button class="vx-accordion-header" data-vx-accordion-toggle>Section two</button>
    <div class="vx-accordion-body">Content two…</div>
  </div>
</div>
```

### Drawer

A trigger with `data-vx-drawer-open="id"` opens the `.vx-drawer-backdrop` whose
`id` matches; `[data-vx-drawer-close]` inside it closes it. Like modals, the
drawer closes on backdrop click (target must be the backdrop itself), traps focus,
closes on **Escape**, locks body scroll on open, and focuses the first focusable
child.

```html
<button class="vx-btn" data-vx-drawer-open="filters">Filters</button>

<div class="vx-drawer-backdrop" id="filters" hidden>
  <aside class="vx-drawer">
    <button class="vx-drawer-close" data-vx-drawer-close aria-label="Close">×</button>
    <h3>Filters</h3>
    …
  </aside>
</div>
```

### Popover

Toggle button carries `data-vx-popover-toggle`; the panel is a `.vx-popover-panel`
inside the same `.vx-popover` wrapper (falls back to the button's parent). Clicking
toggles the panel's `hidden`, closing all other open popovers first. Clicks inside
the panel don't propagate (so they won't dismiss it). Popovers close on outside
click and on Escape.

```html
<div class="vx-popover">
  <button class="vx-btn" data-vx-popover-toggle>Info</button>
  <div class="vx-popover-panel" hidden>
    <p>Some helpful details.</p>
  </div>
</div>
```

### Generic toggle

`data-vx-toggle="#target"` flips the `.is-open` class on the element matched by the
selector, and keeps the button's `aria-expanded` in sync. Used by the mobile nav
toggle to reveal the off-canvas quick panel. (Note: the value is a CSS selector,
so include the `#` for an id.)

```html
<button class="vx-nav-toggle" data-vx-toggle="#quickPanel" aria-expanded="false">☰</button>

<aside id="quickPanel" class="vx-quick-panel">…</aside>
```

### Segmented control

Wrap buttons in `[data-vx-segmented]`; each option is a `.vx-segment`. Clicking a
segment toggles `.is-active` onto it (removing it from the others) and dispatches a
[`vx:segment`](#4-events) event carrying the clicked button's `value` attribute.

```html
<div class="vx-segmented" data-vx-segmented>
  <button class="vx-segment is-active" value="day">Day</button>
  <button class="vx-segment" value="week">Week</button>
  <button class="vx-segment" value="month">Month</button>
</div>
```

### Combobox (single-select, filterable)

Wrapper is `[data-vx-combobox]`. Inside it:

- a text input marked `data-vx-combobox-input`,
- an optional hidden input marked `data-vx-combobox-value` (receives the chosen
  `data-value`, or the option text if no `data-value`),
- a `.vx-combobox-menu` containing `.vx-combobox-option[data-value]` items,
- an optional `.vx-combobox-empty` element shown when nothing matches.

Focusing the input opens the menu; typing filters options by text (case
insensitive). Clicking an option — or pressing `Enter` on the active one — sets the
input's visible text and the hidden value, marks the option `.is-selected`, closes
the menu, and dispatches [`vx:select`](#4-events). Keyboard: `ArrowDown` / `ArrowUp`
move the active option, `Enter` selects, `Escape` closes.

```html
<div class="vx-combobox" data-vx-combobox>
  <input class="vx-input" data-vx-combobox-input placeholder="Pick a city…">
  <input type="hidden" name="city" data-vx-combobox-value>
  <div class="vx-combobox-menu" hidden>
    <div class="vx-combobox-option" data-value="mum">Mumbai</div>
    <div class="vx-combobox-option" data-value="del">Delhi</div>
    <div class="vx-combobox-option" data-value="blr">Bengaluru</div>
    <div class="vx-combobox-empty" hidden>No matches</div>
  </div>
</div>
```

### Multiselect (chips)

Wrapper is `[data-vx-multiselect="name[]"]` — the attribute value becomes the
`name` on the hidden inputs generated per selected chip. Inside it:

- a `.vx-multiselect-control` (the chip area / click target),
- a text input marked `data-vx-multiselect-input`,
- a `.vx-combobox-menu` with `.vx-combobox-option[data-value]` items.

Focusing or clicking the control opens the menu; typing filters
(already-selected options are hidden). Selecting an option inserts a `.vx-chip`
(with a `.vx-chip-remove` button and, if a `name` was given, a hidden input of the
option's value) before the input, hides the option, and dispatches
[`vx:add`](#4-events). Removing a chip re-enables its option. `Backspace` on an
empty input removes the last chip; `Escape` closes the menu. Options pre-marked
`.is-selected` in the markup are hydrated into chips on init.

```html
<div class="vx-multiselect" data-vx-multiselect="tags[]">
  <div class="vx-multiselect-control">
    <input class="vx-multiselect-input" data-vx-multiselect-input placeholder="Add tags…">
  </div>
  <div class="vx-combobox-menu" hidden>
    <div class="vx-combobox-option" data-value="urgent">Urgent</div>
    <div class="vx-combobox-option" data-value="review">Review</div>
    <div class="vx-combobox-option is-selected" data-value="new">New</div>
  </div>
</div>
```

### Datepicker

Wrapper is `[data-vx-datepicker]` with an input marked `data-vx-datepicker-input`
(falls back to the first `<input>` in the wrapper). On init the script builds a
`.vx-calendar` element inside the wrapper. Focusing or clicking the input opens the
calendar; `‹` / `›` navigate months. Clicking a day writes the value back to the
input in **`YYYY-MM-DD`** format, closes the calendar, and dispatches
[`vx:date`](#4-events) plus a native `change` event. `Escape` in the input closes
the calendar. Existing `YYYY-MM-DD` input values are parsed to preselect the day
and open on that month. Today's cell gets `.is-today`; the chosen cell gets
`.is-selected`.

```html
<div class="vx-datepicker" data-vx-datepicker>
  <input class="vx-input" data-vx-datepicker-input placeholder="YYYY-MM-DD" value="2026-08-03">
</div>
```

### File dropzone

Wrapper is `.vx-file` containing an `input[type="file"]` and a `.vx-file-drop`
zone. Dragging a file over the wrapper adds `.is-dragover` to the drop zone;
leaving/ending removes it. Dropping assigns the dropped files onto the input and
fires the input's `change` event. On `change`, if a `[data-vx-file-name]` element
exists inside the wrapper, its text is set to the comma-joined list of file names.

```html
<label class="vx-file">
  <input type="file" multiple hidden>
  <div class="vx-file-drop">
    <p>Drag files here or click to browse</p>
    <span data-vx-file-name></span>
  </div>
</label>
```

---

## 4. Events

Several behaviors dispatch `CustomEvent`s (all `bubbles: true`), so you can listen
on the element or on a common ancestor.

| Event | Dispatched by | Target element | `detail` |
|-------|---------------|----------------|----------|
| `vx:select` | Combobox — on selecting an option | the combobox **input** | `{ value, label }` |
| `vx:add` | Multiselect — on adding a chip | the multiselect **wrapper** (`[data-vx-multiselect]`) | `{ value }` |
| `vx:date` | Datepicker — on picking a day | the datepicker **input** | `{ value }` (`YYYY-MM-DD`) |
| `vx:segment` | Segmented — on clicking a segment | the segmented **group** (`[data-vx-segmented]`) | `{ value }` |

For `vx:select`, `value` is the option's `data-value` (or its text when absent) and
`label` is the option's visible text. The datepicker additionally fires a native
`change` event on the input, and the combobox's `value` mirrors what gets written
into the hidden `data-vx-combobox-value` input.

```js
// Combobox selection
document.querySelector('[data-vx-combobox]')
  .addEventListener('vx:select', function (e) {
    console.log('picked', e.detail.value, e.detail.label);
  });

// Multiselect chip added
document.querySelector('[data-vx-multiselect]')
  .addEventListener('vx:add', function (e) {
    console.log('added tag', e.detail.value);
  });

// Datepicker day chosen
document.querySelector('[data-vx-datepicker-input]')
  .addEventListener('vx:date', function (e) {
    console.log('date', e.detail.value); // "2026-08-03"
  });

// Segmented control change
document.querySelector('[data-vx-segmented]')
  .addEventListener('vx:segment', function (e) {
    console.log('segment', e.detail.value);
  });
```

Because these events bubble, you can also delegate from a parent (or `document`).

---

## 5. Dynamic content

Behaviors are wired during `init()`. Markup added to the page **after** the initial
auto-init (AJAX responses, framework renders, template partials, etc.) hasn't been
scanned yet — so call `init` on the container you just injected:

```js
container.innerHTML = serverHtml;   // freshly injected markup
VinixUI.init(container);            // wire up any vx behaviors inside it
```

You can safely call `VinixUI.init()` (with or without a `root`) as often as you
like. Each behavior marks the elements it binds (via an internal `__vxBound` flag),
so **re-initializing never double-binds** an element that was already wired — only
the new, unbound elements get handlers attached.

---

## 6. Global handlers

Two document-level listeners are bound **once** (guarded by a global flag so they
aren't duplicated across multiple loads/inits):

- **Document click (outside-click close):** any click on the document closes the
  "outside-click" set — open **dropdown menus**, **popover panels**, **combobox
  menus**, and **datepicker calendars**. These components stop propagation on their
  own internal clicks, so interacting inside them doesn't dismiss them; clicking
  anywhere else does.

- **Escape key:** pressing `Escape` closes everything dismissible — dropdown menus,
  popover panels, combobox menus, datepicker calendars, **plus** every visible
  `.vx-modal-backdrop` and `.vx-drawer-backdrop`.

Modals and drawers are **not** part of the plain outside-click set — they only
close via their own backdrop click, a `[data-vx-modal-close]` /
`[data-vx-drawer-close]` control, `Escape`, or the programmatic
`closeModal` / `closeDrawer` methods.
