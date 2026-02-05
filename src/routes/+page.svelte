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

<div class="min-h-[calc(100vh-4rem-3.5rem)] flex flex-col">
    <div
        class="container mx-auto px-4 pt-4 flex-1 flex flex-col justify-center"
    >
        <!-- Hero Section -->
        <HeroSection />

        <!-- Temperature Converter -->
        <section>
            <TemperatureConverter />
        </section>
    </div>
</div>
