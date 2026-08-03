@props([
    'title' => null,
    'time' => null,
    'variant' => null,   // success | danger | warning
])
<div class="vx-timeline-item{{ $variant ? ' ' . $variant : '' }}">
    @if($time)<div class="vx-timeline-time">{{ $time }}</div>@endif
    @if($title)<div class="vx-timeline-title">{{ $title }}</div>@endif
    @if($slot->isNotEmpty())<div class="vx-timeline-text">{{ $slot }}</div>@endif
</div>
