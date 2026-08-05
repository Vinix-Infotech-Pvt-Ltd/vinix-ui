@props([
    'href' => '#',
    'active' => false,
])
<a href="{{ $href }}" {{ $attributes->merge(['class' => 'vx-navbar-link' . ($active ? ' is-active' : '')]) }}>{{ $slot }}</a>
