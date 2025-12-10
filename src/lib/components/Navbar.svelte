<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { Thermometer } from '@lucide/svelte'
    import ColoredIcon from './ColoredIcon.svelte'
    import NavLink from './NavLink.svelte'

    const navLinks = [
        { href: '/', label: 'Converter' },
        { href: '/how-it-works', label: 'How It Works' },
        { href: '/approximation-analysis', label: 'Analysis' }
    ]
</script>

<nav
    class="sticky top-0 z-50 bg-white dark:bg-surface-900 border-b border-surface-300-600-token"
>
    <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
            <!-- Logo/Brand -->
            <a
                href="/"
                data-sveltekit-preload-data="hover"
                class="flex items-center gap-2 font-semibold text-lg hover:text-primary-500 transition-colors"
            >
                <ColoredIcon icon={Thermometer} name="Thermometer" size={24} />
                <span>Fahrenheight</span>
            </a>

            <!-- Navigation Links -->
            <div class="flex items-center gap-6">
                {#each navLinks as link (link.href)}
                    <NavLink href={link.href} label={link.label} />
                {/each}
            </div>
        </div>
    </div>
</nav>
