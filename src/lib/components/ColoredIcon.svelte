<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import type { IconType } from './types'

    interface Props {
        icon: IconType
        name: string
        size?: number
        color?: string
    }

    let { icon: Icon, name, size = 16, color }: Props = $props()

    // Brand color mapping for known technologies
    const brandColorMap: Record<string, string> = {
        // Programming Languages
        TypeScript: '#3178C6',

        // Frontend Frameworks
        SvelteKit: '#FF3E00',
        Svelte: '#FF3E00',

        // CSS Frameworks
        'Tailwind CSS': '#06B6D4',

        // UI Libraries
        'Skeleton UI': '#8B5CF6',

        // Build Tools
        Vite: '#646CFF',

        // Version Control
        GitHub: '#181717',

        // Testing
        Vitest: '#6E9F18',
        Playwright: '#2EAD33',

        // Package Managers
        pnpm: '#F69220',

        // Icons for default UI elements
        Thermometer: '#F97316', // orange
        Flame: '#F97316', // orange
        Heart: '#EF4444', // red
        Wrench: '#3B82F6', // blue
        ChartLine: '#8B5CF6' // purple
    }

    // Default color for unnamed icons
    const defaultColor = 'currentColor'

    // Derive the icon color based on name mapping or use provided color or default
    let iconColor = $derived(color || brandColorMap[name] || defaultColor)
</script>

<span class="inline-block" style="color: {iconColor}">
    <Icon {size} />
</span>
