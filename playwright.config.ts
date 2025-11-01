// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: CC0-1.0

import { defineConfig } from '@playwright/test'

export default defineConfig({
    webServer: {
        command: 'mise run build && mise run preview',
        port: 4173
    },
    testDir: 'e2e'
})
