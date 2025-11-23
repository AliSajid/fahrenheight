// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import type { TemperatureUnit } from './types'

/**
 * Represents a temperature value with a specific unit
 */
export class Temperature {
    constructor(
        public readonly value: number,
        public readonly unit: TemperatureUnit
    ) {}

    /**
     * Convert this temperature to the specified unit (exact formula)
     */
    convertTo(targetUnit: TemperatureUnit): Temperature {
        if (this.unit === targetUnit) {
            return new Temperature(this.value, this.unit)
        }

        const convertedValue =
            this.unit === 'celsius'
                ? Temperature.celsiusToFahrenheit(this.value)
                : Temperature.fahrenheitToCelsius(this.value)

        return new Temperature(convertedValue, targetUnit)
    }

    /**
     * Convert this temperature to the specified unit using approximation formula
     */
    convertToApprox(targetUnit: TemperatureUnit): Temperature {
        if (this.unit === targetUnit) {
            return new Temperature(this.value, this.unit)
        }

        const convertedValue =
            this.unit === 'celsius'
                ? Temperature.celsiusToFahrenheitApprox(this.value)
                : Temperature.fahrenheitToCelsiusApprox(this.value)

        return new Temperature(convertedValue, targetUnit)
    }

    /**
     * Get the opposite unit
     */
    getOppositeUnit(): TemperatureUnit {
        return this.unit === 'celsius' ? 'fahrenheit' : 'celsius'
    }

    /**
     * Get unit symbol
     */
    getUnitSymbol(): string {
        return this.unit === 'celsius' ? '°C' : '°F'
    }

    /**
     * Format temperature for display
     */
    format(decimals: number = 2): string {
        return `${this.value.toFixed(decimals)}${this.getUnitSymbol()}`
    }

    /**
     * Get just the formatted value without unit
     */
    formatValue(decimals: number = 2): string {
        return this.value.toFixed(decimals)
    }

    /**
     * Convert Celsius to Fahrenheit (exact formula)
     * F = C * 9/5 + 32
     */
    static celsiusToFahrenheit(celsius: number): number {
        return (celsius * 9) / 5 + 32
    }

    /**
     * Convert Fahrenheit to Celsius (exact formula)
     * C = (F - 32) * 5/9
     */
    static fahrenheitToCelsius(fahrenheit: number): number {
        return ((fahrenheit - 32) * 5) / 9
    }

    /**
     * Convert Fahrenheit to Celsius using approximation formula
     * C ≈ (F - 30) / 2
     */
    static fahrenheitToCelsiusApprox(fahrenheit: number): number {
        return (fahrenheit - 30) / 2
    }

    /**
     * Convert Celsius to Fahrenheit using approximation formula
     * Derived from: F ≈ 2C + 30
     */
    static celsiusToFahrenheitApprox(celsius: number): number {
        return 2 * celsius + 30
    }
}
