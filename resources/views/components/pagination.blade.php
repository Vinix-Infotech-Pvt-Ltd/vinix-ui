@props([
    'links' => [],   // [['label' => '1', 'url' => '?page=1', 'active' => true, 'disabled' => false], …]
])
<nav {{ $attributes->merge(['class' => 'vx-pagination']) }} aria-label="Pagination">
    @foreach ($links as $l)
        @php
            $classes = 'vx-page' . (!empty($l['active']) ? ' is-active' : '') . (!empty($l['disabled']) ? ' is-disabled' : '');
            $url = $l['url'] ?? null;
        @endphp
        @if ($url && empty($l['disabled']))
            <a href="{{ $url }}" class="{{ $classes }}">{!! $l['label'] !!}</a>
        @else
            <span class="{{ $classes }}">{!! $l['label'] !!}</span>
        @endif
    @endforeach
</nav>
