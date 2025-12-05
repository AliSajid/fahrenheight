<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import ColoredIcon from './ColoredIcon.svelte'

    interface Props {
        icon: any
        name: string
        url: string
        size?: number
    }

    let { icon, name, url, size = 16 }: Props = $props()
</script>

<a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    class="transition-all opacity-70 hover:opacity-100 inline-block"
    aria-label={name}
>
    <ColoredIcon {icon} {name} {size} />
    <span class="sr-only">{name}</span>
</a>
