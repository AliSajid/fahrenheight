// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { describe, expect, it } from 'vitest'

describe('+layout.ts', () => {
    describe('prerender configuration', () => {
        it('should export prerender as true', async () => {
            const module = await import('./+layout.js')

            expect(module.prerender).toBe(true)
        })

        it('should enable static site generation', async () => {
            const module = await import('./+layout.js')

            // Verify that prerender is a boolean
            expect(typeof module.prerender).toBe('boolean')

            // Verify it's enabled for adapter-static
            expect(module.prerender).toBeTruthy()
        })
    })

    describe('module exports', () => {
        it('should only export prerender', async () => {
            const module = await import('./+layout.js')
            const exports = Object.keys(module)

            expect(exports).toContain('prerender')
            expect(exports.length).toBe(1)
        })
    })
})
