<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import type { TemperatureUnit } from '$lib/utils/types'

    interface Props {
        value: string
        activeUnit: TemperatureUnit
        onValueChange: (value: string) => void
        onUnitChange: (unit: TemperatureUnit) => void
    }

    let { value, activeUnit, onValueChange, onUnitChange }: Props = $props()
</script>

<div class="mb-8">
    <label for="temp-input" class="label mb-2">
        <span>Enter Temperature</span>
    </label>
    <div class="flex gap-2 items-stretch">
        <!-- Input Field -->
        <input
            id="temp-input"
            type="text"
            inputmode="decimal"
            {value}
            oninput={e => onValueChange(e.currentTarget.value)}
            placeholder="Enter temperature..."
            class="input flex-1"
        />
        <!-- Unit Selection Buttons -->
        <div class="btn-group preset-filled-surface-200-800 flex-1">
            <button
                type="button"
                class="btn btn-lg flex-1"
                class:preset-filled-primary-500={activeUnit === 'celsius'}
                onclick={() => onUnitChange('celsius')}
            >
                °C
            </button>
            <button
                type="button"
                class="btn btn-lg flex-1"
                class:preset-filled-primary-500={activeUnit === 'fahrenheit'}
                onclick={() => onUnitChange('fahrenheit')}
            >
                °F
            </button>
        </div>
    </div>
</div>
