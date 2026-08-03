@props([
    'text' => '',
    'position' => 'top',   // top | bottom
])
<span {{ $attributes->merge(['class' => 'vx-tooltip']) }}>
    {{ $slot }}
    <span class="vx-tooltip-bubble{{ $position === 'bottom' ? ' vx-tooltip-bottom' : '' }}" role="tooltip">{{ $text }}</span>
</span>
