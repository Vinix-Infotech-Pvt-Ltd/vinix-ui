@props([
    'value' => 0,
    'max' => 100,
    'variant' => null,          // success | warning | danger
    'indeterminate' => false,
])
@php
    $pct = $indeterminate ? null : max(0, min(100, ($value / max(1, $max)) * 100));
@endphp
<div {{ $attributes->merge(['class' => 'vx-progress' . ($indeterminate ? ' vx-progress-indeterminate' : '')]) }}
     role="progressbar" @if(!$indeterminate) aria-valuenow="{{ $value }}" aria-valuemin="0" aria-valuemax="{{ $max }}" @endif>
    <div class="vx-progress-bar{{ $variant ? ' ' . $variant : '' }}" @if(!$indeterminate) style="width: {{ $pct }}%" @endif></div>
</div>
