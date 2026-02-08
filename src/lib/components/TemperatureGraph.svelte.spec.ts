// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-svelte'
import { page } from '@vitest/browser/context'
import TemperatureGraph from './TemperatureGraph.svelte'

describe('TemperatureGraph', () => {
    it('renders graph with correct structure', async () => {
        const { container } = render(TemperatureGraph, {
            props: { centerValue: 70, centerUnit: 'fahrenheit' }
        })

        // Check SVG is rendered
        const svg = container.querySelector('svg')
        expect(svg).toBeTruthy()
        expect(svg?.getAttribute('aria-label')).toBe(
            'Temperature conversion comparison graph'
        )

        // Check title
        const title = await page.getByText('Temperature Conversion Comparison')
        expect(title.query()).toBeTruthy()

        // Check axis labels
        const xLabel = await page.getByText('Temperature (°F)')
        const yLabel = await page.getByText('Temperature (°C)')
        expect(xLabel.query()).toBeTruthy()
        expect(yLabel.query()).toBeTruthy()
    })

    it('renders legend with correct entries', async () => {
        render(TemperatureGraph, {
            props: { centerValue: 32, centerUnit: 'fahrenheit' }
        })

        // Check legend items
        const exact = await page.getByText('Exact')
        const approximate = await page.getByText('Approximate')
        const inputTemp = await page.getByText('Input Temp')

        expect(exact.query()).toBeTruthy()
        expect(approximate.query()).toBeTruthy()
        expect(inputTemp.query()).toBeTruthy()
    })

    it('generates correct data range around center value', () => {
        const { container } = render(TemperatureGraph, {
            props: { centerValue: 100, centerUnit: 'fahrenheit' }
        })

        // SVG should contain data points (circles)
        const circles = container.querySelectorAll('circle')
        expect(circles.length).toBeGreaterThan(0)

        // Should have multiple points for the ±20 degree range
        // With step=2, we should have 21 points per line * 2 lines = 42 circles
        // Plus 3 circles in the legend = 45 total
        expect(circles.length).toBe(45)
    })

    it('handles celsius input correctly', () => {
        const { container } = render(TemperatureGraph, {
            props: { centerValue: 0, centerUnit: 'celsius' }
        })

        // Should render without errors
        const svg = container.querySelector('svg')
        expect(svg).toBeTruthy()

        // Should have data points
        const circles = container.querySelectorAll('circle')
        expect(circles.length).toBeGreaterThan(0)
    })
})
