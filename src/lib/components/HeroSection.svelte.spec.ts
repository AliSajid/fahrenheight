// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { page } from 'vitest/browser'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import HeroSection from './HeroSection.svelte'

describe('HeroSection.svelte', () => {
    describe('component structure', () => {
        it('should render with h1 heading, description, and proper section structure', async () => {
            render(HeroSection)

            // H1 heading with proper hierarchy
            const heading = page.getByRole('heading', {
                name: /fahrenheight: temperature converter/i,
                level: 1
            })
            await expect.element(heading).toBeInTheDocument()
            await expect.element(heading).toHaveClass(/mb-2/)

            // Description text (search for partial text that handles line breaks)
            const description = page.getByText(/mental and exact conversions/i)
            await expect.element(description).toBeInTheDocument()
        })
    })

    describe('content', () => {
        it('should display all key information about the application', async () => {
            render(HeroSection)

            const contentChecks = [
                /celsius/i,
                /fahrenheit/i,
                /conversions/i
            ]

            for (const pattern of contentChecks) {
                const element = page.getByText(pattern)
                await expect.element(element).toBeInTheDocument()
            }
        })
    })

    describe('styling', () => {
        it('should have proper responsive layout and text styling', async () => {
            render(HeroSection)

            // Find description paragraph by partial text
            const description = page.getByText(/mental and exact conversions/i)

            await expect
                .element(description)
                .toHaveClass(/text-surface-600-300-token/)
            await expect.element(description).toHaveClass(/max-w-xl/)
            await expect.element(description).toHaveClass(/mx-auto/)
        })
    })
})
