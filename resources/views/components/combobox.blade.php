@props([
    'label' => null,
    'name' => null,           // hidden field that receives the chosen option's value
    'options' => [],          // ['value' => 'Label', …]  or  ['Label', …]
    'placeholder' => 'Search…',
    'value' => null,          // pre-selected value
])
<div class="vx-field">
    @if ($label)
        <label class="vx-label">{{ $label }}</label>
    @endif
    <div {{ $attributes->merge(['class' => 'vx-combobox']) }} data-vx-combobox>
        <input type="text" class="vx-input" placeholder="{{ $placeholder }}" data-vx-combobox-input autocomplete="off">
        @if($name)<input type="hidden" name="{{ $name }}" value="{{ $value }}" data-vx-combobox-value>@endif
        <div class="vx-combobox-menu" hidden>
            @foreach ($options as $key => $label)
                @php $val = is_int($key) ? $label : $key; @endphp
                <div class="vx-combobox-option{{ (string) $value === (string) $val ? ' is-selected' : '' }}" data-value="{{ $val }}">{{ $label }}</div>
            @endforeach
            <div class="vx-combobox-empty" hidden>No matches</div>
        </div>
    </div>
</div>
