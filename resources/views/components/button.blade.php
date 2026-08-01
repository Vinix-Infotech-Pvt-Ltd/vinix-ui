@props([
    'variant' => 'primary',   // primary | accent | secondary | danger | success | ghost
    'size' => 'md',           // sm | md | lg
    'type' => 'button',
    'href' => null,
])
@php
    $classes = 'vx-btn vx-btn-' . $variant . ($size !== 'md' ? ' vx-btn-' . $size : '');
@endphp
@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $classes]) }}>{{ $slot }}</a>
@else
    <button type="{{ $type }}" {{ $attributes->merge(['class' => $classes]) }}>{{ $slot }}</button>
@endif
