/*
 * SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
 *
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import TechStackIcon from './TechStackIcon.svelte'
import { Thermometer, Heart } from '@lucide/svelte'
import {
    SiTypescript as TypeScript,
    SiSvelte as Svelte,
    SiTailwindcss as Tailwindcss,
    SiGithub as GitHub
} from '@icons-pack/svelte-simple-icons'
import { colord } from 'colord'

describe('TechStackIcon.svelte', () => {
    describe('component rendering', () => {
        it('should render an anchor tag', () => {
            const { container } = render(TechStackIcon, {
                icon: Thermometer,
                name: 'Test Icon',
                url: 'https://example.com'
            })

            const anchor = container.querySelector('a')
            expect(anchor).toBeTruthy()
        })

        it('should render ColoredIcon component', () => {
            const { container } = render(TechStackIcon, {
                icon: TypeScript,
                name: 'TypeScript',
                url: 'https://typescriptlang.org'
            })

            const span = container.querySelector('span.inline-block')
            expect(span).toBeTruthy()
        })

        it('should render with sr-only text', () => {
            const { container } = render(TechStackIcon, {
                icon: Svelte,
                name: 'Svelte',
                url: 'https://svelte.dev'
            })

            const srOnly = container.querySelector('.sr-only')
            expect(srOnly).toBeTruthy()
            expect(srOnly?.textContent).toBe('Svelte')
        })

        it('should render with default size', () => {
            const { container } = render(TechStackIcon, {
                icon: Heart,
                name: 'Heart',
                url: 'https://example.com'
            })

            const anchor = container.querySelector('a')
            expect(anchor).toBeTruthy()
        })

        it('should render with custom size', () => {
            const { container } = render(TechStackIcon, {
                icon: Tailwindcss,
                name: 'Tailwind CSS',
                url: 'https://tailwindcss.com',
                size: 24
            })

            const anchor = container.querySelector('a')
            expect(anchor).toBeTruthy()
        })
    })

    describe('anchor attributes', () => {
        it('should have all required attributes for secure external links', () => {
            const { container } = render(TechStackIcon, {
                icon: TypeScript,
                name: 'TypeScript',
                url: 'https://typescriptlang.org'
            })

            const anchor = container.querySelector('a')
            expect(anchor?.getAttribute('href')).toBe(
                'https://typescriptlang.org'
            )
            expect(anchor?.getAttribute('target')).toBe('_blank')
            expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer')
            expect(anchor?.getAttribute('aria-label')).toBe('TypeScript')
        })

        it('should set aria-label from name prop', () => {
            const { container } = render(TechStackIcon, {
                icon: GitHub,
                name: 'My Custom Name',
                url: 'https://example.com'
            })

            const anchor = container.querySelector('a')
            expect(anchor?.getAttribute('aria-label')).toBe('My Custom Name')
        })
    })

    describe('styling classes', () => {
        it('should have all styling classes on anchor', () => {
            const { container } = render(TechStackIcon, {
                icon: TypeScript,
                name: 'TypeScript',
                url: 'https://typescriptlang.org'
            })

            const anchor = container.querySelector('a')
            expect(anchor?.classList.contains('transition-all')).toBe(true)
            expect(anchor?.classList.contains('opacity-70')).toBe(true)
            expect(anchor?.classList.contains('hover:opacity-100')).toBe(true)
            expect(anchor?.classList.contains('inline-block')).toBe(true)
        })

        it('should have sr-only class on text span', () => {
            const { container } = render(TechStackIcon, {
                icon: Svelte,
                name: 'Svelte',
                url: 'https://svelte.dev'
            })

            const srOnly = container.querySelector('.sr-only')
            expect(srOnly?.classList.contains('sr-only')).toBe(true)
        })
    })

    describe('ColoredIcon integration', () => {
        it('should pass props to ColoredIcon and render with brand colors', () => {
            const { container } = render(TechStackIcon, {
                icon: TypeScript,
                name: 'TypeScript',
                url: 'https://typescriptlang.org',
                size: 24
            })

            const coloredIconWrapper =
                container.querySelector('span.inline-block')
            expect(coloredIconWrapper).toBeTruthy()

            // Verify color style is applied (specific colors tested in ColoredIcon.spec.ts)
            const style = coloredIconWrapper?.getAttribute('style')
            const expectedColor = colord('#3178C6').toRgbString()
            expect(style).toContain(expectedColor)
        })

        it('should support custom size prop', () => {
            const { container } = render(TechStackIcon, {
                icon: Svelte,
                name: 'Svelte',
                url: 'https://svelte.dev',
                size: 32
            })

            const coloredIconWrapper =
                container.querySelector('span.inline-block')
            expect(coloredIconWrapper).toBeTruthy()
        })
    })

    describe('accessibility', () => {
        it('should have accessible link with aria-label', () => {
            const { container } = render(TechStackIcon, {
                icon: TypeScript,
                name: 'TypeScript',
                url: 'https://typescriptlang.org'
            })

            const anchor = container.querySelector('a')
            expect(anchor?.hasAttribute('aria-label')).toBe(true)
        })

        it('should have sr-only text for screen readers', () => {
            const { container } = render(TechStackIcon, {
                icon: Svelte,
                name: 'Svelte Framework',
                url: 'https://svelte.dev'
            })

            const srOnly = container.querySelector('.sr-only')
            expect(srOnly?.textContent).toBe('Svelte Framework')
        })

        it('should open link in new tab securely', () => {
            const { container } = render(TechStackIcon, {
                icon: GitHub,
                name: 'GitHub',
                url: 'https://github.com'
            })

            const anchor = container.querySelector('a')
            expect(anchor?.getAttribute('target')).toBe('_blank')
            expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer')
        })

        it('should have both aria-label and sr-only text', () => {
            const { container } = render(TechStackIcon, {
                icon: Tailwindcss,
                name: 'Tailwind CSS',
                url: 'https://tailwindcss.com'
            })

            const anchor = container.querySelector('a')
            const srOnly = container.querySelector('.sr-only')

            expect(anchor?.getAttribute('aria-label')).toBe('Tailwind CSS')
            expect(srOnly?.textContent).toBe('Tailwind CSS')
        })
    })

    describe('different icon types', () => {
        it('should render Lucide icons', () => {
            const { container } = render(TechStackIcon, {
                icon: Thermometer,
                name: 'Thermometer',
                url: 'https://example.com'
            })

            const svg = container.querySelector('svg')
            expect(svg).toBeTruthy()
        })

        it('should render Simple Icons', () => {
            const { container } = render(TechStackIcon, {
                icon: TypeScript,
                name: 'TypeScript',
                url: 'https://typescriptlang.org'
            })

            const svg = container.querySelector('svg')
            expect(svg).toBeTruthy()
        })

        it('should apply brand colors for Simple Icons', () => {
            const { container } = render(TechStackIcon, {
                icon: Svelte,
                name: 'Svelte',
                url: 'https://svelte.dev'
            })

            const coloredIconWrapper =
                container.querySelector('span.inline-block')
            const style = coloredIconWrapper?.getAttribute('style')
            const expectedColor = colord('#FF3E00').toRgbString()
            expect(style).toContain(expectedColor) // Svelte brand color
        })

        it('should render Heart Lucide icon', () => {
            const { container } = render(TechStackIcon, {
                icon: Heart,
                name: 'Heart',
                url: 'https://example.com'
            })

            const coloredIconWrapper =
                container.querySelector('span.inline-block')
            const style = coloredIconWrapper?.getAttribute('style')
            const expectedColor = colord('#EF4444').toRgbString()
            expect(style).toContain(expectedColor) // Heart brand color from ColoredIcon
        })
    })

    describe('link behavior', () => {
        it('should handle various URL formats correctly', () => {
            // Test with path
            let result = render(TechStackIcon, {
                icon: GitHub,
                name: 'GitHub',
                url: 'https://github.com/AliSajid'
            })
            let anchor = result.container.querySelector('a')
            expect(anchor?.tagName).toBe('A')
            expect(anchor?.getAttribute('href')).toBe(
                'https://github.com/AliSajid'
            )
            result.unmount()

            // Test without trailing slash
            result = render(TechStackIcon, {
                icon: Svelte,
                name: 'Svelte',
                url: 'https://svelte.dev'
            })
            anchor = result.container.querySelector('a')
            expect(anchor?.getAttribute('href')).toBe('https://svelte.dev')
            result.unmount()

            // Test with trailing slash
            result = render(TechStackIcon, {
                icon: Tailwindcss,
                name: 'Tailwind CSS',
                url: 'https://tailwindcss.com/'
            })
            anchor = result.container.querySelector('a')
            expect(anchor?.getAttribute('href')).toBe(
                'https://tailwindcss.com/'
            )
            result.unmount()
        })
    })

    describe('component composition', () => {
        it('should contain both ColoredIcon and sr-only text', () => {
            const { container } = render(TechStackIcon, {
                icon: TypeScript,
                name: 'TypeScript',
                url: 'https://typescriptlang.org'
            })

            const coloredIcon = container.querySelector('span.inline-block')
            const srOnly = container.querySelector('.sr-only')

            expect(coloredIcon).toBeTruthy()
            expect(srOnly).toBeTruthy()
        })

        it('should wrap ColoredIcon in anchor tag', () => {
            const { container } = render(TechStackIcon, {
                icon: Svelte,
                name: 'Svelte',
                url: 'https://svelte.dev'
            })

            const anchor = container.querySelector('a')
            const coloredIcon = anchor?.querySelector('span.inline-block')

            expect(coloredIcon).toBeTruthy()
        })

        it('should have sr-only as sibling of ColoredIcon', () => {
            const { container } = render(TechStackIcon, {
                icon: Tailwindcss,
                name: 'Tailwind CSS',
                url: 'https://tailwindcss.com'
            })

            const anchor = container.querySelector('a')
            const children = anchor?.children

            expect(children?.length).toBeGreaterThanOrEqual(2)
        })
    })
})
