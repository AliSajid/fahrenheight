<!-- SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com> -->
<!-- SPDX-License-Identifier: MIT -->

<script lang="ts">
    import { page } from '$app/stores'
    import { resolve } from '$app/paths'
    import { Home, ArrowLeft } from 'lucide-svelte'

    // Access error details from page store
    $: status = $page.status
    $: errorMessage = $page.error?.message || 'An unexpected error occurred'

    // Resolve home path for proper base path handling
    const homePath = resolve('/')
</script>

<svelte:head>
    <title>{status} - Temperature Converter</title>
</svelte:head>

<div
    class="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]"
>
    <div class="text-center space-y-6 max-w-2xl">
        <!-- Error Code -->
        <h1 class="text-9xl font-bold text-primary-500">
            {status}
        </h1>

        <!-- Error Message -->
        <h2 class="h2">
            {#if status === 404}
                Page Not Found
            {:else if status === 500}
                Server Error
            {:else}
                Error
            {/if}
        </h2>

        <p class="text-surface-600-300-token text-lg">
            {#if status === 404}
                The page you're looking for doesn't exist. It might have been
                moved or deleted.
            {:else}
                {errorMessage}
            {/if}
        </p>

        <!-- Action Buttons -->
        <div class="flex gap-4 justify-center flex-wrap">
            <a href={homePath} class="btn variant-filled-primary">
                <Home size={20} />
                <span>Back to Home</span>
            </a>
            <button
                onclick={() => history.back()}
                class="btn variant-ghost-surface"
            >
                <ArrowLeft size={20} />
                <span>Go Back</span>
            </button>
        </div>

        <!-- Additional Help -->
        {#if status === 404}
            <div class="card variant-ghost p-6 mt-8">
                <h3 class="h3 mb-4">Looking for something?</h3>
                <p class="text-surface-600-300-token">
                    This site is a simple temperature converter. Try visiting
                    the <a href={homePath} class="anchor">home page</a> to start
                    converting temperatures.
                </p>
            </div>
        {/if}
    </div>
</div>
