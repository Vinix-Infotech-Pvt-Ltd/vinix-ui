@props([
    'brand' => null,
    'brandHref' => '#',
    'fixed' => false,
    'drawer' => false,
])
{{--
  DealSync-style header bar. Pair with the vx-navbar-menu component for the
  row-2 tab bar. The `search` slot is the centre search box; the default slot
  holds the mobile drawer links; the `end` slot holds the right-side actions.
--}}
<nav {{ $attributes->merge(['class' => 'vx-navbar' . ($fixed ? ' vx-navbar-fixed' : '')]) }} data-vx-navbar>
    <button type="button" class="vx-navbar-toggle" data-vx-navbar-toggle aria-label="Toggle menu" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
    </button>

    @if ($brand || isset($brandSlot))
        <a href="{{ $brandHref }}" class="vx-navbar-brand">{{ $brandSlot ?? $brand }}</a>
    @endif

    @isset($search)
        <div class="vx-navbar-search">{{ $search }}</div>
    @endisset

    <div class="vx-navbar-nav{{ $drawer ? ' vx-navbar-nav-mobile' : '' }}">{{ $slot }}</div>

    @isset($end)
        <div class="vx-navbar-end">{{ $end }}</div>
    @endisset
</nav>
