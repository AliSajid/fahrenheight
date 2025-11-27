// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { expect, test } from '@playwright/test'

test.describe('404 Error Page', () => {
    test('should display 404 page for non-existent routes', async ({
        page
    }) => {
        // Navigate to a non-existent page
        const response = await page.goto('/this-page-does-not-exist')

        // Should return 404 status
        expect(response?.status()).toBe(404)

        // Should display 404 heading
        await expect(page.getByRole('heading', { name: '404' })).toBeVisible()

        // Should display "Page Not Found" message
        await expect(
            page.getByRole('heading', { name: 'Page Not Found' })
        ).toBeVisible()

        // Should have helpful message
        await expect(
            page.getByText("The page you're looking for doesn't exist")
        ).toBeVisible()
    })

    test('should have working navigation links', async ({ page }) => {
        await page.goto('/non-existent-page')

        // Should have "Back to Home" button
        const homeLink = page.getByRole('link', { name: /Back to Home/i })
        await expect(homeLink).toBeVisible()
        await expect(homeLink).toHaveAttribute('href', '/')

        // Should have "Go Back" button
        await expect(
            page.getByRole('button', { name: /Go Back/i })
        ).toBeVisible()
    })

    test('should navigate back to home page', async ({ page }) => {
        // Start on home page
        await page.goto('/')
        await expect(
            page.getByRole('heading', {
                name: 'Temperature Converter',
                exact: true
            })
        ).toBeVisible()

        // Navigate to 404 page
        await page.goto('/invalid-route')
        await expect(page.getByRole('heading', { name: '404' })).toBeVisible()

        // Click "Back to Home" link
        await page.getByRole('link', { name: /Back to Home/i }).click()

        // Should be back on home page
        await expect(
            page.getByRole('heading', {
                name: 'Temperature Converter',
                exact: true
            })
        ).toBeVisible()
        await expect(page).toHaveURL('/')
    })

    test('should display helpful information for 404', async ({ page }) => {
        await page.goto('/random-path')

        // Should show the helper card
        await expect(
            page.getByRole('heading', { name: 'Looking for something?' })
        ).toBeVisible()

        // Should have link to home page in helper text
        const helpLink = page.getByRole('link', { name: 'home page' })
        await expect(helpLink).toBeVisible()
        await expect(helpLink).toHaveAttribute('href', '/')
    })

    test('should have proper page title', async ({ page }) => {
        await page.goto('/does-not-exist')

        // Should update page title
        await expect(page).toHaveTitle('404 - Temperature Converter')
    })
})
