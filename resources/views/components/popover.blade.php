@props([
    'align' => 'left',   // left | right
])
{{-- Put your trigger in the `trigger` slot and add data-vx-popover-toggle to it:
     <x-vx-popover>
         <x-slot:trigger><button class="vx-btn vx-btn-secondary" data-vx-popover-toggle>Open</button></x-slot:trigger>
         …panel content…
     </x-vx-popover> --}}
<div {{ $attributes->merge(['class' => 'vx-popover']) }}>
    {{ $trigger ?? '' }}
    <div class="vx-popover-panel{{ $align === 'right' ? ' vx-align-right' : '' }}" hidden>{{ $slot }}</div>
</div>
