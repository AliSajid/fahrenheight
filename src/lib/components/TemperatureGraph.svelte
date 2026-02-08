<!--
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>

SPDX-License-Identifier: MIT
-->

<script lang="ts">
    import { Temperature } from '$lib/utils/Temperature.class'
    import type { TemperatureUnit } from '$lib/utils/types'

    interface Props {
        centerValue: number
        centerUnit: TemperatureUnit
    }

    let { centerValue, centerUnit }: Props = $props()

    // Graph dimensions and padding
    const width = 800
    const height = 500
    const padding = { top: 40, right: 40, bottom: 60, left: 60 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Generate data points: center value ± 20 degrees
    let graphData = $derived(() => {
        const range = 20
        const step = 2 // 2-degree increments for smoother lines
        const points: {
            fahrenheit: number
            exact: number
            approximate: number
            isCenter: boolean
        }[] = []

        // Convert center to Fahrenheit if needed
        const centerFahrenheit =
            centerUnit === 'celsius'
                ? Temperature.celsiusToFahrenheit(centerValue)
                : centerValue

        // Generate range from center-20 to center+20
        for (
            let f = centerFahrenheit - range;
            f <= centerFahrenheit + range;
            f += step
        ) {
            const isCenter = Math.abs(f - centerFahrenheit) < 0.5
            points.push({
                fahrenheit: f,
                exact: Temperature.fahrenheitToCelsius(f),
                approximate: Temperature.fahrenheitToCelsiusApprox(f),
                isCenter
            })
        }

        return points
    })

    // Calculate scales
    let xScale = $derived(() => {
        const data = graphData()
        const minX = Math.min(...data.map(p => p.fahrenheit))
        const maxX = Math.max(...data.map(p => p.fahrenheit))
        return {
            min: minX,
            max: maxX,
            range: maxX - minX,
            toPixels: (x: number) => ((x - minX) / (maxX - minX)) * chartWidth
        }
    })

    let yScale = $derived(() => {
        const data = graphData()
        const allYValues = [
            ...data.map(p => p.exact),
            ...data.map(p => p.approximate)
        ]
        const minY = Math.floor(Math.min(...allYValues) - 2)
        const maxY = Math.ceil(Math.max(...allYValues) + 2)
        return {
            min: minY,
            max: maxY,
            range: maxY - minY,
            toPixels: (y: number) =>
                chartHeight - ((y - minY) / (maxY - minY)) * chartHeight
        }
    })

    // Generate path data for lines
    let exactPath = $derived(() => {
        const data = graphData()
        const scale = { x: xScale(), y: yScale() }
        return data
            .map((p, i) => {
                const x = scale.x.toPixels(p.fahrenheit) + padding.left
                const y = scale.y.toPixels(p.exact) + padding.top
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
            })
            .join(' ')
    })

    let approximatePath = $derived(() => {
        const data = graphData()
        const scale = { x: xScale(), y: yScale() }
        return data
            .map((p, i) => {
                const x = scale.x.toPixels(p.fahrenheit) + padding.left
                const y = scale.y.toPixels(p.approximate) + padding.top
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
            })
            .join(' ')
    })

    // Generate axis ticks
    let xTicks = $derived(() => {
        const scale = xScale()
        const ticks: { value: number; position: number }[] = []
        const tickCount = 8
        const step = Math.ceil(scale.range / tickCount)
        for (let i = 0; i <= tickCount; i++) {
            const value = Math.round(scale.min + (i * scale.range) / tickCount)
            ticks.push({
                value,
                position: scale.toPixels(value) + padding.left
            })
        }
        return ticks
    })

    let yTicks = $derived(() => {
        const scale = yScale()
        const ticks: { value: number; position: number }[] = []
        const tickCount = 8
        for (let i = 0; i <= tickCount; i++) {
            const value = Math.round(scale.min + (i * scale.range) / tickCount)
            ticks.push({
                value,
                position: scale.toPixels(value) + padding.top
            })
        }
        return ticks
    })

    // Tooltip state
    let hoveredPoint = $state<{
        x: number
        y: number
        data: ReturnType<typeof graphData>[0]
    } | null>(null)

    function handlePointHover(
        event: MouseEvent,
        point: ReturnType<typeof graphData>[0],
        isExact: boolean
    ) {
        const scale = { x: xScale(), y: yScale() }
        const x = scale.x.toPixels(point.fahrenheit) + padding.left
        const y = isExact
            ? scale.y.toPixels(point.exact) + padding.top
            : scale.y.toPixels(point.approximate) + padding.top
        hoveredPoint = { x, y, data: point }
    }

    function handlePointLeave() {
        hoveredPoint = null
    }
</script>

<div class="relative w-full">
    <svg
        {width}
        {height}
        viewBox="0 0 {width} {height}"
        class="w-full h-auto max-w-full"
        aria-label="Temperature conversion comparison graph"
    >
        <!-- Title -->
        <text
            x={width / 2}
            y={20}
            text-anchor="middle"
            class="text-base font-semibold fill-current"
        >
            Temperature Conversion Comparison
        </text>

        <!-- Grid lines -->
        <g class="opacity-20">
            {#each xTicks() as tick}
                <line
                    x1={tick.position}
                    y1={padding.top}
                    x2={tick.position}
                    y2={height - padding.bottom}
                    class="stroke-current"
                    stroke-width="1"
                />
            {/each}
            {#each yTicks() as tick}
                <line
                    x1={padding.left}
                    y1={tick.position}
                    x2={width - padding.right}
                    y2={tick.position}
                    class="stroke-current"
                    stroke-width="1"
                />
            {/each}
        </g>

        <!-- Axes -->
        <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            class="stroke-current"
            stroke-width="2"
        />
        <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            class="stroke-current"
            stroke-width="2"
        />

        <!-- X-axis ticks and labels -->
        {#each xTicks() as tick}
            <line
                x1={tick.position}
                y1={height - padding.bottom}
                x2={tick.position}
                y2={height - padding.bottom + 6}
                class="stroke-current"
                stroke-width="2"
            />
            <text
                x={tick.position}
                y={height - padding.bottom + 20}
                text-anchor="middle"
                class="text-xs fill-current"
            >
                {tick.value}
            </text>
        {/each}

        <!-- Y-axis ticks and labels -->
        {#each yTicks() as tick}
            <line
                x1={padding.left - 6}
                y1={tick.position}
                x2={padding.left}
                y2={tick.position}
                class="stroke-current"
                stroke-width="2"
            />
            <text
                x={padding.left - 10}
                y={tick.position + 4}
                text-anchor="end"
                class="text-xs fill-current"
            >
                {tick.value}
            </text>
        {/each}

        <!-- Axis labels -->
        <text
            x={width / 2}
            y={height - 10}
            text-anchor="middle"
            class="text-sm font-medium fill-current"
        >
            Temperature (°F)
        </text>
        <text
            x={15}
            y={height / 2}
            text-anchor="middle"
            transform="rotate(-90 15 {height / 2})"
            class="text-sm font-medium fill-current"
        >
            Temperature (°C)
        </text>

        <!-- Exact conversion line -->
        <path
            d={exactPath()}
            fill="none"
            stroke="rgb(59, 130, 246)"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />

        <!-- Approximate conversion line -->
        <path
            d={approximatePath()}
            fill="none"
            stroke="rgb(34, 197, 94)"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        />

        <!-- Data points for exact conversion -->
        {#each graphData() as point}
            {@const scale = { x: xScale(), y: yScale() }}
            {@const x = scale.x.toPixels(point.fahrenheit) + padding.left}
            {@const y = scale.y.toPixels(point.exact) + padding.top}
            <circle
                cx={x}
                cy={y}
                r={point.isCenter ? 7 : 5}
                fill={point.isCenter ? 'rgb(239, 68, 68)' : 'rgb(59, 130, 246)'}
                stroke="white"
                stroke-width="2"
                class="cursor-pointer transition-all hover:r-8"
                onmouseenter={e => handlePointHover(e, point, true)}
                onmouseleave={handlePointLeave}
                aria-label="Exact: {point.fahrenheit.toFixed(
                    1
                )}°F = {point.exact.toFixed(2)}°C"
            />
        {/each}

        <!-- Data points for approximate conversion -->
        {#each graphData() as point}
            {@const scale = { x: xScale(), y: yScale() }}
            {@const x = scale.x.toPixels(point.fahrenheit) + padding.left}
            {@const y = scale.y.toPixels(point.approximate) + padding.top}
            <circle
                cx={x}
                cy={y}
                r={point.isCenter ? 7 : 5}
                fill={point.isCenter ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'}
                stroke="white"
                stroke-width="2"
                class="cursor-pointer transition-all hover:r-8"
                onmouseenter={e => handlePointHover(e, point, false)}
                onmouseleave={handlePointLeave}
                aria-label="Approximate: {point.fahrenheit.toFixed(
                    1
                )}°F ≈ {point.approximate.toFixed(2)}°C"
            />
        {/each}

        <!-- Legend -->
        <g transform="translate({width - 180}, 50)">
            <!-- Exact conversion -->
            <line
                x1="0"
                y1="0"
                x2="30"
                y2="0"
                stroke="rgb(59, 130, 246)"
                stroke-width="3"
            />
            <circle cx="15" cy="0" r="5" fill="rgb(59, 130, 246)" />
            <text x="40" y="4" class="text-xs fill-current" text-anchor="start">
                Exact
            </text>

            <!-- Approximate conversion -->
            <line
                x1="0"
                y1="20"
                x2="30"
                y2="20"
                stroke="rgb(34, 197, 94)"
                stroke-width="3"
            />
            <circle cx="15" cy="20" r="5" fill="rgb(34, 197, 94)" />
            <text
                x="40"
                y="24"
                class="text-xs fill-current"
                text-anchor="start"
            >
                Approximate
            </text>

            <!-- Input temperature -->
            <circle cx="15" cy="40" r="7" fill="rgb(239, 68, 68)" />
            <text
                x="40"
                y="44"
                class="text-xs fill-current"
                text-anchor="start"
            >
                Input Temp
            </text>
        </g>

        <!-- Tooltip -->
        {#if hoveredPoint}
            {@const tooltipX =
                hoveredPoint.x + 100 > width
                    ? hoveredPoint.x - 120
                    : hoveredPoint.x + 10}
            {@const tooltipY = hoveredPoint.y - 30}
            <g transform="translate({tooltipX}, {tooltipY})">
                <rect
                    x="0"
                    y="0"
                    width="110"
                    height="60"
                    rx="4"
                    class="fill-surface-900 dark:fill-surface-100 opacity-95"
                />
                <text
                    x="55"
                    y="16"
                    text-anchor="middle"
                    class="text-xs font-bold fill-surface-50 dark:fill-surface-900"
                >
                    {hoveredPoint.data.fahrenheit.toFixed(1)}°F
                </text>
                <text
                    x="55"
                    y="32"
                    text-anchor="middle"
                    class="text-xs fill-surface-50 dark:fill-surface-900"
                >
                    Exact: {hoveredPoint.data.exact.toFixed(2)}°C
                </text>
                <text
                    x="55"
                    y="48"
                    text-anchor="middle"
                    class="text-xs fill-surface-50 dark:fill-surface-900"
                >
                    Approx: {hoveredPoint.data.approximate.toFixed(2)}°C
                </text>
            </g>
        {/if}
    </svg>
</div>
