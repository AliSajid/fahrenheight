// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { page } from 'vitest/browser'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Navbar from './Navbar.svelte'

describe('Navbar.svelte', () => {
    describe('component structure', () => {
        it('should render navbar with brand logo and all navigation links', async () => {
            render(Navbar)

            const nav = page.getByRole('navigation')
            await expect.element(nav).toBeInTheDocument()

            // Brand logo
            const brandLink = page.getByRole('link', { name: /fahrenheit/i })
            await expect.element(brandLink).toBeInTheDocument()
            await expect.element(brandLink).toHaveAttribute('href', '/')

            // Navigation links
            const converterLink = page.getByRole('link', { name: /^converter$/i })
            const howItWorksLink = page.getByRole('link', { name: /how it works/i })
            const analysisLink = page.getByRole('link', { name: /analysis/i })

            await expect.element(converterLink).toBeInTheDocument()
            await expect.element(howItWorksLink).toBeInTheDocument()
            await expect.element(analysisLink).toBeInTheDocument()
        })
    })

    describe('navigation links', () => {
        it('should have correct hrefs for all navigation links', async () => {
            render(Navbar)

            const links = [
                { name: /^converter$/i, href: '/' },
                { name: /how it works/i, href: '/how-it-works' },
                { name: /analysis/i, href: '/approximation-analysis' }
            ]

            for (const link of links) {
                const element = page.getByRole('link', { name: link.name })
                await expect.element(element).toHaveAttribute('href', link.href)
            }
        })
    })

    describe('brand section', () => {
        it('should display brand name with hover effect', async () => {
            render(Navbar)

            const brandText = page.getByText('Fahrenheit')
            const brandLink = page.getByRole('link', { name: /fahrenheit/i })

            await expect.element(brandText).toBeInTheDocument()
            await expect.element(brandLink).toHaveClass(/hover:text-primary-500/)
        })
    })

    describe('styling', () => {
        it('should have opaque theme-adaptive background colors', async () => {
            render(Navbar)

            const nav = page.getByRole('navigation')
            await expect.element(nav).toHaveClass(/bg-white/)
            await expect.element(nav).toHaveClass(/dark:bg-surface-900/)
        })

        it('should have sticky positioning with proper z-index and border', async () => {
            render(Navbar)

            const nav = page.getByRole('navigation')
            await expect.element(nav).toHaveClass(/sticky/)
            await expect.element(nav).toHaveClass(/top-0/)
            await expect.element(nav).toHaveClass(/z-50/)
            await expect.element(nav).toHaveClass(/border-b/)
        })
    })
})
