@props([
    'variant' => 'info',   // info | success | warning | danger
])
<div {{ $attributes->merge(['class' => 'vx-alert vx-alert-' . $variant]) }}>{{ $slot }}</div>
