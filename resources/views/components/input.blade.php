@props([
    'label' => null,
    'name' => null,
    'type' => 'text',
    'value' => null,
    'required' => false,
    'error' => null,
    'sm' => false,
])
<div class="vx-field">
    @if ($label)
        <label class="vx-label" @if($name) for="{{ $name }}" @endif>
            {{ $label }}@if($required)<span class="vx-required">*</span>@endif
        </label>
    @endif
    <input
        type="{{ $type }}"
        @if($name) name="{{ $name }}" id="{{ $name }}" @endif
        @if($value !== null) value="{{ $value }}" @endif
        @if($required) required @endif
        {{ $attributes->merge(['class' => 'vx-input' . ($sm ? ' vx-input-sm' : '') . ($error ? ' is-error' : '')]) }}
    />
    @if ($error)<p class="vx-field-error">{{ $error }}</p>@endif
</div>
