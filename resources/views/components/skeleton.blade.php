@props([
    'width' => null,
    'height' => null,
])
@php $style = trim(($width ? 'width:' . $width . ';' : '') . ($height ? 'height:' . $height . ';' : '')); @endphp
<div {{ $attributes->merge(['class' => 'vx-skeleton']) }} @if($style) style="{{ $style }}" @endif></div>
