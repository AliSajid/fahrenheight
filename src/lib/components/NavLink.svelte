<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { page } from '$app/state'

    interface Props {
        href: string
        label: string
    }

    let { href, label }: Props = $props()

    let isActive = $derived(page.url.pathname === href)
</script>

<a
    {href}
    data-sveltekit-preload-data="hover"
    class="text-sm font-medium hover:text-primary-500 transition-colors {isActive
        ? 'text-primary-500'
        : 'text-surface-600-300-token'}"
>
    {label}
</a>
