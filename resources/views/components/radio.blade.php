@props([
    'name' => null,
    'label' => null,
    'checked' => false,
    'value' => null,
])
<label {{ $attributes->merge(['class' => 'vx-check vx-check-radio']) }}>
    <input type="radio" @if($name) name="{{ $name }}" @endif @if($value !== null) value="{{ $value }}" @endif @checked($checked)>
    <span class="vx-check-box"></span>
    @if($label || $slot->isNotEmpty())<span>{{ $label ?? $slot }}</span>@endif
</label>
