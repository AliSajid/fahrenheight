<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import {
        SiGithub as GitHub,
        SiSvelte as Svelte,
        SiTypescript as TypeScript,
        SiSkeleton as SkeletonUI,
        SiTailwindcss as Tailwindcss
    } from '@icons-pack/svelte-simple-icons'
    import { Flame, Wrench, Heart } from '@lucide/svelte'

    import TechStackIcon from './TechStackIcon.svelte'
</script>

<footer
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-900 border-t border-surface-300-600-token py-3 text-xs"
>
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            <!-- Technology Stack (Left) -->
            <div
                class="flex items-center gap-3 flex-wrap justify-center sm:justify-start"
                id="technology-stack"
            >
                <span class="text-surface-600-300-token font-medium"
                    >Tech Stack:</span
                >
                <TechStackIcon
                    icon={TypeScript}
                    name="TypeScript"
                    url="https://typescriptlang.org"
                    size={16}
                />
                <span class="text-surface-400">•</span>
                <TechStackIcon
                    icon={Svelte}
                    name="SvelteKit"
                    url="https://svelte.dev/"
                    size={16}
                />
                <span class="text-surface-400">•</span>
                <TechStackIcon
                    icon={Tailwindcss}
                    name="Tailwind CSS"
                    url="https://tailwindcss.com"
                    size={16}
                />
                <span class="text-surface-400">•</span>
                <TechStackIcon
                    icon={SkeletonUI}
                    name="Skeleton UI"
                    url="https://skeleton.dev"
                    size={16}
                />
            </div>

            <!-- Attribution (Center) -->
            <div class="flex items-center gap-3 flex-wrap justify-center">
                <span
                    class="flex items-center gap-1 text-surface-600-300-token"
                >
                    Built with
                    <Flame
                        class="w-3 h-3 text-orange-500"
                        aria-label="Passion"
                    />
                    <span class="sr-only">Passion</span>
                    ,
                    <Heart class="w-3 h-3 text-red-500" aria-label="Love" />
                    <span class="sr-only">Love</span>
                    and
                    <Wrench class="w-3 h-3 text-blue-500" aria-label="Work" />
                    <span class="sr-only">Work</span>
                    by
                    <a
                        href="https://github.com/AliSajid"
                        class="font-semibold hover:text-primary-500 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer external-link"
                        aria-label="Github Profile"
                    >
                        Ali Sajid Imami
                    </a>
                </span>
            </div>

            <!-- Source Code Link (Right) -->
            <div class="flex items-right gap-3 flex-wrap justify-end">
                <span class="text-surface-600-300-token font-bold text-md">
                    Source Code:
                </span>
                <TechStackIcon
                    icon={GitHub}
                    name="Source Code Repository"
                    size={16}
                    url="https://github.com/AliSajid/fahrenheight"
                />
            </div>
        </div>
    </div>
</footer>
