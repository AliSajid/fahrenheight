/*
 * SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
 *
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import ColoredIcon from './ColoredIcon.svelte'
import { Thermometer, Heart, Wrench, ChartLine, Flame } from '@lucide/svelte'
import {
    SiTypescript as TypeScript,
    SiSvelte as Svelte,
    SiTailwindcss as Tailwindcss,
    SiSkeleton as SkeletonUI,
    SiGithub as GitHub,
    SiVitest as Vitest,
    SiVite as Vite,
    SiPnpm as Pnpm
} from '@icons-pack/svelte-simple-icons'
import { colord } from 'colord'

describe('ColoredIcon.svelte', () => {
    describe('component rendering', () => {
        it('should render with wrapper span, SVG, and support size props', () => {
            const { container } = render(ColoredIcon, {
                icon: Thermometer,
                name: 'Thermometer',
                size: 24
            })

            const span = container.querySelector('span')
            const svg = container.querySelector('svg')

            expect(span).toBeTruthy()
            expect(span?.classList.contains('inline-block')).toBe(true)
            expect(svg).toBeTruthy()
        })
    })

    describe('brand color mapping', () => {
        it('should apply correct brand colors for all technology categories', () => {
            const testCases = [
                { icon: TypeScript, name: 'TypeScript', color: '#3178C6' },
                { icon: Svelte, name: 'Svelte', color: '#FF3E00' },
                { icon: Svelte, name: 'SvelteKit', color: '#FF3E00' },
                { icon: Tailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
                { icon: SkeletonUI, name: 'Skeleton UI', color: '#8B5CF6' },
                { icon: Vite, name: 'Vite', color: '#646CFF' },
                { icon: GitHub, name: 'GitHub', color: '#181717' },
                { icon: Vitest, name: 'Vitest', color: '#6E9F18' },
                { icon: Pnpm, name: 'pnpm', color: '#F69220' },
                { icon: Thermometer, name: 'Thermometer', color: '#F97316' },
                { icon: Flame, name: 'Flame', color: '#F97316' },
                { icon: Heart, name: 'Heart', color: '#EF4444' },
                { icon: Wrench, name: 'Wrench', color: '#3B82F6' },
                { icon: ChartLine, name: 'ChartLine', color: '#8B5CF6' }
            ]

            testCases.forEach(({ icon, name, color }) => {
                const result = render(ColoredIcon, { icon, name })
                const span = result.container.querySelector('span')
                const style = span?.getAttribute('style')
                const expectedColor = colord(color).toRgbString()
                expect(span).toBeTruthy()
                expect(style).toContain(expectedColor)
                result.unmount()
            })
        })
    })

    describe('color priority system', () => {
        it('should prioritize custom color, then brand color, then currentColor', () => {
            // Test custom color override (highest priority)
            const props = {
                icon: TypeScript,
                name: 'TypeScript',
                color: '#ABCDEF'
            }
            let result = render(ColoredIcon, props)
            let span = result.container.querySelector('span') as HTMLElement
            let style = span?.getAttribute('style')
            let expectedColor = colord(props.color).toRgbString()
            expect(span?.style.color).toBeTruthy() // Color is set
            expect(style).toContain(expectedColor)
            result.unmount()

            // Test brand color (medium priority)
            result = render(ColoredIcon, {
                icon: TypeScript,
                name: 'TypeScript'
            })
            span = result.container.querySelector('span') as HTMLElement
            style = span?.getAttribute('style')
            expectedColor = colord('#3178C6').toRgbString()
            expect(span?.style.color).toBeTruthy() // Color is set
            expect(style).toContain(expectedColor)
            result.unmount()

            // Test currentColor fallback (lowest priority)
            result = render(ColoredIcon, {
                icon: Thermometer,
                name: 'UnknownTechnology'
            })
            span = result.container.querySelector('span') as HTMLElement
            style = span?.getAttribute('style')
            expect(span?.style.color).toBeTruthy()
            expect(style).toContain('currentcolor')
            result.unmount()
        })
    })

    describe('inline styling', () => {
        it('should apply color via inline style attribute with color property', () => {
            const { container } = render(ColoredIcon, {
                icon: TypeScript,
                name: 'TypeScript'
            })

            const span = container.querySelector('span')
            const style = span?.getAttribute('style')
            const expectedColor = colord('#3178C6').toRgbString()

            expect(span).toBeTruthy()
            expect(style).toContain(expectedColor)
        })
    })
})
