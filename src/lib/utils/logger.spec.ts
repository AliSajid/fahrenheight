// SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
//
// SPDX-License-Identifier: MIT

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

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

    describe('in development mode', () => {
        it('should call console.log when logger.log is called', async () => {
            const { logger } = await import('./logger')
            logger.log('test log message', { data: 'value' })
            expect(console.log).toHaveBeenCalledWith('test log message', {
                data: 'value'
            })
        })

        it('should call console.debug when logger.debug is called', async () => {
            const { logger } = await import('./logger')
            logger.debug('debug message', 123)
            expect(console.debug).toHaveBeenCalledWith('debug message', 123)
        })

        it('should call console.info when logger.info is called', async () => {
            const { logger } = await import('./logger')
            logger.info('info message', true, null)
            expect(console.info).toHaveBeenCalledWith(
                'info message',
                true,
                null
            )
        })

        it('should call console.warn when logger.warn is called', async () => {
            const { logger } = await import('./logger')
            logger.warn('warning message', ['array', 'values'])
            expect(console.warn).toHaveBeenCalledWith('warning message', [
                'array',
                'values'
            ])
        })

        it('should call console.error when logger.error is called', async () => {
            const { logger } = await import('./logger')
            const errorObj = new Error('test error')
            logger.error('error message', errorObj)
            expect(console.error).toHaveBeenCalledWith(
                'error message',
                errorObj
            )
        })

        it('should handle multiple arguments for all methods', async () => {
            const { logger } = await import('./logger')

            logger.log('arg1', 'arg2', 'arg3', 'arg4')
            expect(console.log).toHaveBeenCalledWith(
                'arg1',
                'arg2',
                'arg3',
                'arg4'
            )

            logger.debug(1, 2, 3)
            expect(console.debug).toHaveBeenCalledWith(1, 2, 3)

            logger.info({ a: 1 }, { b: 2 })
            expect(console.info).toHaveBeenCalledWith({ a: 1 }, { b: 2 })

            logger.warn('warn', ['data'])
            expect(console.warn).toHaveBeenCalledWith('warn', ['data'])

            logger.error('err', 'msg', 123)
            expect(console.error).toHaveBeenCalledWith('err', 'msg', 123)
        })
    })

    describe('structure', () => {
        it('should have all required methods', async () => {
            const { logger } = await import('./logger')
            expect(logger).toBeDefined()
            expect(typeof logger.log).toBe('function')
            expect(typeof logger.debug).toBe('function')
            expect(typeof logger.info).toBe('function')
            expect(typeof logger.warn).toBe('function')
            expect(typeof logger.error).toBe('function')
        })
    })
})
