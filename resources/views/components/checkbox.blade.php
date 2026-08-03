@props([
    'name' => null,
    'label' => null,
    'checked' => false,
    'value' => '1',
])
<label {{ $attributes->merge(['class' => 'vx-check']) }}>
    <input type="checkbox" @if($name) name="{{ $name }}" @endif value="{{ $value }}" @checked($checked)>
    <span class="vx-check-box"></span>
    @if($label || $slot->isNotEmpty())<span>{{ $label ?? $slot }}</span>@endif
</label>
