@props([
    'label' => null,
    'name' => null,
    'min' => 0,
    'max' => 100,
    'step' => 1,
    'value' => null,
])
<div class="vx-field">
    @if ($label)
        <label class="vx-label" @if($name) for="{{ $name }}" @endif>{{ $label }}</label>
    @endif
    <input type="range" min="{{ $min }}" max="{{ $max }}" step="{{ $step }}"
        @if($name) name="{{ $name }}" id="{{ $name }}" @endif
        @if($value !== null) value="{{ $value }}" @endif
        {{ $attributes->merge(['class' => 'vx-range']) }} />
</div>
