// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { Temperature } from './Temperature.class'
import type { TemperatureUnit, ConversionResult } from './types'

/**
 * Temperature converter that performs conversions and provides analysis
 */
export class TemperatureConverter {
    /**
     * Convert temperature from one unit to another
     * Returns both exact and approximate conversions with percentage difference
     */
    static convert(value: number, fromUnit: TemperatureUnit): ConversionResult {
        const sourceTemp = new Temperature(value, fromUnit)
        const targetUnit = sourceTemp.getOppositeUnit()

        const exactTemp = sourceTemp.convertTo(targetUnit)
        const approxTemp = sourceTemp.convertToApprox(targetUnit)

        const percentageDifference =
            TemperatureConverter.calculatePercentageDifference(
                exactTemp.value,
                approxTemp.value
            )

        return {
            exact: exactTemp.value,
            approximate: approxTemp.value,
            percentageDifference
        }
    }

    /**
     * Calculate percentage difference between two values
     * Returns the percentage error relative to the exact value
     */
    static calculatePercentageDifference(
        exact: number,
        approximate: number
    ): number {
        if (exact === 0) {
            return approximate === 0 ? 0 : 100
        }
        return Math.abs(((approximate - exact) / exact) * 100)
    }

    /**
     * Format temperature value for display
     */
    static formatTemperature(value: number, decimals: number = 2): string {
        return value.toFixed(decimals)
    }

    /**
     * Get the opposite unit
     */
    static getOppositeUnit(unit: TemperatureUnit): TemperatureUnit {
        return unit === 'celsius' ? 'fahrenheit' : 'celsius'
    }

    /**
     * Get unit symbol
     */
    static getUnitSymbol(unit: TemperatureUnit): string {
        return unit === 'celsius' ? '°C' : '°F'
    }
}
