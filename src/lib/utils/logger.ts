// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

/**
 * Development-only logger utility
 * Only outputs logs when running in development mode
 */

const isDev = import.meta.env.DEV

export const logger = {
    log: (...args: unknown[]) => {
        if (isDev) {
            console.log(...args)
        }
    },
    debug: (...args: unknown[]) => {
        if (isDev) {
            console.debug(...args)
        }
    },
    info: (...args: unknown[]) => {
        if (isDev) {
            console.info(...args)
        }
    },
    warn: (...args: unknown[]) => {
        if (isDev) {
            console.warn(...args)
        }
    },
    // Error should always log, even in production
    error: (...args: unknown[]) => {
        console.error(...args)
    }
}
