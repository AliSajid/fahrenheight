// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { page } from 'vitest/browser'
import { expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-svelte'
import TemperatureInput from './TemperatureInput.svelte'

test('TemperatureInput renders with label, input, and unit buttons', async () => {
    const mockValueChange = vi.fn()
    const mockUnitChange = vi.fn()

    render(TemperatureInput, {
        value: '',
        activeUnit: 'fahrenheit',
        onValueChange: mockValueChange,
        onUnitChange: mockUnitChange
    })

    // Label
    const label = page.getByText('Enter Temperature')
    await expect.element(label).toBeInTheDocument()

    // Input field
    const input = page.getByPlaceholder('Enter temperature...')
    await expect.element(input).toBeInTheDocument()
    await expect.element(input).toHaveAttribute('type', 'text')
    await expect.element(input).toHaveAttribute('inputmode', 'decimal')

    // Unit buttons
    const celsiusButton = page.getByRole('button', { name: '°C' })
    const fahrenheitButton = page.getByRole('button', { name: '°F' })
    await expect.element(celsiusButton).toBeInTheDocument()
    await expect.element(fahrenheitButton).toBeInTheDocument()
})

test('TemperatureInput displays provided value and highlights active unit', async () => {
    const mockValueChange = vi.fn()
    const mockUnitChange = vi.fn()

    render(TemperatureInput, {
        value: '32.5',
        activeUnit: 'celsius',
        onValueChange: mockValueChange,
        onUnitChange: mockUnitChange
    })

    // Value is displayed
    const input = page.getByPlaceholder('Enter temperature...')
    await expect.element(input).toHaveValue('32.5')

    // Celsius is active
    const celsiusButton = page.getByRole('button', { name: '°C' })
    await expect.element(celsiusButton).toHaveClass(/preset-filled-primary-500/)
})

test('TemperatureInput calls onValueChange when input changes', async () => {
    const mockValueChange = vi.fn()
    const mockUnitChange = vi.fn()

    render(TemperatureInput, {
        value: '',
        activeUnit: 'fahrenheit',
        onValueChange: mockValueChange,
        onUnitChange: mockUnitChange
    })

    const input = page.getByPlaceholder('Enter temperature...')
    await input.fill('100')

    expect(mockValueChange).toHaveBeenCalled()
})

test('TemperatureInput calls onUnitChange when unit buttons are clicked', async () => {
    const mockValueChange = vi.fn()
    const mockUnitChange = vi.fn()

    render(TemperatureInput, {
        value: '50',
        activeUnit: 'fahrenheit',
        onValueChange: mockValueChange,
        onUnitChange: mockUnitChange
    })

    // Click Celsius button
    const celsiusButton = page.getByRole('button', { name: '°C' })
    await celsiusButton.click()
    expect(mockUnitChange).toHaveBeenCalledWith('celsius')

    // Click Fahrenheit button
    const fahrenheitButton = page.getByRole('button', { name: '°F' })
    await fahrenheitButton.click()
    expect(mockUnitChange).toHaveBeenCalledWith('fahrenheit')
})
