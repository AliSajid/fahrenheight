<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { Thermometer } from '@lucide/svelte'
    import { page } from '$app/state'

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
                class="flex items-center gap-2 font-semibold text-lg hover:text-primary-500 transition-colors"
            >
                <Thermometer class="w-6 h-6 text-primary-500" />
                <span>Fahrenheit</span>
            </a>

            <!-- Navigation Links -->
            <div class="flex items-center gap-6">
                {#each navLinks as link}
                    <a
                        href={link.href}
                        class="text-sm font-medium hover:text-primary-500 transition-colors {page
                            .url.pathname === link.href
                            ? 'text-primary-500'
                            : 'text-surface-600-300-token'}"
                    >
                        {link.label}
                    </a>
                {/each}
            </div>
        </div>
    </div>
</nav>
