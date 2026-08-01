@props([
    'name' => '',
    'src' => null,
    'size' => 'md',   // sm | md | lg
])
@php
    $initials = collect(explode(' ', trim($name)))->filter()->map(fn ($w) => mb_substr($w, 0, 1))->take(2)->implode('');
    $cls = 'vx-avatar' . ($size !== 'md' ? ' vx-avatar-' . $size : '');
@endphp
<span {{ $attributes->merge(['class' => $cls]) }}>
    @if ($src)
        <img src="{{ $src }}" alt="{{ $name }}">
    @else
        {{ strtoupper($initials) }}
    @endif
</span>
