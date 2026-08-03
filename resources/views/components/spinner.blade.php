@props([
    'size' => 'md',        // sm | md | lg
    'onAccent' => false,   // white spinner for use on coloured backgrounds
])
@php
    $classes = 'vx-spinner'
        . ($size !== 'md' ? ' vx-spinner-' . $size : '')
        . ($onAccent ? ' vx-spinner-on-accent' : '');
@endphp
<span {{ $attributes->merge(['class' => $classes, 'role' => 'status', 'aria-label' => 'Loading']) }}></span>
