@props([
    'items' => [],   // [['label' => 'Home', 'url' => '/'], ['label' => 'Current']]
])
<nav {{ $attributes->merge(['class' => 'vx-breadcrumb']) }} aria-label="Breadcrumb">
    @foreach ($items as $i => $item)
        @if (!$loop->last && !empty($item['url']))
            <a href="{{ $item['url'] }}">{{ $item['label'] }}</a>
            <span class="vx-sep">/</span>
        @else
            <span class="vx-current">{{ $item['label'] }}</span>
        @endif
    @endforeach
</nav>
