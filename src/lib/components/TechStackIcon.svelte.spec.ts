/*
 * SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
 *
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import TechStackIcon from './TechStackIcon.svelte'
import { Heart } from '@lucide/svelte'
import {
    SiTypescript as TypeScript,
    SiSvelte as Svelte,
    SiTailwindcss as Tailwindcss,
    SiGithub as GitHub
} from '@icons-pack/svelte-simple-icons'

describe('TechStackIcon.svelte', () => {
    describe('component rendering', () => {
        it('should render complete component structure with all elements', () => {
            const { container } = render(TechStackIcon, {
                icon: TypeScript,
                name: 'TypeScript',
                url: 'https://example.com'
            })

            // Verify all core elements
            const anchor = container.querySelector('a')
            const coloredIcon = container.querySelector('span.inline-block')
            const srOnly = container.querySelector('.sr-only')

            expect(anchor).toBeTruthy()
            expect(coloredIcon).toBeTruthy()
            expect(srOnly).toBeTruthy()
            expect(srOnly?.textContent).toBe('TypeScript')
        })

        it('should support custom size prop', () => {
            const { container } = render(TechStackIcon, {
                icon: Tailwindcss,
                name: 'Tailwind CSS',
                url: 'https://tailwindcss.com',
                size: 24
            })

            const coloredIcon = container.querySelector('span.inline-block')
            expect(coloredIcon).toBeTruthy()
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
        it('should pass props to ColoredIcon and apply brand colors', () => {
            const { container } = render(TechStackIcon, {
                icon: TypeScript,
                name: 'TypeScript',
                url: 'https://typescriptlang.org'
            })

            const coloredIconWrapper =
                container.querySelector('span.inline-block')
            expect(coloredIconWrapper).toBeTruthy()

            // ColoredIcon should apply brand color based on name
            const style = coloredIconWrapper?.getAttribute('style')
            expect(style).toContain('#3178C6') // TypeScript brand color
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
        it('should have complete accessibility features', () => {
            const { container } = render(TechStackIcon, {
                icon: TypeScript,
                name: 'TypeScript',
                url: 'https://typescriptlang.org'
            })

            const anchor = container.querySelector('a')
            const srOnly = container.querySelector('.sr-only')

            // Verify aria-label and sr-only text match
            expect(anchor?.hasAttribute('aria-label')).toBe(true)
            expect(anchor?.getAttribute('aria-label')).toBe('TypeScript')
            expect(srOnly?.textContent).toBe('TypeScript')

            // Verify secure external link attributes
            expect(anchor?.getAttribute('target')).toBe('_blank')
            expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer')
        })
    })

    describe('icon type support', () => {
        it('should render both Lucide and Simple Icons with brand colors', () => {
            // Test Simple Icon with brand color
            let result = render(TechStackIcon, {
                icon: Svelte,
                name: 'Svelte',
                url: 'https://svelte.dev'
            })
            let svg = result.container.querySelector('svg')
            let coloredIconWrapper =
                result.container.querySelector('span.inline-block')
            let style = coloredIconWrapper?.getAttribute('style')
            expect(svg).toBeTruthy()
            expect(style).toContain('#FF3E00') // Svelte brand color
            result.unmount()

            // Test Lucide icon with brand color
            result = render(TechStackIcon, {
                icon: Heart,
                name: 'Heart',
                url: 'https://example.com'
            })
            svg = result.container.querySelector('svg')
            coloredIconWrapper =
                result.container.querySelector('span.inline-block')
            style = coloredIconWrapper?.getAttribute('style')
            expect(svg).toBeTruthy()
            expect(style).toContain('#EF4444') // Heart brand color
            result.unmount()
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
})
