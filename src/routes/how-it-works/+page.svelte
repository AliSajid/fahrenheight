<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { Thermometer } from '@lucide/svelte'
    import HowItWorksContent from './HowItWorksContent.svelte'
</script>

<svelte:head>
    <title>How It Works - Temperature Converter</title>
</svelte:head>

<div class="min-h-[calc(100vh-4rem-3.5rem)] overflow-y-auto">
    <div class="container mx-auto px-4 py-4 max-w-4xl">
        <!-- Page Header -->
        <div class="text-center mb-12">
            <div class="flex justify-center mb-6">
                <Thermometer class="w-16 h-16 text-primary-500" />
            </div>
            <h1 class="h1 mb-4">How It Works</h1>
            <p class="text-lg text-surface-600-300-token">
                Understanding temperature conversion formulas
            </p>
        </div>

        <!-- Content Card -->
        <div class="card variant-glass-surface p-8">
            <div class="space-y-8">
                <HowItWorksContent />

                <!-- Back Link -->
                <div class="text-center pt-4">
                    <a
                        href="/"
                        data-sveltekit-preload-data="hover"
                        class="btn variant-ghost-surface"
                    >
                        ← Back to Converter
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
