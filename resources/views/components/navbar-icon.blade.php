@props([
    'href' => null,
    'dot' => false,     // show a red notification dot
])
@php $tag = $href ? 'a' : 'button'; @endphp
<{{ $tag }} @if($href) href="{{ $href }}" @else type="button" @endif {{ $attributes->merge(['class' => 'vx-navbar-icon']) }}>
    {{ $slot }}
    @if($dot)<span class="vx-navbar-icon-dot"></span>@endif
</{{ $tag }}>
