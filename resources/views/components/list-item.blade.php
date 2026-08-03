@props([
    'href' => null,
    'title' => null,
    'meta' => null,
])
@php $tag = $href ? 'a' : 'div'; @endphp
<{{ $tag }} @if($href) href="{{ $href }}" @endif {{ $attributes->merge(['class' => 'vx-list-item']) }}>
    @if($title)<span class="vx-list-item-title">{{ $title }}</span>@endif
    {{ $slot }}
    @if($meta)<span class="vx-list-item-meta">{{ $meta }}</span>@endif
</{{ $tag }}>
