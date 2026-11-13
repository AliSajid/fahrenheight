// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: CC0-1.0

import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import { defineConfig, includeIgnoreFile } from 'eslint/config'
import globals from 'globals'
import path from 'node:path'
import ts from 'typescript-eslint'
import { loadConfig } from '@sveltejs/load-config'

const svelteConfig = (await loadConfig('./', { traverse: false }))?.config

export default defineConfig(
    includeIgnoreFile(path.join(import.meta.dirname, '.gitignore'), {
        gitignoreResolution: true,
        name: 'project/gitignore'
    }),
    js.configs.recommended,
    ts.configs.recommended,
    svelte.configs.recommended,
    // Must come after all presets that enable formatting-related rules
    // This also obviates the need for @stylistic/eslint
    { name: 'eslint-config-prettier', ...prettier },
    {
        name: 'project/globals',
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        },
        rules: {
            // typescript-eslint recommends against no-undef on TS projects:
            // https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
            'no-undef': 'off',
            // Requires resolve() from $app/paths for internal links. Safe to disable
            // while the app is served from the domain root; re-enable if you add paths.base.
            'svelte/no-navigation-without-resolve': 'off'
        }
    },
    {
        name: 'project/svelte-parser',
        files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                svelteConfig
            }
        }
    }
)
