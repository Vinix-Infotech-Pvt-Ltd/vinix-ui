@props([
    'name' => null,
    'label' => null,       // dropzone text; falls back to a sensible default
    'accept' => null,
    'multiple' => false,
])
<label {{ $attributes->merge(['class' => 'vx-file']) }}>
    <input type="file" @if($name) name="{{ $name }}{{ $multiple ? '[]' : '' }}" @endif
        @if($accept) accept="{{ $accept }}" @endif @if($multiple) multiple @endif>
    <span class="vx-file-drop">
        @if($slot->isNotEmpty())
            {{ $slot }}
        @else
            <span><strong>Choose a file</strong> or drag it here</span>
        @endif
        @if($label)<span>{{ $label }}</span>@endif
        <span class="vx-text-sm vx-text-muted" data-vx-file-name></span>
    </span>
</label>
