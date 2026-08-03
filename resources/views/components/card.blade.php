@props([
    'title' => null,
    'variant' => null,       // outlined
    'interactive' => false,
])
@php
    $classes = 'vx-card'
        . ($variant === 'outlined' ? ' vx-card-outlined' : '')
        . ($interactive ? ' vx-card-interactive' : '');
@endphp
<div {{ $attributes->merge(['class' => $classes]) }}>
    @isset($header)
        <div class="vx-card-header">{{ $header }}</div>
    @elseif ($title)
        <div class="vx-card-header">{{ $title }}</div>
    @endisset
    <div class="vx-card-body">{{ $slot }}</div>
    @isset($footer)
        <div class="vx-card-footer">{{ $footer }}</div>
    @endisset
</div>
