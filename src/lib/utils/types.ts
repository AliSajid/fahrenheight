// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

/**
 * Temperature unit types
 */
export type TemperatureUnit = 'celsius' | 'fahrenheit'

/**
 * Conversion result containing exact, approximate, and difference
 */
export interface ConversionResult {
    exact: number
    approximate: number
    percentageDifference: number
}
