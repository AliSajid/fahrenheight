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
    /**
     * Always logs errors, even in production.
     *
     * Rationale:
     *   - Error logs are critical for diagnosing unexpected failures and monitoring site health.
     *   - In static/client-side apps, errors may indicate issues with user input, browser compatibility, or runtime bugs.
     *
     * Usage:
     *   - Use `logger.error()` for unexpected failures, critical issues, or when catching exceptions.
     *   - Prefer logging errors for visibility; throw exceptions if you need to interrupt control flow.
     *
     * Privacy/Security:
     *   - Avoid logging sensitive user data or personally identifiable information (PII).
     *   - Review error messages to ensure they do not expose internal implementation details or secrets.
     */
    error: (...args: unknown[]) => {
        console.error(...args)
    }
}
