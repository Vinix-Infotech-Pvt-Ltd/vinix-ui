@props([
    'single' => false,   // when true, opening one item collapses the others
])
<div {{ $attributes->merge(['class' => 'vx-accordion']) }} data-vx-accordion @if($single) data-vx-accordion-single @endif>
    {{ $slot }}
</div>
