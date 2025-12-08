// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { page } from 'vitest/browser'
import { expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-svelte'
import NavLink from './NavLink.svelte'

// Mock the $app/state module
vi.mock('$app/state', () => ({
    page: {
        url: {
            pathname: '/'
        }
    }
}))

test('NavLink renders with correct href and label', async () => {
    render(NavLink, {
        href: '/test-page',
        label: 'Test Page'
    })

    const link = page.getByRole('link', { name: 'Test Page' })
    await expect.element(link).toBeInTheDocument()
    await expect.element(link).toHaveAttribute('href', '/test-page')
})

test('NavLink applies active styles when pathname matches href', async () => {
    render(NavLink, {
        href: '/',
        label: 'Home'
    })

    const link = page.getByRole('link', { name: 'Home' })
    await expect.element(link).toHaveClass(/text-primary-500/)
})

test('NavLink applies inactive styles when pathname does not match href', async () => {
    render(NavLink, {
        href: '/other-page',
        label: 'Other Page'
    })

    const link = page.getByRole('link', { name: 'Other Page' })
    await expect.element(link).toHaveClass(/text-surface-600-300-token/)
})

test('NavLink has correct base classes', async () => {
    render(NavLink, {
        href: '/test',
        label: 'Test'
    })

    const link = page.getByRole('link', { name: 'Test' })
    await expect.element(link).toHaveClass(/text-sm/)
    await expect.element(link).toHaveClass(/font-medium/)
    await expect.element(link).toHaveClass(/hover:text-primary-500/)
    await expect.element(link).toHaveClass(/transition-colors/)
})
