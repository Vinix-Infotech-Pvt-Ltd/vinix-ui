/*!
 * Vinix UI — vanilla JS behaviors (no dependencies).
 * Works in pure-JS/HTML projects (via <script>) and Laravel/Blade alike.
 *
 * Auto-inits on DOMContentLoaded. Wire behaviors with data attributes:
 *   Dropdown:  <div class="vx-dropdown"><button data-vx-dropdown-toggle>…</button>
 *                <div class="vx-dropdown-menu" hidden>…</div></div>
 *   Modal:     <button data-vx-modal-open="myModal">Open</button>
 *              <div class="vx-modal-backdrop" id="myModal" hidden>… <button data-vx-modal-close>×</button> …</div>
 *   Tabs:      <div data-vx-tabs>
 *                <button class="vx-tab" data-vx-tab="one">One</button> …
 *                <div data-vx-tab-panel="one">…</div> …</div>
 *   Accordion: <div class="vx-accordion" data-vx-accordion>  (add data-vx-accordion-single to auto-collapse siblings)
 *                <div class="vx-accordion-item"><button class="vx-accordion-header" data-vx-accordion-toggle>…</button>
 *                  <div class="vx-accordion-body">…</div></div></div>
 *   Drawer:    <button data-vx-drawer-open="myDrawer">Open</button>
 *              <div class="vx-drawer-backdrop" id="myDrawer" hidden><aside class="vx-drawer">…
 *                <button data-vx-drawer-close>×</button> …</aside></div>
 *   Popover:   <div class="vx-popover"><button data-vx-popover-toggle>…</button>
 *                <div class="vx-popover-panel" hidden>…</div></div>
 *   Toggle:    <button data-vx-toggle="#quickPanel">☰</button>   (flips .is-open on the target)
 *   Segmented: <div class="vx-segmented" data-vx-segmented><button class="vx-segment">…</button>…</div>
 *   Combobox:  <div class="vx-combobox" data-vx-combobox><input class="vx-input" data-vx-combobox-input>
 *                <input type="hidden" data-vx-combobox-value>
 *                <div class="vx-combobox-menu" hidden><div class="vx-combobox-option" data-value="1">One</div>…</div></div>
 *   Multiselect: <div class="vx-multiselect" data-vx-multiselect="tags[]">…</div>  (see docs/gallery.html)
 *   Datepicker: <div class="vx-datepicker" data-vx-datepicker><input class="vx-input" data-vx-datepicker-input></div>
 *   Toast:     VinixUI.toast('Saved', 'success')
 */
