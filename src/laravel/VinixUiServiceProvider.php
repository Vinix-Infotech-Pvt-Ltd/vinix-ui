<?php

declare(strict_types=1);

namespace Vinix\Ui;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

/**
 * Vinix UI — Laravel integration.
 *
 * Registers the anonymous Blade components as <x-vx-button>, <x-vx-card>, …
 * and lets you publish the compiled CSS/JS and the Tailwind preset.
 *
 * Install (in a consumer app):
 *   composer require vinix/ui
 *   php artisan vendor:publish --tag=vinix-ui-assets
 * Then load the CSS/JS from public/vendor/vinix-ui/ in your layout.
 */
class VinixUiServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $views = __DIR__ . '/../../resources/views';
        $components = $views . '/components';

        // Namespaced views (e.g. layouts): <x-vinix-ui::...> / view('vinix-ui::...').
        // Registered first so the component aliases below can resolve their views.
        $this->loadViewsFrom($views, 'vinix-ui');

        // Enables the double-colon form: <x-vx::button>, <x-vx::stat-card>, …
        Blade::anonymousComponentPath($components, 'vx');

        // Also register a hyphen alias per component so the documented
        // <x-vx-button> / <x-vx-stat-card> form works too. Each maps to the
        // anonymous view vinix-ui::components.{name}.
        foreach (glob($components . '/*.blade.php') as $file) {
            $name = basename($file, '.blade.php');
            Blade::component('vinix-ui::components.' . $name, 'vx-' . $name);
        }

        if ($this->app->runningInConsole()) {
            // Compiled assets -> public/vendor/vinix-ui/{vinix-ui.css,vinix-ui.js}
            $this->publishes([
                __DIR__ . '/../../dist' => public_path('vendor/vinix-ui'),
            ], 'vinix-ui-assets');

            // Tailwind preset (only if the consumer uses Tailwind).
            $this->publishes([
                __DIR__ . '/../../tailwind-preset.cjs' => base_path('vinix-ui-preset.cjs'),
            ], 'vinix-ui-preset');

            // Raw CSS source (for apps that compile it into their own bundle).
            $this->publishes([
                __DIR__ . '/../../src/css' => resource_path('css/vinix-ui'),
            ], 'vinix-ui-src');
        }
    }
}
