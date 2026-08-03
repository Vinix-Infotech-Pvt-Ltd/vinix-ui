@props([
    'title' => null,
    'open' => false,
])
<div class="vx-accordion-item{{ $open ? ' is-open' : '' }}">
    <button type="button" class="vx-accordion-header" data-vx-accordion-toggle>{{ $title }}</button>
    <div class="vx-accordion-body">{{ $slot }}</div>
</div>
