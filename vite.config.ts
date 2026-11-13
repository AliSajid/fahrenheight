// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: CC0-1.0
import adapter from '@sveltejs/adapter-static'

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: CC0-1.0
/// <reference types="@vitest/browser/matchers" />
import devtoolsJson from 'vite-plugin-devtools-json'

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'
import { playwright } from '@vitest/browser-playwright'
import { env } from 'process'

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit({
            // Consult https://svelte.dev/docs/kit/integrations
            // for more information about preprocessors
            preprocess: vitePreprocess(),

            adapter: adapter({
                // Generate 404.html for static hosting (Cloudflare Pages, etc.)
                fallback: '404.html'
            })
        }),
        devtoolsJson()
    ],
    test: {
        expect: { requireAssertions: true },
        coverage: {
            enabled: false /* Enable coverage collection on demand via --coverage flag */,
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
                test: {
                    name: 'browser',
                    browser: {
                        enabled: true,
                        provider: playwright(),
                        headless: env.CI === 'true' || false,
                        instances: [
                            { browser: 'chromium' },
                            { browser: 'webkit', headless: true },
                            { browser: 'firefox', headless: true }
                        ]
                    },
                    include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                    exclude: ['e2e/**']
                }
            }
        ]
    }
})
