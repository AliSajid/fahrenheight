<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { Thermometer } from '@lucide/svelte'
    import ColoredIcon from './ColoredIcon.svelte'
</script>

<section class="text-center mb-4">
    <div class="flex justify-center mb-2">
        <ColoredIcon
            icon={Thermometer}
            name="Thermometer"
            size={48}
            color="#EF4444"
        />
    </div>
    <h1 class="text-xl md:text-2xl font-bold mb-1">
        Fahrenheight: Temperature Converter
    </h1>
    <p class="text-xs text-surface-600-300-token max-w-xl mx-auto">
        A web application to see how well mental and exact conversions between
        Fahrenheit and Celsius match up.
    </p>
</section>
