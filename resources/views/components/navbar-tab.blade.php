@props([
    'href' => null,
    'active' => false,
])
@php $cls = 'vx-navbar-tab' . ($active ? ' is-active' : ''); @endphp
@isset($menu)
    {{-- Tab with a dropdown submenu (put <a class="vx-dropdown-item"> items in the `menu` slot). --}}
    <div class="vx-dropdown">
        <button type="button" class="{{ $cls }}" data-vx-dropdown-toggle>
            {{ $slot }}
            <svg class="vx-navbar-caret" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="vx-dropdown-menu" hidden>{{ $menu }}</div>
    </div>
@elseif ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $cls]) }}>{{ $slot }}</a>
@else
    <button type="button" {{ $attributes->merge(['class' => $cls]) }}>{{ $slot }}</button>
@endisset
