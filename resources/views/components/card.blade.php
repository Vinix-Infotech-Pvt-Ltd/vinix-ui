@props([
    'title' => null,
])
<div {{ $attributes->merge(['class' => 'vx-card']) }}>
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
