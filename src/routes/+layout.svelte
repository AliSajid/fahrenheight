<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import '../app.css'
    import favicon from '$lib/assets/favicon.svg'
    import Navbar from '$lib/components/Navbar.svelte'
    import Footer from '$lib/components/Footer.svelte'

    let { children } = $props()
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>Fahrenheight Temperature Converter</title>
</svelte:head>

<Navbar />

{@render children()}

<Footer />
