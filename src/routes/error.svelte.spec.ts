// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { page } from 'vitest/browser'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import ErrorPage from './+error.svelte'

describe('+error.svelte', () => {
    it('should render error page container', async () => {
        const { container } = render(ErrorPage)

        expect(container).toBeTruthy()

        // Verify the main container structure exists
        const errorContainer = container.querySelector('.container')
        expect(errorContainer).toBeTruthy()
    })

    it('should render error heading element', async () => {
        render(ErrorPage)

        // The component should have an h1 for the error code
        const h1 = page.getByRole('heading', { level: 1 })
        await expect.element(h1).toBeInTheDocument()
    })

    it('should render error message heading', async () => {
        render(ErrorPage)

        // Should have an h2 for the error type (Error, Page Not Found, or Server Error)
        const h2 = page.getByRole('heading', { level: 2 })
        await expect.element(h2).toBeInTheDocument()
    })

    it('should display generic error heading when no specific status', async () => {
        render(ErrorPage)

        // Without proper store mocking, should show generic "Error" heading
        const heading = page.getByRole('heading', { name: /^error$/i })
        await expect.element(heading).toBeInTheDocument()
    })

    it('should display fallback error message', async () => {
        render(ErrorPage)

        // Without proper store mocking, should show fallback message
        const message = page.getByText(/an unexpected error occurred/i)
        await expect.element(message).toBeInTheDocument()
    })

    it('should have home link with correct href', async () => {
        render(ErrorPage)

        const homeLink = page.getByRole('link', { name: /back to home/i })
        await expect.element(homeLink).toBeInTheDocument()
        await expect.element(homeLink).toHaveAttribute('href', '/')
    })

    it('should have go back button', async () => {
        render(ErrorPage)

        const backButton = page.getByRole('button', { name: /go back/i })
        await expect.element(backButton).toBeInTheDocument()
    })

    it('should render Home icon in link', async () => {
        render(ErrorPage)

        const homeLink = page.getByRole('link', { name: /back to home/i })
        await expect.element(homeLink).toBeInTheDocument()

        // Check for SVG icon inside the link
        const linkElement = homeLink.element()
        const svg = linkElement?.querySelector('svg.lucide')
        expect(svg).toBeTruthy()
    })

    it('should render ArrowLeft icon in button', async () => {
        render(ErrorPage)

        const backButton = page.getByRole('button', { name: /go back/i })
        await expect.element(backButton).toBeInTheDocument()

        // Check for SVG icon inside the button
        const buttonElement = backButton.element()
        const svg = buttonElement?.querySelector('svg.lucide')
        expect(svg).toBeTruthy()
    })

    it('should use proper styling classes', async () => {
        const { container } = render(ErrorPage)

        // Check for Tailwind and Skeleton UI classes
        const mainContainer = container.querySelector('.container.mx-auto')
        expect(mainContainer).toBeTruthy()

        const h1 = container.querySelector('h1.text-9xl')
        expect(h1).toBeTruthy()
    })
})
