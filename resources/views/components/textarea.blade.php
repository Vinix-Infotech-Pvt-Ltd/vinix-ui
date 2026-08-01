@props([
    'label' => null,
    'name' => null,
    'required' => false,
    'error' => null,
    'rows' => 3,
])
<div class="vx-field">
    @if ($label)
        <label class="vx-label" @if($name) for="{{ $name }}" @endif>
            {{ $label }}@if($required)<span class="vx-required">*</span>@endif
        </label>
    @endif
    <textarea
        @if($name) name="{{ $name }}" id="{{ $name }}" @endif
        rows="{{ $rows }}"
        @if($required) required @endif
        {{ $attributes->merge(['class' => 'vx-textarea' . ($error ? ' is-error' : '')]) }}
    >{{ $slot }}</textarea>
    @if ($error)<p class="vx-field-error">{{ $error }}</p>@endif
</div>
