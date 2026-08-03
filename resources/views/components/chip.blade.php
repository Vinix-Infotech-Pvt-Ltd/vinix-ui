@props([
    'variant' => null,     // primary | success | danger | warning
    'removable' => false,
])
@php $classes = 'vx-chip' . ($variant ? ' vx-chip-' . $variant : ''); @endphp
<span {{ $attributes->merge(['class' => $classes]) }}>{{ $slot }}@if($removable)<button type="button" class="vx-chip-remove" aria-label="Remove">&times;</button>@endif</span>
