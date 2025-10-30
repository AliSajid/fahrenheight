// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { expect, test } from '@playwright/test'

test('home page has expected h1', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
})
