<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { Thermometer, LineChart, Github } from 'lucide-svelte';
</script>

<div class="container mx-auto px-4 py-12">
    <!-- Hero Section -->
    <section class="text-center mb-16">
        <div class="flex justify-center mb-6">
            <Thermometer class="w-16 h-16 text-primary-500" />
        </div>
        <h1 class="h1 mb-4">Fahrenheit Temperature Converter</h1>
        <p class="text-xl text-surface-600-300-token max-w-2xl mx-auto">
            A static SvelteKit application demonstrating bidirectional temperature conversion and
            approximation analysis
        </p>
    </section>

    <!-- Features Grid -->
    <section class="grid md:grid-cols-2 gap-8 mb-16">
        <div class="card variant-glass-surface p-6">
            <div class="flex items-center gap-4 mb-4">
                <Thermometer class="w-8 h-8 text-primary-500" />
                <h2 class="h2">Temperature Converter</h2>
            </div>
            <p class="text-surface-600-300-token">
                Dynamic bidirectional temperature conversion between Celsius and Fahrenheit using exact
                formulas: <code class="code">C = (F - 32) * 5/9</code> and
                <code class="code">F = C * 9/5 + 32</code>
            </p>
        </div>

        <div class="card variant-glass-surface p-6">
            <div class="flex items-center gap-4 mb-4">
                <LineChart class="w-8 h-8 text-secondary-500" />
                <h2 class="h2">Approximation Analysis</h2>
            </div>
            <p class="text-surface-600-300-token">
                Visual comparison of the approximation formula <code class="code">(F - 32) / 2 ≈ C</code> vs
                the exact formula, showing accuracy and error metrics across temperature ranges.
            </p>
        </div>
    </section>

    <!-- Technology Stack -->
    <section class="card variant-ghost p-8 mb-16">
        <h2 class="h2 mb-6 text-center">Built With Modern Technologies</h2>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center">
                <h3 class="h3 mb-2">SvelteKit 2.x</h3>
                <p class="text-sm text-surface-600-300-token">With Svelte 5 runes</p>
            </div>
            <div class="text-center">
                <h3 class="h3 mb-2">Tailwind CSS 4.x</h3>
                <p class="text-sm text-surface-600-300-token">Modern utility-first styling</p>
            </div>
            <div class="text-center">
                <h3 class="h3 mb-2">Skeleton UI</h3>
                <p class="text-sm text-surface-600-300-token">Beautiful component library</p>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="text-center">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://svelte.dev/docs/kit" class="btn variant-filled-primary" target="_blank">
                Get Started
            </a>
            <a
                href="https://github.com/AliSajid/fahrenheight"
                class="btn variant-ghost-surface"
                target="_blank"
            >
                <Github class="w-5 h-5 mr-2" />
                View on GitHub
            </a>
        </div>
    </section>
</div>
