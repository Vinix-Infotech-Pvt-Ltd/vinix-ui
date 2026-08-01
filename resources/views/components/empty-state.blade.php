@props([
    'title' => 'Nothing here yet',
    'text' => null,
])
<div {{ $attributes->merge(['class' => 'vx-empty']) }}>
    @isset($icon)<div class="vx-empty-icon">{{ $icon }}</div>@endisset
    <div class="vx-empty-title">{{ $title }}</div>
    @if ($text)<div class="vx-empty-text">{{ $text }}</div>@endif
    @isset($action)<div style="margin-top:1rem">{{ $action }}</div>@endisset
</div>
