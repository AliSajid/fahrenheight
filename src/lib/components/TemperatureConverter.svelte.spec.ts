// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { page } from 'vitest/browser'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import TemperatureConverter from './TemperatureConverter.svelte'

describe('TemperatureConverter.svelte', () => {
    describe('component structure', () => {
        it('should render with icon, title, input, unit buttons, and placeholder', async () => {
            render(TemperatureConverter)

            // Title with ColoredIcon (tested in ColoredIcon.spec.ts)
            const heading = page.getByRole('heading', {
                name: /temperature converter/i
            })
            await expect.element(heading).toBeInTheDocument()

            // Input field (TemperatureInput component tested separately)
            const input = page.getByLabelText(/enter temperature/i)
            await expect.element(input).toBeInTheDocument()
            await expect.element(input).toHaveAttribute('type', 'text')

            // Unit selection buttons
            const celsiusButton = page.getByRole('button', { name: '°C' })
            const fahrenheitButton = page.getByRole('button', { name: '°F' })
            await expect.element(celsiusButton).toBeInTheDocument()
            await expect.element(fahrenheitButton).toBeInTheDocument()

            // Default state shows placeholder
            const placeholder = page.getByText(
                /enter a temperature value to see the conversion/i
            )
            await expect.element(placeholder).toBeInTheDocument()
        })
    })

    describe('unit selection', () => {
        it('should have fahrenheit selected by default and allow switching units', async () => {
            render(TemperatureConverter)

            const celsiusButton = page.getByRole('button', { name: '°C' })
            const fahrenheitButton = page.getByRole('button', { name: '°F' })

            // Default: Fahrenheit selected
            await expect
                .element(fahrenheitButton)
                .toHaveClass(/preset-filled-primary-500/)

            // Switch to Celsius and back
            await celsiusButton.click()
            await fahrenheitButton.click()
            await expect
                .element(fahrenheitButton)
                .toHaveClass(/preset-filled-primary-500/)
        })
    })

    describe('temperature conversion - Fahrenheit to Celsius', () => {
        it('should display all result cards with formulas when input is valid', async () => {
            render(TemperatureConverter)

            const input = page.getByLabelText(/enter temperature/i)
            await input.fill('100')

            // Verify all three result cards appear (conversion logic tested in TemperatureConverter.class.spec.ts)
            const exact = page.getByText('Exact Conversion', { exact: true })
            const approx = page.getByText('Approximate Conversion', {
                exact: true
            })
            const percentDiff = page.getByText('Percentage Difference', {
                exact: true
            })

            await expect.element(exact).toBeInTheDocument()
            await expect.element(approx).toBeInTheDocument()
            await expect.element(percentDiff).toBeInTheDocument()

            // Verify formulas are displayed
            const exactFormula = page.getByText(/C = \(F - 32\) × 5\/9/i)
            const approxFormula = page.getByText(/C ≈ \(F - 30\) \/ 2/i)
            await expect.element(exactFormula).toBeInTheDocument()
            await expect.element(approxFormula).toBeInTheDocument()
        })
    })

    describe('temperature conversion - Celsius to Fahrenheit', () => {
        it('should display results with correct formulas when unit is switched', async () => {
            render(TemperatureConverter)

            const input = page.getByLabelText(/enter temperature/i)
            const celsiusButton = page.getByRole('button', { name: '°C' })

            // Switch to Celsius first
            await celsiusButton.click()

            // Enter value after switching
            await input.fill('25')

            // Verify results appear
            const exact = page.getByText('Exact Conversion', { exact: true })
            await expect.element(exact).toBeInTheDocument()

            // Verify Celsius-to-Fahrenheit formulas appear (this confirms unit switch worked)
            const exactFormula = page.getByText(/F\s+=\s+C.*/)
            const approxFormula = page.getByText(/F.*2C.*/)
            await expect.element(exactFormula).toBeInTheDocument()
            await expect.element(approxFormula).toBeInTheDocument()
        })
    })

    describe('input handling', () => {
        it('should accept negative, decimal inputs and display summary', async () => {
            render(TemperatureConverter)

            const input = page.getByLabelText(/enter temperature/i)

            // Test negative number
            await input.fill('-40')
            let exact = page.getByText('Exact Conversion', { exact: true })
            await expect.element(exact).toBeInTheDocument()

            // Test decimal number
            await input.fill('72.5')
            exact = page.getByText('Exact Conversion', { exact: true })
            await expect.element(exact).toBeInTheDocument()
        })
    })

    describe('reactive updates', () => {
        it('should update formulas and results when switching units and entering input', async () => {
            render(TemperatureConverter)

            const input = page.getByLabelText(/enter temperature/i)
            const celsiusButton = page.getByRole('button', { name: '°C' })
            const fahrenheitButton = page.getByRole('button', { name: '°F' })

            // Enter Fahrenheit value and verify formula
            await input.fill('100')
            const fahrenheitFormula = page.getByText(/C\s+=\s+\(F/i)
            await expect.element(fahrenheitFormula).toBeInTheDocument()

            // Switch to Celsius and verify formula changes
            await celsiusButton.click()
            const celsiusFormula = page.getByText(/F\s+=\s+C/i)
            await expect.element(celsiusFormula).toBeInTheDocument()

            // Switch back and verify formula returns
            await fahrenheitButton.click()
            await expect.element(fahrenheitFormula).toBeInTheDocument()
        })
    })
})
