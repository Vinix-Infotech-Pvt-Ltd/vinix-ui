@props([])
{{-- Compose an input with leading/trailing addons:
     <x-vx-input-group>
         <span class="vx-input-addon">₹</span>
         <input class="vx-input" placeholder="0.00">
         <span class="vx-input-addon">.00</span>
     </x-vx-input-group> --}}
<div {{ $attributes->merge(['class' => 'vx-input-group']) }}>{{ $slot }}</div>
