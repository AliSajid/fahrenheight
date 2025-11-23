// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: CC0-1.0

import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    webServer: {
        command: 'mise run build && mise run preview',
        port: 4173
    },
    testDir: 'e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        [
            process.env.CI ? 'dot' : 'list'
        ],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'e2e/test-results.json' }]
    ],
    use: {
        baseURL: 'http://localhost:4173',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure'
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] }
        },
        // Mobile viewports
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] }
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] }
        }
    ]
})
