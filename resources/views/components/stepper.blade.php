@props([
    'steps' => [],     // ['Details', 'Payment', 'Review']
    'current' => 1,    // 1-based index of the active step
])
<div {{ $attributes->merge(['class' => 'vx-stepper']) }}>
    @foreach ($steps as $i => $label)
        @php
            $n = $i + 1;
            $state = $n < $current ? 'is-complete' : ($n === (int) $current ? 'is-active' : '');
        @endphp
        <div class="vx-step {{ $state }}">
            <span class="vx-step-marker">@if($n < $current){!! '&#10003;' !!}@else{{ $n }}@endif</span>
            <span class="vx-step-label">{{ $label }}</span>
        </div>
    @endforeach
</div>
