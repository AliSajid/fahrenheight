// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-svelte'
import { page } from 'vitest/browser'
import TemperatureGraph from './TemperatureGraph.svelte'

describe('TemperatureGraph', async () => {
    it('renders graph with correct structure', async () => {
        const { container } = await render(TemperatureGraph, {
            props: { centerValue: 70, centerUnit: 'fahrenheit' }
        })

        // Check SVG is rendered
        const svg = container.querySelector('svg')
        expect(svg).toBeTruthy()
        expect(svg?.getAttribute('aria-label')).toBe(
            'Temperature conversion comparison graph'
        )

        // Check title
        const title = await page.getByText(
            'Temperature Conversion Comparison',
            {
                exact: true
            }
        )
        expect(title.query()).toBeTruthy()

        // Check axis labels
        const xLabel = await page.getByText('Temperature (°F)', { exact: true })
        const yLabel = await page.getByText('Temperature (°C)', { exact: true })
        expect(xLabel.query()).toBeTruthy()
        expect(yLabel.query()).toBeTruthy()
    })

    it('renders legend with correct entries', async () => {
        await render(TemperatureGraph, {
            props: { centerValue: 32, centerUnit: 'fahrenheit' }
        })

        // Exact matching avoids the per-point <title> elements
        // ("Exact: 12.0°F = ...") and the sr-only table header ("Exact (°C)")
        const exact = await page.getByText('Exact', { exact: true })
        const approximate = await page.getByText('Approximate', { exact: true })
        const inputTemp = await page.getByText('Input Temp', { exact: true })

        expect(exact.query()).toBeTruthy()
        expect(approximate.query()).toBeTruthy()
        expect(inputTemp.query()).toBeTruthy()
    })

    it('generates correct data range around center value', async () => {
        const { container } = await render(TemperatureGraph, {
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

    it('handles celsius input correctly', async () => {
        const { container } = await render(TemperatureGraph, {
            props: { centerValue: 0, centerUnit: 'celsius' }
        })

        // Should render without errors
        const svg = container.querySelector('svg')
        expect(svg).toBeTruthy()

        // Should have data points
        const circles = container.querySelectorAll('circle')
        expect(circles.length).toBeGreaterThan(0)
    })

    it('annotates each data point with a <title>', async () => {
        const { container } = await render(TemperatureGraph, {
            props: { centerValue: 32, centerUnit: 'fahrenheit' }
        })

        // 21 points * 2 lines; legend circles have no <title>
        const dataCircles = container.querySelectorAll('circle[role="img"]')
        expect(dataCircles.length).toBe(42)

        for (const circle of dataCircles) {
            const text = circle.querySelector('title')?.textContent ?? ''
            expect(text).toMatch(
                /^\s*(Exact|Approximate): -?\d+\.\d°F [=≈] -?\d+\.\d{2}°C\s*$/
            )
        }
    })

    it('renders an accessible data table with one row per point', async () => {
        const { container } = await render(TemperatureGraph, {
            props: { centerValue: 32, centerUnit: 'fahrenheit' }
        })

        const table = container.querySelector('table')
        expect(table).toBeTruthy()
        expect(table?.querySelectorAll('thead th').length).toBe(3)
        expect(table?.querySelectorAll('tbody tr').length).toBe(21)
    })
})
