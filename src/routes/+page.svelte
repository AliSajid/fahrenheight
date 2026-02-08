<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { TemperatureConverter } from '$lib'
    import HeroSection from '$lib/components/HeroSection.svelte'
</script>

<svelte:head>
    <title>Temperature Converter</title>
</svelte:head>

<div class="h-[calc(100vh-4rem-3.5rem)] flex flex-col overflow-hidden">
    <div
        class="container mx-auto px-4 py-4 flex-1 flex flex-col overflow-hidden"
    >
        <!-- Hero Section -->
        <HeroSection />

        <!-- Temperature Converter -->
        <section class="flex-1 overflow-hidden">
            <TemperatureConverter />
        </section>
    </div>
</div>
