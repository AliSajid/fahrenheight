// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { page } from 'vitest/browser'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Footer from './Footer.svelte'

describe('Footer.svelte', () => {
    describe('component structure', () => {
        it('should render footer with all three sections and proper grid layout', async () => {
            render(Footer)

            const footer = page.getByRole('contentinfo')
            await expect.element(footer).toBeInTheDocument()
            await expect.element(footer).toHaveClass(/fixed/)
            await expect.element(footer).toHaveClass(/bottom-0/)
            await expect.element(footer).toHaveClass(/left-0/)
            await expect.element(footer).toHaveClass(/right-0/)

            // Verify all three sections exist
            const techStack = page.getByText('Tech Stack:')
            const builtWith = page.getByText(/built with/i)
            const sourceCode = page.getByText('Source Code:')

            await expect.element(techStack).toBeInTheDocument()
            await expect.element(builtWith).toBeInTheDocument()
            await expect.element(sourceCode).toBeInTheDocument()
        })
    })

    describe('technology stack section', () => {
        it('should display all technologies with bullet separators', async () => {
            render(Footer)

            const technologies = ['TypeScript', 'SvelteKit', 'Tailwind CSS', 'Skeleton UI']

            for (const tech of technologies) {
                const element = page.getByText(tech, { exact: true })
                await expect.element(element).toBeInTheDocument()
            }

            const bullets = await page.getByText('•').elements()
            expect(bullets.length).toBe(3) // 3 bullets for 4 technologies
        })
    })

    describe('attribution section', () => {
        it('should render built with message and author link with hover effect', async () => {
            render(Footer)

            const builtWith = page.getByText(/built with/i)
            const authorLink = page.getByRole('link', { name: /ali sajid imami/i })

            await expect.element(builtWith).toBeInTheDocument()
            await expect.element(authorLink).toBeInTheDocument()
            await expect.element(authorLink).toHaveAttribute('href', 'https://github.com/AliSajid')
            await expect.element(authorLink).toHaveAttribute('target', '_blank')
            await expect.element(authorLink).toHaveAttribute('rel', 'noopener noreferrer')
            await expect.element(authorLink).toHaveClass(/hover:text-primary-500/)
        })

        it('should display emotion icons with aria labels', async () => {
            render(Footer)

            // Check for aria-labels on the emotion icons
            const passionIcon = page.getByLabelText('Passion')
            const loveIcon = page.getByLabelText('Love')
            const workIcon = page.getByLabelText('Work')

            await expect.element(passionIcon).toBeInTheDocument()
            await expect.element(loveIcon).toBeInTheDocument()
            await expect.element(workIcon).toBeInTheDocument()
        })
    })

    describe('source code section', () => {
        it('should display source code label and repository link', async () => {
            render(Footer)

            const sourceLabel = page.getByText('Source Code:')
            const repoLink = page.getByRole('link', { name: /source code repository/i })

            await expect.element(sourceLabel).toBeInTheDocument()
            await expect.element(repoLink).toBeInTheDocument()
            await expect.element(repoLink).toHaveAttribute('href', 'https://github.com/AliSajid/fahrenheight')
        })
    })

    describe('styling', () => {
        it('should have opaque theme-adaptive background colors', async () => {
            render(Footer)

            const footer = page.getByRole('contentinfo')
            await expect.element(footer).toHaveClass(/bg-white/)
            await expect.element(footer).toHaveClass(/dark:bg-surface-900/)
        })

        it('should have proper border and text styling', async () => {
            render(Footer)

            const footer = page.getByRole('contentinfo')
            await expect.element(footer).toHaveClass(/border-t/)
            await expect.element(footer).toHaveClass(/py-3/)
            await expect.element(footer).toHaveClass(/text-xs/)
        })
    })
})
