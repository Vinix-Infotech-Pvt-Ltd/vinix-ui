@props([
    'label' => null,
    'name' => null,           // submitted as name[] for each chosen value
    'options' => [],          // ['value' => 'Label', …]  or  ['Label', …]
    'selected' => [],         // array of pre-selected values
    'placeholder' => 'Add…',
])
@php $field = $name ? $name . '[]' : ''; @endphp
<div class="vx-field">
    @if ($label)
        <label class="vx-label">{{ $label }}</label>
    @endif
    <div {{ $attributes->merge(['class' => 'vx-multiselect']) }} @if($field) data-vx-multiselect="{{ $field }}" @else data-vx-multiselect @endif>
        <div class="vx-multiselect-control">
            <input type="text" class="vx-multiselect-input" placeholder="{{ $placeholder }}" data-vx-multiselect-input autocomplete="off">
        </div>
        <div class="vx-combobox-menu" hidden>
            @foreach ($options as $key => $label)
                @php $val = is_int($key) ? $label : $key; @endphp
                <div class="vx-combobox-option{{ in_array($val, $selected) ? ' is-selected' : '' }}" data-value="{{ $val }}">{{ $label }}</div>
            @endforeach
        </div>
    </div>
</div>
