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
 *   Toast:     VinixUI.toast('Saved', 'success')
 */
(function (global) {
    'use strict';

    function on(el, evt, cb) { el.addEventListener(evt, cb); }
    function closest(el, sel) { return el && el.closest ? el.closest(sel) : null; }

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
    function openModal(id) { var m = document.getElementById(id); if (m) { m.removeAttribute('hidden'); document.body.style.overflow = 'hidden'; } }
    function closeModal(m) { if (m) { m.setAttribute('hidden', ''); document.body.style.overflow = ''; } }
    function initModals(root) {
        (root || document).querySelectorAll('[data-vx-modal-open]').forEach(function (btn) {
            if (btn.__vxBound) return; btn.__vxBound = true;
            on(btn, 'click', function () { openModal(btn.getAttribute('data-vx-modal-open')); });
        });
        (root || document).querySelectorAll('.vx-modal-backdrop').forEach(function (bd) {
            if (bd.__vxBound) return; bd.__vxBound = true;
            on(bd, 'click', function (e) { if (e.target === bd) closeModal(bd); });
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
    }

    // Global "click outside" + Esc handlers (bound once)
    if (!global.__vxGlobalBound) {
        global.__vxGlobalBound = true;
        on(document, 'click', function () { closeAllDropdowns(); });
        on(document, 'keydown', function (e) {
            if (e.key === 'Escape') {
                closeAllDropdowns();
                document.querySelectorAll('.vx-modal-backdrop:not([hidden])').forEach(closeModal);
            }
        });
    }

    var VinixUI = { init: init, toast: toast, openModal: openModal, closeModal: function (id) { closeModal(document.getElementById(id)); }, version: '1.0.0' };
    global.VinixUI = VinixUI;
    if (typeof module !== 'undefined' && module.exports) module.exports = VinixUI;

    if (document.readyState === 'loading') {
        on(document, 'DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})(typeof window !== 'undefined' ? window : this);
