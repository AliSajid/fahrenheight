<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { Thermometer } from 'lucide-svelte'
    import { TemperatureConverter } from '$lib/utils/TemperatureConverter.class'
    import type { TemperatureUnit } from '$lib/utils/types'

    // State - Using runes for Svelte 5 reactivity
    let inputValue = $state('')
    let activeUnit = $state<TemperatureUnit>('fahrenheit')

    // Derived values - must use let with $derived
    let inputStr = $derived(String(inputValue || ''))
    let parsedValue = $derived(parseFloat(inputStr))
    let isValidInput = $derived(!isNaN(parsedValue) && inputStr.trim() !== '')
    let result = $derived(
        isValidInput
            ? TemperatureConverter.convert(parsedValue, activeUnit)
            : null
    )
    let targetUnit = $derived(TemperatureConverter.getOppositeUnit(activeUnit))

    // Button click handlers
    function setActiveCelsius() {
        activeUnit = 'celsius'
    }

    function setActiveFahrenheit() {
        activeUnit = 'fahrenheit'
    }

    // Debug logging
    $effect(() => {
        console.log('Temperature Converter State:', {
            inputValue,
            inputStr,
            activeUnit,
            parsedValue,
            isValidInput,
            hasResult: !!result
        })
    })
</script>

<div class="w-full lg:w-1/2 lg:pr-4">
    <div class="card variant-glass-surface p-8">
        <div class="flex items-center gap-4 mb-6">
            <Thermometer class="w-8 h-8 text-primary-500" />
            <h2 class="h2">Temperature Converter</h2>
        </div>

        <!-- Input Section -->
        <div class="mb-6">
            <label for="temp-input" class="label mb-2">
                <span>Enter Temperature</span>
            </label>
            <input
                id="temp-input"
                type="number"
                bind:value={inputValue}
                placeholder="Enter a number..."
                class="input"
                step="0.01"
            />
        </div>

        <!-- Unit Selection Buttons -->
        <div class="mb-8">
            <div class="label mb-2">
                <span>Input Unit</span>
            </div>
            <div class="flex gap-4">
                <button
                    type="button"
                    onclick={setActiveCelsius}
                    class="btn flex-1 border-2 {activeUnit === 'celsius'
                        ? 'variant-filled-primary border-primary-600 shadow-lg'
                        : 'variant-ghost-surface border-surface-400-500-token hover:border-primary-500'}"
                >
                    Celsius (°C)
                </button>
                <button
                    type="button"
                    onclick={setActiveFahrenheit}
                    class="btn flex-1 border-2 {activeUnit === 'fahrenheit'
                        ? 'variant-filled-primary border-primary-600 shadow-lg'
                        : 'variant-ghost-surface border-surface-400-500-token hover:border-primary-500'}"
                >
                    Fahrenheit (°F)
                </button>
            </div>
        </div>

        <!-- Results Section -->
        {#if isValidInput && result}
            <div class="space-y-4">
                <!-- Input Summary -->
                <div class="card variant-ghost p-4 text-center">
                    <p class="text-sm text-surface-600-300-token mb-1">
                        Input Value
                    </p>
                    <p class="text-xl font-bold">
                        {TemperatureConverter.formatTemperature(
                            parsedValue,
                            2
                        )}{TemperatureConverter.getUnitSymbol(activeUnit)}
                    </p>
                </div>

                <!-- Results in a Single Row -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Exact Conversion -->
                    <div class="card variant-filled-primary p-4 text-center">
                        <p class="text-xs opacity-80 mb-2">Exact Conversion</p>
                        <p class="text-xl font-bold mb-1">
                            {TemperatureConverter.formatTemperature(
                                result.exact,
                                2
                            )}{TemperatureConverter.getUnitSymbol(targetUnit)}
                        </p>
                        <p class="text-xs opacity-70">
                            {activeUnit === 'celsius'
                                ? 'F = C × 9/5 + 32'
                                : 'C = (F - 32) × 5/9'}
                        </p>
                    </div>

                    <!-- Approximate Conversion -->
                    <div class="card variant-filled-secondary p-4 text-center">
                        <p class="text-xs opacity-80 mb-2">
                            Approximate Conversion
                        </p>
                        <p class="text-xl font-bold mb-1">
                            {TemperatureConverter.formatTemperature(
                                result.approximate,
                                2
                            )}{TemperatureConverter.getUnitSymbol(targetUnit)}
                        </p>
                        <p class="text-xs opacity-70">
                            {activeUnit === 'celsius'
                                ? 'F ≈ 2C + 30'
                                : 'C ≈ (F - 30) / 2'}
                        </p>
                    </div>

                    <!-- Percentage Difference -->
                    <div
                        class="card p-4 text-center {result.percentageDifference >
                        5
                            ? 'variant-filled-warning'
                            : 'variant-filled-success'}"
                    >
                        <p class="text-xs opacity-80 mb-2">
                            Percentage Difference
                        </p>
                        <p class="text-xl font-bold mb-1">
                            {TemperatureConverter.formatTemperature(
                                result.percentageDifference,
                                2
                            )}%
                        </p>
                        <p class="text-xs opacity-70">
                            {result.percentageDifference < 1
                                ? 'Excellent!'
                                : result.percentageDifference < 5
                                  ? 'Good'
                                  : 'Significant'}
                        </p>
                    </div>
                </div>
            </div>
        {:else if inputValue.trim() !== ''}
            <div class="card variant-ghost p-4">
                <p class="text-center text-surface-600-300-token">
                    Please enter a valid number
                </p>
            </div>
        {:else}
            <div class="card variant-ghost p-4">
                <p class="text-center text-surface-600-300-token">
                    Enter a temperature value to see the conversion
                </p>
            </div>
        {/if}

        <!-- Information -->
        <div class="mt-6 p-4 bg-surface-100-800-token rounded-lg">
            <p class="text-sm text-surface-600-300-token">
                <strong>Tip:</strong> The approximation formula (F - 30) / 2 ≈ C
                is a quick mental calculation that works reasonably well for everyday
                temperatures. The percentage difference shows how accurate this approximation
                is compared to the exact conversion.
            </p>
        </div>
    </div>
</div>
