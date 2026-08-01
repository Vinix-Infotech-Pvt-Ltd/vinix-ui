@props([
    'id' => 'vx-modal',
    'title' => null,
])
<div id="{{ $id }}" class="vx-modal-backdrop" hidden>
    <div {{ $attributes->merge(['class' => 'vx-modal']) }} role="dialog" aria-modal="true">
        @if ($title || isset($header))
            <div class="vx-modal-header">
                <span>{{ $header ?? $title }}</span>
                <button type="button" data-vx-modal-close class="vx-btn vx-btn-ghost vx-btn-sm" aria-label="Close">&times;</button>
            </div>
        @endif
        <div class="vx-modal-body">{{ $slot }}</div>
        @isset($footer)
            <div class="vx-modal-footer">{{ $footer }}</div>
        @endisset
    </div>
</div>
