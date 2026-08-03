@props([
    'label' => null,
    'name' => null,
    'value' => null,          // YYYY-MM-DD
    'placeholder' => 'YYYY-MM-DD',
])
<div class="vx-field">
    @if ($label)
        <label class="vx-label" @if($name) for="{{ $name }}" @endif>{{ $label }}</label>
    @endif
    <div {{ $attributes->merge(['class' => 'vx-datepicker']) }} data-vx-datepicker>
        <input type="text" class="vx-input" placeholder="{{ $placeholder }}" data-vx-datepicker-input autocomplete="off"
            @if($name) name="{{ $name }}" id="{{ $name }}" @endif @if($value !== null) value="{{ $value }}" @endif>
    </div>
</div>
