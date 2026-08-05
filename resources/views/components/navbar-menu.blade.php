@props([])
{{-- Row-2 menu bar (desktop only; hidden ≤1024px). Fill with <x-vx-navbar-tab>. --}}
<div {{ $attributes->merge(['class' => 'vx-navbar-menu']) }}>
    <div class="vx-navbar-menu-inner">{{ $slot }}</div>
</div>
