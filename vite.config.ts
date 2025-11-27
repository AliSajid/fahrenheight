// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: CC0-1.0

/// <reference types="@vitest/browser/matchers" />

import devtoolsJson from 'vite-plugin-devtools-json'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
    plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
    test: {
        expect: { requireAssertions: true },
        coverage: {
            enabled: false, // Enable coverage collection on demand via --coverage flag
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            reportsDirectory: './test-results/coverage',
            include: ['src/**/*.{js,ts,svelte}'],
            exclude: [
                'src/**/*.{test,spec}.{js,ts}',
                'src/**/*.svelte.{test,spec}.{js,ts}',
                'e2e/**',
                'src/app.d.ts',
                'src/app.html'
            ]
        },
        projects: [
            {
                test: {
                    name: 'unit',
                    environment: 'node',
                    include: ['src/**/*.{test,spec}.{js,ts}'],
                    exclude: ['e2e/**', 'src/**/*.svelte.{test,spec}.{js,ts}']
                }
            },
            {
                plugins: [sveltekit()],
                test: {
                    name: 'browser',
                    browser: {
                        enabled: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium' }]
                    },
                    include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                    exclude: ['e2e/**']
                }
            }
        ]
    }
})
