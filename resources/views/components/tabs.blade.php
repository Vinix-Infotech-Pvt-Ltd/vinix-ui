@props([
    'tabs' => [],       // ['overview' => 'Overview', 'activity' => 'Activity']
    'active' => null,   // key of the initially-active tab (defaults to first)
])
{{-- Provide the panels in the slot, one per key:
     <div data-vx-tab-panel="overview">…</div>
     <div data-vx-tab-panel="activity" hidden>…</div>  --}}
@php $active = $active ?? array_key_first($tabs); @endphp
<div {{ $attributes->except('class') }} data-vx-tabs>
    <div {{ $attributes->merge(['class' => 'vx-tabs']) }}>
        @foreach ($tabs as $key => $label)
            <button type="button" class="vx-tab{{ $active === $key ? ' is-active' : '' }}" data-vx-tab="{{ $key }}">{{ $label }}</button>
        @endforeach
    </div>
    {{ $slot }}
</div>
