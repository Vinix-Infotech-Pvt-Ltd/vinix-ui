@props([
    'align' => 'left',    // left | right
    'label' => 'Menu',    // used only when no `trigger` slot is provided
])
<div {{ $attributes->merge(['class' => 'vx-dropdown']) }}>
    @isset($trigger)
        {{ $trigger }}
    @else
        <button type="button" class="vx-btn vx-btn-secondary" data-vx-dropdown-toggle>{{ $label }}</button>
    @endisset
    <div class="vx-dropdown-menu{{ $align === 'right' ? ' vx-align-right' : '' }}" hidden>{{ $slot }}</div>
</div>