(function (global) {
    'use strict';

    function on(el, evt, cb) { el.addEventListener(evt, cb); }
    function closest(el, sel) { return el && el.closest ? el.closest(sel) : null; }
    function make(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
    function focusables(c) {
        return Array.prototype.slice.call(c.querySelectorAll(
            'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )).filter(function (el) { return el.offsetParent !== null; });
    }
    function firstFocus(c) { var f = focusables(c); if (f.length) f[0].focus(); }
    function trapTab(e, c) {
        if (e.key !== 'Tab') return;
        var f = focusables(c); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    /* ---------------------------------------------------------------- Dropdowns */
    function initDropdowns(root) {
        (root || document).querySelectorAll('[data-vx-dropdown-toggle]').forEach(function (btn) {
            if (btn.__vxBound) return; btn.__vxBound = true;
            var wrap = closest(btn, '.vx-dropdown') || btn.parentElement;
            var menu = wrap.querySelector('.vx-dropdown-menu');
            if (!menu) return;
            on(btn, 'click', function (e) {
                e.stopPropagation();
                var open = !menu.hasAttribute('hidden');
                closeAllDropdowns();
                if (!open) menu.removeAttribute('hidden');
            });
        });
    }
    function closeAllDropdowns() {
        document.querySelectorAll('.vx-dropdown-menu:not([hidden])').forEach(function (m) { m.setAttribute('hidden', ''); });
    }

    /* ------------------------------------------------------------------- Modals */
    function openModal(id) { var m = document.getElementById(id); if (m) { m.removeAttribute('hidden'); document.body.style.overflow = 'hidden'; firstFocus(m); } }
    function closeModal(m) { if (m) { m.setAttribute('hidden', ''); document.body.style.overflow = ''; } }
    function initModals(root) {
        (root || document).querySelectorAll('[data-vx-modal-open]').forEach(function (btn) {
            if (btn.__vxBound) return; btn.__vxBound = true;
            on(btn, 'click', function () { openModal(btn.getAttribute('data-vx-modal-open')); });
        });
        (root || document).querySelectorAll('.vx-modal-backdrop').forEach(function (bd) {
            if (bd.__vxBound) return; bd.__vxBound = true;
            on(bd, 'click', function (e) { if (e.target === bd) closeModal(bd); });
            on(bd, 'keydown', function (e) { trapTab(e, bd); });
            bd.querySelectorAll('[data-vx-modal-close]').forEach(function (c) {
                on(c, 'click', function () { closeModal(bd); });
            });
        });
    }

    /* -------------------------------------------------------------------- Tabs */
    function initTabs(root) {
        (root || document).querySelectorAll('[data-vx-tabs]').forEach(function (group) {
            if (group.__vxBound) return; group.__vxBound = true;
            var tabs = group.querySelectorAll('[data-vx-tab]');
            tabs.forEach(function (tab) {
                on(tab, 'click', function () {
                    var key = tab.getAttribute('data-vx-tab');
                    tabs.forEach(function (t) { t.classList.toggle('is-active', t === tab); });
                    group.querySelectorAll('[data-vx-tab-panel]').forEach(function (p) {
                        p.hidden = p.getAttribute('data-vx-tab-panel') !== key;
                    });
                });
            });
        });
    }

    /* --------------------------------------------------------------- Accordion */
    function initAccordions(root) {
        (root || document).querySelectorAll('[data-vx-accordion-toggle]').forEach(function (btn) {
            if (btn.__vxBound) return; btn.__vxBound = true;
            var item0 = closest(btn, '.vx-accordion-item');
            btn.setAttribute('aria-expanded', item0 && item0.classList.contains('is-open') ? 'true' : 'false');
            on(btn, 'click', function () {
                var item = closest(btn, '.vx-accordion-item'); if (!item) return;
                var group = closest(item, '[data-vx-accordion]');
                var willOpen = !item.classList.contains('is-open');
                if (group && group.hasAttribute('data-vx-accordion-single')) {
                    group.querySelectorAll('.vx-accordion-item.is-open').forEach(function (i) {
                        i.classList.remove('is-open');
                        var h = i.querySelector('[data-vx-accordion-toggle]'); if (h) h.setAttribute('aria-expanded', 'false');
                    });
                }
                item.classList.toggle('is-open', willOpen);
                btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            });
        });
    }

    /* ---------------------------------------------------------------- Drawers */
    function openDrawer(id) { var d = document.getElementById(id); if (d) { d.removeAttribute('hidden'); document.body.style.overflow = 'hidden'; firstFocus(d); } }
    function closeDrawer(d) { if (d) { d.setAttribute('hidden', ''); document.body.style.overflow = ''; } }
    function initDrawers(root) {
        (root || document).querySelectorAll('[data-vx-drawer-open]').forEach(function (btn) {
            if (btn.__vxBound) return; btn.__vxBound = true;
            on(btn, 'click', function () { openDrawer(btn.getAttribute('data-vx-drawer-open')); });
        });
        (root || document).querySelectorAll('.vx-drawer-backdrop').forEach(function (bd) {
            if (bd.__vxBound) return; bd.__vxBound = true;
            on(bd, 'click', function (e) { if (e.target === bd) closeDrawer(bd); });
            on(bd, 'keydown', function (e) { trapTab(e, bd); });
            bd.querySelectorAll('[data-vx-drawer-close]').forEach(function (c) {
                on(c, 'click', function () { closeDrawer(bd); });
            });
        });
    }

    /* --------------------------------------------------------------- Popovers */
    function initPopovers(root) {
        (root || document).querySelectorAll('[data-vx-popover-toggle]').forEach(function (btn) {
            if (btn.__vxBound) return; btn.__vxBound = true;
            var wrap = closest(btn, '.vx-popover') || btn.parentElement;
            var panel = wrap.querySelector('.vx-popover-panel');
            if (!panel) return;
            on(btn, 'click', function (e) {
                e.stopPropagation();
                var open = !panel.hasAttribute('hidden');
                closeAllPopovers();
                if (!open) panel.removeAttribute('hidden');
            });
            on(panel, 'click', function (e) { e.stopPropagation(); });
        });
    }
    function closeAllPopovers() {
        document.querySelectorAll('.vx-popover-panel:not([hidden])').forEach(function (p) { p.setAttribute('hidden', ''); });
    }

    /* ----------------------------------------------------------------- Toggles */
    /* Generic show/hide: <button data-vx-toggle="#target"> flips .is-open on it.
       Used by the mobile nav toggle to reveal the off-canvas quick panel. */
    function initToggles(root) {
        (root || document).querySelectorAll('[data-vx-toggle]').forEach(function (btn) {
            if (btn.__vxBound) return; btn.__vxBound = true;
            on(btn, 'click', function (e) {
                e.stopPropagation();
                var target = document.querySelector(btn.getAttribute('data-vx-toggle'));
                if (!target) return;
                var open = target.classList.toggle('is-open');
                btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        });
    }

    /* --------------------------------------------------------------- Segmented */
    function initSegmented(root) {
        (root || document).querySelectorAll('[data-vx-segmented]').forEach(function (group) {
            if (group.__vxBound) return; group.__vxBound = true;
            group.querySelectorAll('.vx-segment').forEach(function (btn) {
                on(btn, 'click', function () {
                    group.querySelectorAll('.vx-segment').forEach(function (s) { s.classList.toggle('is-active', s === btn); });
                    group.dispatchEvent(new CustomEvent('vx:segment', { detail: { value: btn.getAttribute('value') }, bubbles: true }));
                });
            });
        });
    }

    /* --------------------------------------------------------------- Combobox */
    function closeAllComboMenus() { document.querySelectorAll('.vx-combobox-menu:not([hidden])').forEach(function (m) { m.setAttribute('hidden', ''); }); }
    function closeAllCalendars() { document.querySelectorAll('.vx-calendar:not([hidden])').forEach(function (c) { c.setAttribute('hidden', ''); }); }

    function initCombobox(root) {
        (root || document).querySelectorAll('[data-vx-combobox]').forEach(function (box) {
            if (box.__vxBound) return; box.__vxBound = true;
            var input = box.querySelector('[data-vx-combobox-input]');
            var hidden = box.querySelector('[data-vx-combobox-value]');
            var menu = box.querySelector('.vx-combobox-menu');
            if (!input || !menu) return;
            var options = Array.prototype.slice.call(menu.querySelectorAll('.vx-combobox-option'));
            var emptyEl = menu.querySelector('.vx-combobox-empty');
            function clearActive() { options.forEach(function (o) { o.classList.remove('is-active'); }); }
            function visible() { return options.filter(function (o) { return !o.hasAttribute('hidden'); }); }
            function open() { closeAllComboMenus(); menu.removeAttribute('hidden'); filter(); }
            function close() { menu.setAttribute('hidden', ''); clearActive(); }
            function filter() {
                var q = input.value.trim().toLowerCase(), any = false;
                options.forEach(function (o) {
                    var match = o.textContent.toLowerCase().indexOf(q) > -1;
                    if (match) { o.removeAttribute('hidden'); any = true; } else { o.setAttribute('hidden', ''); }
                });
                if (emptyEl) emptyEl.hidden = any;
                clearActive();
            }
            function setActive(vis, idx) { clearActive(); if (vis[idx]) { vis[idx].classList.add('is-active'); vis[idx].scrollIntoView({ block: 'nearest' }); } }
            function select(o) {
                input.value = o.textContent.trim();
                if (hidden) hidden.value = o.getAttribute('data-value') != null ? o.getAttribute('data-value') : o.textContent.trim();
                options.forEach(function (x) { x.classList.toggle('is-selected', x === o); });
                close();
                input.dispatchEvent(new CustomEvent('vx:select', { detail: { value: hidden ? hidden.value : o.textContent.trim(), label: o.textContent.trim() }, bubbles: true }));
            }
            on(box, 'click', function (e) { e.stopPropagation(); });
            on(input, 'focus', open);
            on(input, 'input', function () { menu.removeAttribute('hidden'); filter(); });
            options.forEach(function (o) { on(o, 'click', function () { select(o); }); });
            on(input, 'keydown', function (e) {
                var vis = visible();
                var cur = vis.filter(function (o) { return o.classList.contains('is-active'); })[0];
                var idx = cur ? vis.indexOf(cur) : -1;
                if (e.key === 'ArrowDown') { e.preventDefault(); if (menu.hasAttribute('hidden')) open(); setActive(vis, Math.min(idx + 1, vis.length - 1) < 0 ? 0 : Math.min(idx + 1, vis.length - 1)); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(vis, Math.max(idx - 1, 0)); }
                else if (e.key === 'Enter') { if (vis[idx]) { e.preventDefault(); select(vis[idx]); } }
                else if (e.key === 'Escape') { close(); }
            });
        });
    }

    /* ------------------------------------------------------------ Multiselect */
    function initMultiselect(root) {
        (root || document).querySelectorAll('[data-vx-multiselect]').forEach(function (box) {
            if (box.__vxBound) return; box.__vxBound = true;
            var control = box.querySelector('.vx-multiselect-control');
            var input = box.querySelector('[data-vx-multiselect-input]');
            var menu = box.querySelector('.vx-combobox-menu');
            var name = box.getAttribute('data-vx-multiselect') || '';
            if (!control || !input || !menu) return;
            var options = Array.prototype.slice.call(menu.querySelectorAll('.vx-combobox-option'));
            function open() { closeAllComboMenus(); menu.removeAttribute('hidden'); }
            function close() { menu.setAttribute('hidden', ''); }
            function filter() {
                var q = input.value.trim().toLowerCase();
                options.forEach(function (o) { o.hidden = o.classList.contains('is-selected') || o.textContent.toLowerCase().indexOf(q) === -1; });
            }
            function add(o) {
                if (o.classList.contains('is-selected')) return;
                o.classList.add('is-selected'); o.hidden = true;
                var val = o.getAttribute('data-value') != null ? o.getAttribute('data-value') : o.textContent.trim();
                var chip = make('span', 'vx-chip'); chip.textContent = o.textContent.trim();
                var rm = make('button', 'vx-chip-remove'); rm.type = 'button'; rm.innerHTML = '&times;'; rm.setAttribute('aria-label', 'Remove'); chip.appendChild(rm);
                if (name) { var h = make('input'); h.type = 'hidden'; h.name = name; h.value = val; chip.appendChild(h); }
                control.insertBefore(chip, input);
                on(rm, 'click', function (e) { e.stopPropagation(); chip.remove(); o.classList.remove('is-selected'); o.hidden = false; });
                input.value = ''; filter();
                box.dispatchEvent(new CustomEvent('vx:add', { detail: { value: val }, bubbles: true }));
            }
            on(box, 'click', function (e) { e.stopPropagation(); });
            on(control, 'click', function () { input.focus(); open(); });
            on(input, 'focus', open);
            on(input, 'input', function () { open(); filter(); });
            options.forEach(function (o) { on(o, 'click', function () { add(o); input.focus(); }); });
            on(input, 'keydown', function (e) {
                if (e.key === 'Backspace' && input.value === '') {
                    var chips = control.querySelectorAll('.vx-chip'); var last = chips[chips.length - 1];
                    if (last) { var b = last.querySelector('.vx-chip-remove'); if (b) b.click(); }
                } else if (e.key === 'Escape') { close(); }
            });
            // hydrate any options pre-marked selected in the markup
            options.slice().forEach(function (o) { if (o.classList.contains('is-selected')) { o.classList.remove('is-selected'); add(o); } });
        });
    }

    /* ------------------------------------------------------------- File drop */
    function initFileDrop(root) {
        (root || document).querySelectorAll('.vx-file').forEach(function (wrap) {
            if (wrap.__vxBound) return; wrap.__vxBound = true;
            var input = wrap.querySelector('input[type="file"]');
            var drop = wrap.querySelector('.vx-file-drop');
            if (!input || !drop) return;
            ['dragenter', 'dragover'].forEach(function (ev) { on(wrap, ev, function (e) { e.preventDefault(); drop.classList.add('is-dragover'); }); });
            ['dragleave', 'dragend'].forEach(function (ev) { on(wrap, ev, function () { drop.classList.remove('is-dragover'); }); });
            on(wrap, 'drop', function (e) {
                e.preventDefault(); drop.classList.remove('is-dragover');
                if (e.dataTransfer && e.dataTransfer.files.length) { input.files = e.dataTransfer.files; input.dispatchEvent(new Event('change', { bubbles: true })); }
            });
            on(input, 'change', function () {
                if (!input.files || !input.files.length) return;
                var names = Array.prototype.map.call(input.files, function (f) { return f.name; }).join(', ');
                var nameEl = wrap.querySelector('[data-vx-file-name]');
                if (nameEl) nameEl.textContent = names;
            });
        });
    }

    /* -------------------------------------------------------------- Datepicker */
    function pad2(n) { return (n < 10 ? '0' : '') + n; }
    function fmtDate(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
    function parseDate(s) {
        if (!s) return null;
        var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s).trim()); if (!m) return null;
        var d = new Date(+m[1], +m[2] - 1, +m[3]); return isNaN(d.getTime()) ? null : d;
    }
    function initDatepicker(root) {
        (root || document).querySelectorAll('[data-vx-datepicker]').forEach(function (box) {
            if (box.__vxBound) return; box.__vxBound = true;
            var input = box.querySelector('[data-vx-datepicker-input]') || box.querySelector('input');
            if (!input) return;
            var cal = make('div', 'vx-calendar'); cal.hidden = true; box.appendChild(cal);
            var view = parseDate(input.value) || new Date(); view.setDate(1);
            var selected = parseDate(input.value);
            function midnight(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); }
            function render() {
                cal.innerHTML = '';
                var head = make('div', 'vx-calendar-head');
                var prev = make('button', 'vx-calendar-nav', '‹'); prev.type = 'button';
                var title = make('div', 'vx-calendar-title', view.toLocaleString('default', { month: 'long' }) + ' ' + view.getFullYear());
                var next = make('button', 'vx-calendar-nav', '›'); next.type = 'button';
                on(prev, 'click', function (e) { e.stopPropagation(); view.setMonth(view.getMonth() - 1); render(); });
                on(next, 'click', function (e) { e.stopPropagation(); view.setMonth(view.getMonth() + 1); render(); });
                head.appendChild(prev); head.appendChild(title); head.appendChild(next); cal.appendChild(head);
                var grid = make('div', 'vx-calendar-grid');
                ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(function (d) { grid.appendChild(make('div', 'vx-calendar-dow', d)); });
                var start = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
                var today = midnight(new Date());
                for (var i = 0; i < start; i++) { grid.appendChild(make('span', 'vx-calendar-day is-outside', '')); }
                var dim = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
                for (var day = 1; day <= dim; day++) {
                    (function (day) {
                        var cell = make('button', 'vx-calendar-day', String(day)); cell.type = 'button';
                        var cd = new Date(view.getFullYear(), view.getMonth(), day);
                        if (midnight(cd) === today) cell.classList.add('is-today');
                        if (selected && midnight(cd) === midnight(selected)) cell.classList.add('is-selected');
                        on(cell, 'click', function (e) {
                            e.stopPropagation(); selected = cd; input.value = fmtDate(cd); cal.hidden = true;
                            input.dispatchEvent(new CustomEvent('vx:date', { detail: { value: fmtDate(cd) }, bubbles: true }));
                            input.dispatchEvent(new Event('change', { bubbles: true }));
                        });
                        grid.appendChild(cell);
                    })(day);
                }
                cal.appendChild(grid);
            }
            function open() { closeAllCalendars(); var p = parseDate(input.value); if (p) { view = new Date(p.getFullYear(), p.getMonth(), 1); selected = p; } render(); cal.hidden = false; }
            on(box, 'click', function (e) { e.stopPropagation(); });
            on(input, 'focus', open);
            on(input, 'click', open);
            on(input, 'keydown', function (e) { if (e.key === 'Escape') cal.hidden = true; });
        });
    }

    /* ------------------------------------------------------------------- Toast */
    function toast(message, type, timeout) {
        var host = document.querySelector('.vx-toast-host');
        if (!host) { host = document.createElement('div'); host.className = 'vx-toast-host'; document.body.appendChild(host); }
        var el = document.createElement('div');
        el.className = 'vx-toast' + (type ? ' ' + type : '');
        el.textContent = message;
        host.appendChild(el);
        setTimeout(function () { el.style.opacity = '0'; setTimeout(function () { el.remove(); }, 200); }, timeout || 3000);
        return el;
    }

    /* --------------------------------------------------------------- Bootstrap */
    function init(root) {
        initDropdowns(root);
        initModals(root);
        initTabs(root);
        initAccordions(root);
        initDrawers(root);
        initPopovers(root);
        initToggles(root);
        initSegmented(root);
        initCombobox(root);
        initMultiselect(root);
        initDatepicker(root);
        initFileDrop(root);
    }

    // Global "click outside" + Esc handlers (bound once)
    if (!global.__vxGlobalBound) {
        global.__vxGlobalBound = true;
        on(document, 'click', function () { closeAllDropdowns(); closeAllPopovers(); closeAllComboMenus(); closeAllCalendars(); });
        on(document, 'keydown', function (e) {
            if (e.key === 'Escape') {
                closeAllDropdowns();
                closeAllPopovers();
                closeAllComboMenus();
                closeAllCalendars();
                document.querySelectorAll('.vx-modal-backdrop:not([hidden])').forEach(closeModal);
                document.querySelectorAll('.vx-drawer-backdrop:not([hidden])').forEach(closeDrawer);
            }
        });
    }

    var VinixUI = {
        init: init, toast: toast,
        openModal: openModal, closeModal: function (id) { closeModal(document.getElementById(id)); },
        openDrawer: openDrawer, closeDrawer: function (id) { closeDrawer(document.getElementById(id)); },
        version: '1.1.2'
    };
    global.VinixUI = VinixUI;
    if (typeof module !== 'undefined' && module.exports) module.exports = VinixUI;

    if (document.readyState === 'loading') {
        on(document, 'DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})(typeof window !== 'undefined' ? window : this);
