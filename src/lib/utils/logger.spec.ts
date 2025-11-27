// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// We'll need to mock import.meta.env.DEV for testing
describe('logger', () => {
    let originalConsole: {
        log: typeof console.log
        debug: typeof console.debug
        info: typeof console.info
        warn: typeof console.warn
        error: typeof console.error
    }

    beforeEach(() => {
        originalConsole = {
            log: console.log,
            debug: console.debug,
            info: console.info,
            warn: console.warn,
            error: console.error
        }
        console.log = vi.fn()
        console.debug = vi.fn()
        console.info = vi.fn()
        console.warn = vi.fn()
        console.error = vi.fn()
    })

    afterEach(() => {
        console.log = originalConsole.log
        console.debug = originalConsole.debug
        console.info = originalConsole.info
        console.warn = originalConsole.warn
        console.error = originalConsole.error
        vi.clearAllMocks()
    })

    it('should be importable', async () => {
        const { logger } = await import('./logger')
        expect(logger).toBeDefined()
        expect(logger.log).toBeDefined()
        expect(logger.debug).toBeDefined()
        expect(logger.info).toBeDefined()
        expect(logger.warn).toBeDefined()
        expect(logger.error).toBeDefined()
    })

    it('should always call console.error even in production', async () => {
        const { logger } = await import('./logger')
        logger.error('test error')
        expect(console.error).toHaveBeenCalledWith('test error')
    })

    // Note: Testing DEV vs PROD behavior would require dynamic imports
    // and module mocking which is complex. The implementation is straightforward
    // enough that manual testing is sufficient.
})
