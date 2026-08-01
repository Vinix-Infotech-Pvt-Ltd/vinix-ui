@props([
    'label' => null,
    'name' => null,
    'required' => false,
    'error' => null,
])
<div class="vx-field">
    @if ($label)
        <label class="vx-label" @if($name) for="{{ $name }}" @endif>
            {{ $label }}@if($required)<span class="vx-required">*</span>@endif
        </label>
    @endif
    <select
        @if($name) name="{{ $name }}" id="{{ $name }}" @endif
        @if($required) required @endif
        {{ $attributes->merge(['class' => 'vx-select' . ($error ? ' is-error' : '')]) }}
    >{{ $slot }}</select>
    @if ($error)<p class="vx-field-error">{{ $error }}</p>@endif
</div>
