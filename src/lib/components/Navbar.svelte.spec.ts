// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { page } from 'vitest/browser'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Navbar from './Navbar.svelte'

describe('Navbar.svelte', () => {
    describe('component structure and navigation', () => {
        it('should render navbar with brand, icon, and all navigation links with correct hrefs', async () => {
            render(Navbar)

            const nav = page.getByRole('navigation')
            await expect.element(nav).toBeInTheDocument()

            // Brand logo with ColoredIcon
            const brandLink = page.getByRole('link', { name: /fahrenheight/i })
            await expect.element(brandLink).toBeInTheDocument()
            await expect.element(brandLink).toHaveAttribute('href', '/')
            await expect.element(brandLink).toHaveClass(/flex/)
            await expect.element(brandLink).toHaveClass(/items-center/)

            // Verify brand text
            const brandText = page.getByText('Fahrenheight')
            await expect.element(brandText).toBeInTheDocument()

            // Navigation links with correct hrefs
            const links = [
                { name: /^converter$/i, href: '/' },
                { name: /how it works/i, href: '/how-it-works' },
                { name: /analysis/i, href: '/approximation-analysis' }
            ]

            for (const link of links) {
                const element = page.getByRole('link', { name: link.name })
                await expect.element(element).toBeInTheDocument()
                await expect.element(element).toHaveAttribute('href', link.href)
            }
        })
    })

    describe('styling and layout', () => {
        it('should have opaque background, sticky positioning, and proper layout classes', async () => {
            render(Navbar)

            const nav = page.getByRole('navigation')

            // Opaque theme-adaptive background
            await expect.element(nav).toHaveClass(/bg-white/)
            await expect.element(nav).toHaveClass(/dark:bg-surface-900/)

            // Sticky positioning with z-index and border
            await expect.element(nav).toHaveClass(/sticky/)
            await expect.element(nav).toHaveClass(/top-0/)
            await expect.element(nav).toHaveClass(/z-50/)
            await expect.element(nav).toHaveClass(/border-b/)

            // Brand link hover effects
            const brandLink = page.getByRole('link', { name: /fahrenheight/i })
            await expect.element(brandLink).toHaveClass(/hover:text-primary-500/)
            await expect.element(brandLink).toHaveClass(/transition-colors/)
        })
    })
})
