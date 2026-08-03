@props([])
{{-- Thin wrapper: drop your own <thead>/<tbody> in the slot. Use .vx-col-amount
     / .vx-col-link on cells for right-aligned mono numbers and link styling. --}}
<table {{ $attributes->merge(['class' => 'vx-table']) }}>{{ $slot }}</table>
