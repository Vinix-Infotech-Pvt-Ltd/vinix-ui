@props([])
{{-- Stack several <x-vx-avatar> inside for an overlapping group. --}}
<div {{ $attributes->merge(['class' => 'vx-avatar-group']) }}>{{ $slot }}</div>
