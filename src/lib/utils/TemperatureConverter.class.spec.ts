// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { describe, it, expect } from 'vitest'
import { TemperatureConverter } from './TemperatureConverter.class'

describe('TemperatureConverter Class', () => {
    describe('convert', () => {
        it('should convert celsius to fahrenheit with both exact and approximate', () => {
            const result = TemperatureConverter.convert(25, 'celsius')
            expect(result.exact).toBe(77)
            expect(result.approximate).toBe(80)
            expect(result.percentageDifference).toBeCloseTo(3.896, 2)
        })

        it('should convert fahrenheit to celsius with both exact and approximate', () => {
            const result = TemperatureConverter.convert(86, 'fahrenheit')
            expect(result.exact).toBe(30)
            expect(result.approximate).toBe(28)
            expect(result.percentageDifference).toBeCloseTo(6.667, 2)
        })

        it('should calculate percentage difference correctly', () => {
            const result = TemperatureConverter.convert(32, 'fahrenheit')
            expect(result.exact).toBe(0)
            expect(result.approximate).toBe(1)
            expect(result.percentageDifference).toBe(100) // Special case: exact is 0
        })
    })

    describe('calculatePercentageDifference', () => {
        it('should calculate percentage difference as absolute value', () => {
            const result = TemperatureConverter.calculatePercentageDifference(
                100,
                90
            )
            expect(result).toBe(10)
        })

        it('should calculate percentage difference for reverse case', () => {
            const result = TemperatureConverter.calculatePercentageDifference(
                90,
                100
            )
            expect(result).toBeCloseTo(11.111, 2)
        })

        it('should return 0 when values are equal', () => {
            const result = TemperatureConverter.calculatePercentageDifference(
                50,
                50
            )
            expect(result).toBe(0)
        })

        it('should return 100 when exact is zero and approximate is not', () => {
            const result = TemperatureConverter.calculatePercentageDifference(
                0,
                10
            )
            expect(result).toBe(100)
        })

        it('should return 0 when both values are zero', () => {
            const result = TemperatureConverter.calculatePercentageDifference(
                0,
                0
            )
            expect(result).toBe(0)
        })
    })

    describe('formatTemperature', () => {
        it('should format value with 2 decimal places by default', () => {
            const result = TemperatureConverter.formatTemperature(25.5)
            expect(result).toBe('25.50')
        })

        it('should format value with specified decimal places', () => {
            const result = TemperatureConverter.formatTemperature(77.3456, 3)
            expect(result).toBe('77.346')
        })

        it('should handle integer values', () => {
            const result = TemperatureConverter.formatTemperature(0)
            expect(result).toBe('0.00')
        })
    })

    describe('getOppositeUnit', () => {
        it('should return fahrenheit for celsius', () => {
            expect(TemperatureConverter.getOppositeUnit('celsius')).toBe(
                'fahrenheit'
            )
        })

        it('should return celsius for fahrenheit', () => {
            expect(TemperatureConverter.getOppositeUnit('fahrenheit')).toBe(
                'celsius'
            )
        })
    })

    describe('getUnitSymbol', () => {
        it('should return °C for celsius', () => {
            expect(TemperatureConverter.getUnitSymbol('celsius')).toBe('°C')
        })

        it('should return °F for fahrenheit', () => {
            expect(TemperatureConverter.getUnitSymbol('fahrenheit')).toBe('°F')
        })
    })
})
