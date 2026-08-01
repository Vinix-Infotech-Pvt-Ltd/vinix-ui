@props([
    'variant' => 'neutral',   // success|live | danger|cancel | info|billed | warning | neutral|pending | outline-success | outline-danger | outline-info
])
<span {{ $attributes->merge(['class' => 'vx-badge vx-badge-' . $variant]) }}>{{ $slot }}</span>
