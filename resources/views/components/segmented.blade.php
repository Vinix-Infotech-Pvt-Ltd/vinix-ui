@props([
    'options' => [],   // ['key' => 'Label', …]  or  ['Label', …]
    'active' => null,  // the key (or label) of the active segment
    'name' => null,    // optional data-vx-segment group name for your own JS wiring
])
<div {{ $attributes->merge(['class' => 'vx-segmented']) }} role="tablist" data-vx-segmented @if($name) data-vx-segment-name="{{ $name }}" @endif>
    @foreach ($options as $key => $label)
        @php $val = is_int($key) ? $label : $key; @endphp
        <button type="button" class="vx-segment{{ (string) $active === (string) $val ? ' is-active' : '' }}" value="{{ $val }}">{{ $label }}</button>
    @endforeach
</div>
