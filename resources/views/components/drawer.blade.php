@props([
    'id' => 'vx-drawer',
    'title' => null,
    'side' => 'right',   // right | left
])
<div id="{{ $id }}" class="vx-drawer-backdrop" hidden>
    <aside {{ $attributes->merge(['class' => 'vx-drawer' . ($side === 'left' ? ' vx-drawer-left' : '')]) }} role="dialog" aria-modal="true">
        @if ($title || isset($header))
            <div class="vx-drawer-header">
                <span>{{ $header ?? $title }}</span>
                <button type="button" data-vx-drawer-close class="vx-btn vx-btn-ghost vx-btn-sm" aria-label="Close">&times;</button>
            </div>
        @endif
        <div class="vx-drawer-body">{{ $slot }}</div>
        @isset($footer)
            <div class="vx-drawer-footer">{{ $footer }}</div>
        @endisset
    </aside>
</div>
