// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { describe, it, expect } from 'vitest'
import { Temperature } from './Temperature.class'

describe('Temperature Class', () => {
    describe('constructor', () => {
        it('should create a Temperature instance with celsius', () => {
            const temp = new Temperature(25, 'celsius')
            expect(temp.value).toBe(25)
            expect(temp.unit).toBe('celsius')
        })

        it('should create a Temperature instance with fahrenheit', () => {
            const temp = new Temperature(77, 'fahrenheit')
            expect(temp.value).toBe(77)
            expect(temp.unit).toBe('fahrenheit')
        })
    })

    describe('convertTo', () => {
        it('should convert celsius to fahrenheit', () => {
            const temp = new Temperature(0, 'celsius')
            const result = temp.convertTo('fahrenheit')
            expect(result.value).toBe(32)
            expect(result.unit).toBe('fahrenheit')
        })

        it('should convert fahrenheit to celsius', () => {
            const temp = new Temperature(32, 'fahrenheit')
            const result = temp.convertTo('celsius')
            expect(result.value).toBe(0)
            expect(result.unit).toBe('celsius')
        })

        it('should return new instance with same values if converting to same unit', () => {
            const temp = new Temperature(25, 'celsius')
            const result = temp.convertTo('celsius')
            expect(result).not.toBe(temp) // New instance
            expect(result.value).toBe(25)
            expect(result.unit).toBe('celsius')
        })
    })

    describe('convertToApprox', () => {
        it('should convert fahrenheit to celsius using approximation', () => {
            const temp = new Temperature(86, 'fahrenheit')
            const result = temp.convertToApprox('celsius')
            expect(result.value).toBe(28)
            expect(result.unit).toBe('celsius')
        })

        it('should convert celsius to fahrenheit using approximation', () => {
            const temp = new Temperature(20, 'celsius')
            const result = temp.convertToApprox('fahrenheit')
            expect(result.value).toBe(70)
            expect(result.unit).toBe('fahrenheit')
        })

        it('should return new instance with same values if converting to same unit', () => {
            const temp = new Temperature(25, 'celsius')
            const result = temp.convertToApprox('celsius')
            expect(result).not.toBe(temp) // New instance
            expect(result.value).toBe(25)
            expect(result.unit).toBe('celsius')
        })
    })

    describe('getOppositeUnit', () => {
        it('should return fahrenheit for celsius temperature', () => {
            const temp = new Temperature(25, 'celsius')
            expect(temp.getOppositeUnit()).toBe('fahrenheit')
        })

        it('should return celsius for fahrenheit temperature', () => {
            const temp = new Temperature(77, 'fahrenheit')
            expect(temp.getOppositeUnit()).toBe('celsius')
        })
    })

    describe('getUnitSymbol', () => {
        it('should return °C for celsius temperature', () => {
            const temp = new Temperature(25, 'celsius')
            expect(temp.getUnitSymbol()).toBe('°C')
        })

        it('should return °F for fahrenheit temperature', () => {
            const temp = new Temperature(77, 'fahrenheit')
            expect(temp.getUnitSymbol()).toBe('°F')
        })
    })

    describe('format', () => {
        it('should format celsius temperature with symbol', () => {
            const temp = new Temperature(25.5, 'celsius')
            expect(temp.format()).toBe('25.50°C')
        })

        it('should format fahrenheit temperature with symbol', () => {
            const temp = new Temperature(77.3, 'fahrenheit')
            expect(temp.format()).toBe('77.30°F')
        })

        it('should handle integer values', () => {
            const temp = new Temperature(0, 'celsius')
            expect(temp.format()).toBe('0.00°C')
        })
    })

    describe('formatValue', () => {
        it('should format value without symbol', () => {
            const temp = new Temperature(25.5, 'celsius')
            expect(temp.formatValue()).toBe('25.50')
        })

        it('should handle integer values', () => {
            const temp = new Temperature(100, 'fahrenheit')
            expect(temp.formatValue()).toBe('100.00')
        })
    })

    describe('static conversion methods', () => {
        it('celsiusToFahrenheit should convert correctly', () => {
            const result = Temperature.celsiusToFahrenheit(0)
            expect(result).toBe(32)
        })

        it('fahrenheitToCelsius should convert correctly', () => {
            const result = Temperature.fahrenheitToCelsius(212)
            expect(result).toBe(100)
        })

        it('fahrenheitToCelsiusApprox should use approximation formula', () => {
            const result = Temperature.fahrenheitToCelsiusApprox(86)
            expect(result).toBe(28)
        })

        it('celsiusToFahrenheitApprox should use approximation formula', () => {
            const result = Temperature.celsiusToFahrenheitApprox(20)
            expect(result).toBe(70)
        })
    })
})
