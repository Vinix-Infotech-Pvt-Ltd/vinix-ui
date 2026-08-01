@props([
    'label' => '',
    'value' => '',
    'trend' => null,          // e.g. "▲ 12%"
    'trendDir' => 'steady',   // up | down | steady
    'cash' => false,
])
<div {{ $attributes->merge(['class' => 'vx-stat-card']) }}>
    <div class="vx-stat-label">{{ $label }}</div>
    <div class="vx-stat-value {{ $cash ? 'cash' : '' }}">{{ $value }}{{ $slot }}</div>
    @if ($trend)
        <div class="vx-stat-trend {{ $trendDir }}">{{ $trend }}</div>
    @endif
</div>
