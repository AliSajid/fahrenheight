// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { expect, test } from '@playwright/test'

test.describe('Temperature Converter', () => {
    test('should display temperature converter component', async ({ page }) => {
        await page.goto('/')
        await expect(
            page.getByRole('heading', {
                name: 'Temperature Converter',
                exact: true
            })
        ).toBeVisible()
        await expect(page.getByLabel('Enter Temperature')).toBeVisible()
    })

    test('should have unit selection buttons', async ({ page }) => {
        await page.goto('/')
        await expect(
            page.getByRole('button', { name: /Celsius/i })
        ).toBeVisible()
        await expect(
            page.getByRole('button', { name: /Fahrenheit/i })
        ).toBeVisible()
    })

    test('should convert fahrenheit to celsius', async ({ page }) => {
        await page.goto('/')

        // Fahrenheit should be selected by default
        await expect(
            page.getByRole('button', { name: /Fahrenheit/i })
        ).toHaveClass(/variant-filled-primary/)

        // Enter a value
        await page.getByLabel('Enter Temperature').fill('86')

        // Wait for results to appear using more specific selectors
        await expect(
            page
                .locator('.card.variant-filled-primary')
                .getByText('Exact Conversion')
        ).toBeVisible()
        await expect(page.getByText('30.00°C')).toBeVisible()
        await expect(page.getByText('28.00°C')).toBeVisible()
    })

    test('should convert celsius to fahrenheit', async ({ page }) => {
        await page.goto('/')

        // Switch to Celsius
        await page.getByRole('button', { name: /Celsius/i }).click()
        await expect(
            page.getByRole('button', { name: /Celsius/i })
        ).toHaveClass(/variant-filled-primary/)

        // Enter a value
        await page.getByLabel('Enter Temperature').fill('25')

        // Wait for results to appear using more specific selectors
        await expect(
            page
                .locator('.card.variant-filled-primary')
                .getByText('Exact Conversion')
        ).toBeVisible()
        await expect(page.getByText('77.00°F')).toBeVisible()
        await expect(page.getByText('80.00°F')).toBeVisible()
    })

    test('should show percentage difference', async ({ page }) => {
        await page.goto('/')

        await page.getByLabel('Enter Temperature').fill('68')

        // Wait for results and check for percentage value
        await expect(page.getByText('20.00°C')).toBeVisible()
        await expect(page.getByText('5.00%')).toBeVisible()
    })

    test('should update when switching units', async ({ page }) => {
        await page.goto('/')

        // Enter value in Fahrenheit
        await page.getByLabel('Enter Temperature').fill('32')
        await expect(page.getByText('0.00°C')).toBeVisible()

        // Switch to Celsius
        await page.getByRole('button', { name: /Celsius/i }).click()
        await expect(page.getByText('89.60°F')).toBeVisible()
    })

    test('should show placeholder when no input', async ({ page }) => {
        await page.goto('/')
        await expect(
            page.getByText('Enter a temperature value to see the conversion')
        ).toBeVisible()
    })

    test('should handle empty input', async ({ page }) => {
        await page.goto('/')

        // Clear input (simulate empty)
        const input = page.getByLabel('Enter Temperature')
        await input.fill('')
        await input.blur()

        // Should show the empty state message
        await expect(
            page.getByText('Enter a temperature value to see the conversion')
        ).toBeVisible()
    })
})

test.describe('Temperature Converter Visual Tests', () => {
    test('initial state screenshot', async ({ page }) => {
        await page.goto('/')
        await expect(page).toHaveScreenshot('converter-initial-state.png', {
            fullPage: true
        })
    })

    test('fahrenheit to celsius conversion screenshot', async ({ page }) => {
        await page.goto('/')
        await page.getByLabel('Enter Temperature').fill('86')
        // Wait for specific result card
        await expect(
            page
                .locator('.card.variant-filled-primary')
                .getByText('Exact Conversion')
        ).toBeVisible()
        await expect(page).toHaveScreenshot(
            'converter-fahrenheit-to-celsius.png',
            {
                fullPage: true
            }
        )
    })

    test('celsius to fahrenheit conversion screenshot', async ({ page }) => {
        await page.goto('/')
        await page.getByRole('button', { name: /Celsius/i }).click()
        await page.getByLabel('Enter Temperature').fill('25')
        // Wait for specific result card
        await expect(
            page
                .locator('.card.variant-filled-primary')
                .getByText('Exact Conversion')
        ).toBeVisible()
        await expect(page).toHaveScreenshot(
            'converter-celsius-to-fahrenheit.png',
            {
                fullPage: true
            }
        )
    })

    test('empty input screenshot', async ({ page }) => {
        await page.goto('/')
        // Just take screenshot of initial empty state
        await expect(
            page.getByText('Enter a temperature value to see the conversion')
        ).toBeVisible()
        await expect(page).toHaveScreenshot('converter-empty-input.png', {
            fullPage: true
        })
    })

    test('buttons screenshot', async ({ page }) => {
        await page.goto('/')
        // Get the converter component specifically
        const converter = page.locator('.w-full.lg\\:w-1\\/2')
        await expect(converter).toBeVisible()
        await expect(page).toHaveScreenshot('converter-buttons.png', {
            fullPage: true
        })
    })

    test('celsius button active screenshot', async ({ page }) => {
        await page.goto('/')
        await page.getByRole('button', { name: /Celsius/i }).click()
        await page.getByLabel('Enter Temperature').fill('20')
        // Wait for results
        await expect(
            page
                .locator('.card.variant-filled-primary')
                .getByText('Exact Conversion')
        ).toBeVisible()
        await expect(page).toHaveScreenshot('converter-celsius-active.png', {
            fullPage: true
        })
    })
})
