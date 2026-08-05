@props([
    'brand' => null,        // brand text (or use the `brand` slot for a logo)
    'brandHref' => '#',
    'fixed' => false,       // position:fixed instead of sticky
])
{{--
  Usage:
    <x-vx-navbar brand="Vinix" brand-href="/">
        <x-vx-navbar-link href="/dashboard" active>Dashboard</x-vx-navbar-link>
        <x-vx-navbar-link href="/reports">Reports</x-vx-navbar-link>

        <x-slot:end>
            <input class="vx-input vx-input-sm" placeholder="Search…" style="max-width:200px">
            <x-vx-avatar name="AK" />
        </x-slot:end>
    </x-vx-navbar>
  On screens ≤900px the links collapse into a slide-in drawer opened by the hamburger.
--}}
<nav {{ $attributes->merge(['class' => 'vx-navbar' . ($fixed ? ' vx-navbar-fixed' : '')]) }} data-vx-navbar>
    <button type="button" class="vx-navbar-toggle" data-vx-navbar-toggle aria-label="Toggle menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    </button>

    @if ($brand || isset($brandSlot))
        <a href="{{ $brandHref }}" class="vx-navbar-brand">{{ $brandSlot ?? $brand }}</a>
    @endif

    <div class="vx-navbar-nav">{{ $slot }}</div>

    @isset($end)
        <div class="vx-navbar-end">{{ $end }}</div>
    @endisset
</nav>
