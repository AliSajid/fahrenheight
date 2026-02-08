<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { Thermometer } from '@lucide/svelte'
    import ColoredIcon from './ColoredIcon.svelte'
    import TemperatureInput from './TemperatureInput.svelte'
    import TemperatureGraph from './TemperatureGraph.svelte'
    import { TemperatureConverter } from '$lib/utils/TemperatureConverter.class'
    import type { TemperatureUnit } from '$lib/utils/types'

    // State - Using runes for Svelte 5 reactivity
    let inputValue = $state('')
    let activeUnit = $state<TemperatureUnit>('fahrenheit')

    // Derived values - must use let with $derived
    let inputStr = $derived(String(inputValue || ''))
    let hasInput = $derived(inputStr.trim() !== '')
    let parsedValue = $derived(parseFloat(inputStr))

    // Validation: check if valid number and max 2 decimal places
    let decimalMatch = $derived(inputStr.match(/\.(\d+)/))
    let hasValidDecimals = $derived(
        !hasInput || !decimalMatch || decimalMatch[1].length <= 2
    )

    let isValidInput = $derived(
        hasInput && !isNaN(parsedValue) && hasValidDecimals
    )
    let validationError = $derived(
        !hasInput
            ? null
            : isNaN(parsedValue)
              ? 'Please enter a valid number'
              : !hasValidDecimals
                ? 'Maximum 2 decimal places allowed'
                : null
    )

    let result = $derived(
        isValidInput
            ? TemperatureConverter.convert(parsedValue, activeUnit)
            : null
    )
    let targetUnit = $derived(TemperatureConverter.getOppositeUnit(activeUnit))

    // Event handlers
    function handleValueChange(value: string) {
        inputValue = value
    }

    function handleUnitChange(unit: TemperatureUnit) {
        activeUnit = unit
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

<div class="w-full h-full flex flex-col overflow-hidden">
    <div
        class="card variant-glass-surface p-4 flex-1 flex flex-col overflow-hidden"
    >
        <div class="flex items-center gap-3 mb-4">
            <ColoredIcon icon={Thermometer} name="Thermometer" size={24} />
            <h2 class="text-xl font-bold">Temperature Converter</h2>
        </div>

        <!-- Two Column Layout -->
        <div
            class="flex flex-col lg:flex-row gap-4 lg:items-stretch flex-1 overflow-hidden"
        >
            <!-- Left Side: Input and Results -->
            <div class="lg:w-1/2 flex flex-col space-y-4">
                <!-- Input Section with Unit Buttons -->
                <TemperatureInput
                    value={inputValue}
                    {activeUnit}
                    onValueChange={handleValueChange}
                    onUnitChange={handleUnitChange}
                />

                <!-- Results Cards -->
                {#if isValidInput && result}
                    <div class="grid grid-cols-1 gap-4 flex-1">
                        <!-- Exact Conversion -->
                        <div
                            class="card variant-filled-primary p-4 text-center"
                        >
                            <p class="text-xs opacity-80 mb-2">
                                Exact Conversion
                            </p>
                            <p class="text-xl font-bold mb-1">
                                {TemperatureConverter.formatTemperature(
                                    result.exact,
                                    2
                                )}{TemperatureConverter.getUnitSymbol(
                                    targetUnit
                                )}
                            </p>
                            <p class="text-xs opacity-70">
                                {activeUnit === 'celsius'
                                    ? 'F = C × 9/5 + 32'
                                    : 'C = (F - 32) × 5/9'}
                            </p>
                        </div>

                        <!-- Approximate Conversion -->
                        <div
                            class="card variant-filled-secondary p-4 text-center"
                        >
                            <p class="text-xs opacity-80 mb-2">
                                Approximate Conversion
                            </p>
                            <p class="text-xl font-bold mb-1">
                                {TemperatureConverter.formatTemperature(
                                    result.approximate,
                                    2
                                )}{TemperatureConverter.getUnitSymbol(
                                    targetUnit
                                )}
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
                {:else if validationError}
                    <div
                        class="card variant-ghost p-4"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                    >
                        <p class="text-center text-error-500">
                            {validationError}
                        </p>
                    </div>
                {:else}
                    <div class="card variant-ghost p-4">
                        <p class="text-center text-surface-600-300-token">
                            Enter a temperature value to see the conversion
                        </p>
                    </div>
                {/if}
            </div>

            <!-- Right Side: Temperature Graph -->
            {#if isValidInput && result}
                <div class="lg:w-1/2 flex">
                    <div
                        class="card variant-glass-surface p-6 flex flex-col w-full"
                    >
                        <h3 class="h3 mb-4 text-center">Visual Comparison</h3>
                        <div class="flex-1 flex items-center justify-center">
                            <TemperatureGraph
                                centerValue={parsedValue}
                                centerUnit={activeUnit}
                            />
                        </div>
                        <p
                            class="text-sm text-center mt-4 text-surface-600-300-token"
                        >
                            The red highlighted points show your input
                            temperature ({TemperatureConverter.formatTemperature(
                                parsedValue,
                                1
                            )}{TemperatureConverter.getUnitSymbol(activeUnit)})
                            on both conversion lines. Hover over points to see
                            exact values.
                        </p>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
