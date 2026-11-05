<!--
SPDX-FileCopyrightText: 2024 - 2025 Ali Sajid Imami

SPDX-License-Identifier: MIT
-->

# AGENTS.md

Guidance for AI coding agents working in the `fahrenheight` repository.

## Project Overview

`fahrenheight` is a **static** SvelteKit web application that converts
temperatures between Celsius and Fahrenheit and visualizes the difference
between the exact conversion and a common approximation
(`(F - 30) / 2 ≈ C`). It is built as a fully client-side, pre-rendered static
site — there is no server runtime, no SSR, and no API endpoints. All
computation happens in the browser.

- **Author / copyright:** Ali Sajid Imami `<Ali.Sajid.Imami@gmail.com>`
- **License:** MIT (see `LICENSE-MIT`, `REUSE.toml`, `LICENSES/`)
- **Deployment target:** Cloudflare Pages

## Tech Stack

| Concern             | Choice                                                         |
| ------------------- | -------------------------------------------------------------- |
| Framework           | Svelte 5.45 + SvelteKit 2.49                                   |
| Build tool          | Vite 7.2                                                       |
| Language            | TypeScript 5.9 (`strict: true`, `moduleResolution: "bundler"`) |
| Styling             | Tailwind CSS 4.1 + Skeleton UI 4.6 (cerberus theme)            |
| Icons               | `@lucide/svelte`, `@icons-pack/svelte-simple-icons`            |
| Package manager     | pnpm 10.20.0 (pinned via `packageManager`)                     |
| Runtime             | Node.js ≥ 22                                                   |
| Task runner         | mise                                                           |
| Lint / format       | ESLint 9 (flat config) + Prettier 3                            |
| Unit/component test | Vitest 4 (node + browser projects)                             |
| E2E test            | Playwright 1.57                                                |
| Commit tooling      | Cocogitto (cog) 7.0.0 — Conventional Commits                   |
| Pre-commit          | pre-commit v4.3.0 (gitleaks, detect-secrets, yamllint, …)      |
| Deployment          | Cloudflare Pages (`wrangler.toml`)                             |

## Repository Layout

```
src/
  app.css              # Tailwind + Skeleton UI + cerberus theme imports
  app.html             # HTML shell (data-theme="cerberus")
  app.d.ts             # App namespace (currently empty)
  lib/
    index.ts           # Barrel: 9 components, 3 utils, 2 types
    components/        # 9 .svelte components + specs + types.ts
    utils/             # Temperature.class.ts, TemperatureConverter.class.ts,
                       # logger.ts, types.ts + specs
  routes/
    +layout.svelte     # Navbar + Footer + children()
    +layout.ts         # export const prerender = true
    +page.svelte       # Main converter page (HeroSection + TemperatureConverter)
    +error.svelte      # 404/500/generic error page
    how-it-works/      # +page.svelte + HowItWorksContent.svelte
    approximation-analysis/ # +page.svelte + ApproximationContent.svelte
e2e/                   # Playwright E2E specs (converter.spec.ts)
static/                # Static assets (favicon.svg, etc.)
```

## Component Architecture

All components live in `src/lib/components/` and are re-exported from
`src/lib/index.ts` (the barrel). Import from `$lib` rather than deep paths.

- **`TemperatureConverter.svelte`** — main UI. Uses Svelte 5 runes
  (`$state`, `$derived`, `$props()`). Validates input to a max of 2 decimal
  places via regex `/\.(\d+)/`. Delegates math to `TemperatureConverter.convert()`
  and `.getOppositeUnit()`.
- **`TemperatureInput.svelte`** — Props `{ value, activeUnit, onValueChange,
onUnitChange }`; `inputmode="decimal"`; °C/°F toggle buttons with
  `preset-filled-primary-500` active state.
- **`TemperatureGraph.svelte`** — 800×500 SVG, center ±20°F range, 2° step;
  plots exact vs approximate lines; padding `{top:40, right:40, bottom:60,
left:60}`; uses `$derived` for data generation.
- **`ColoredIcon.svelte`** — brand color map (TypeScript `#3178C6`, SvelteKit
  `#FF3E00`, Tailwind `#06B6D4`, Skeleton UI `#8B5CF6`, Vite `#646CFF`,
  GitHub `#181717`, Vitest `#6E9F18`, Playwright `#2EAD33`, pnpm `#F69220`,
  Thermometer/Flame `#F97316`, Heart `#EF4444`, Wrench `#3B82F6`,
  ChartLine `#8B5CF6`); default `currentColor`.
- **`Navbar.svelte`** — 3 links (`/` Converter, `/how-it-works`,
  `/approximation-analysis`); sticky `top-0 z-50`; uses `ColoredIcon` +
  `NavLink`; `Thermometer` from `@lucide/svelte`.
- **`NavLink.svelte`** — active state via `$app/state`
  `page.url.pathname === href`; `data-sveltekit-preload-data="hover"`.
- **`Footer.svelte`** — `@icons-pack/svelte-simple-icons` (SiGithub, SiSvelte,
  SiTypescript, SiSkeleton, SiTailwindcss) + `@lucide/svelte` (Flame, Wrench,
  Heart); fixed bottom; uses `TechStackIcon`.
- **`HeroSection.svelte`** — Thermometer icon (48px, `#EF4444`); title
  "Fahrenheight: Temperature Converter".
- **`TechStackIcon.svelte`** — wraps `ColoredIcon` in
  `<a target="_blank" rel="noopener noreferrer">`; Props
  `{ icon, name, url, size=16 }`.
- **`components/types.ts`** — `IconType = IconTypeLucide | IconTypeSimpleIcons`
  (SimpleIcons typed as `any` with eslint-disable).

## Core Logic

- **`Temperature.class.ts`** — `convertTo()`, `convertToApprox()`,
  `getOppositeUnit()`, `getUnitSymbol()`; static `celsiusToFahrenheit`,
  `fahrenheitToCelsius`, `celsiusToFahrenheitApprox`, `fahrenheitToCelsiusApprox`.
- **`TemperatureConverter.class.ts`** — static `convert(value, fromUnit)` →
  `ConversionResult { exact, approximate, percentageDifference }`;
  `calculatePercentageDifference(exact, approx)`; `formatTemperature(value,
decimals=2)`; `getOppositeUnit(unit)`.
- **`logger.ts`** — dev-only (`import.meta.env.DEV`); `error()` always logs;
  `log/debug/info/warn` gated on dev.
- **`utils/types.ts`** — `TemperatureUnit = 'celsius' | 'fahrenheit'`;
  `ConversionResult { exact, approximate, percentageDifference }`.

## Conventions

### Formatting (Prettier, `.prettierrc.json`)

- `semi: false` — **no semicolons**
- `singleQuote: true`
- `tabWidth: 4` (spaces, `useTabs: false`)
- `printWidth: 80` (Markdown override: `120`)
- `arrowParens: "avoid"`
- `trailingComma: "none"`
- `bracketSpacing: true`
- plugin `prettier-plugin-multiline-arrays`

### Linting (ESLint, `eslint.config.js`)

- Flat config: `eslint-config-prettier`, `@eslint/js`, `typescript-eslint`,
  `eslint-plugin-svelte`.
- `no-undef: off`, `svelte/no-navigation-without-resolve: off`.
- `projectService: true` for `.svelte` files.

### TypeScript (`tsconfig.json`)

- Extends `./.svelte-kit/tsconfig.json`.
- `strict: true`, `moduleResolution: "bundler"`, `allowJs: true`,
  `checkJs: true`.

### Svelte 5

- Use runes: `$state`, `$derived`, `$props()`. Do **not** use legacy
  `export let` / reactive `$:` statements in new code.
- Layouts use `{@render children()}`.

### SPDX Headers

All source files carry SPDX headers:

```
SPDX-FileCopyrightText: 2025 Ali Sajid Imami <Ali.Sajid.Imami@gmail.com>
SPDX-License-Identifier: MIT
```

Config files (`vite.config.ts`, `svelte.config.js`, `eslint.config.js`) use
`CC0-1.0`. Preserve these headers when editing.

## Testing

16 test files total (15 unit/component + 1 E2E).

- **Unit/component specs** (`src/**/*.{test,spec}.{js,ts}`): standard
  `describe/it/expect` from `vitest`, with `vi.fn()` mocking.
- **Browser/component specs**: `vitest-browser-svelte` `render()` +
  `page.getByRole/getByLabelText/getByText` +
  `expect.element().toBeInTheDocument()`.
- **E2E** (`e2e/converter.spec.ts`): `@playwright/test`; tests display, unit
  buttons, F→C (86°F→30.00°C exact, 28.00°C approx), C→F.
- All specs carry the SPDX MIT header.

### Vitest projects (`vite.config.ts`)

- `unit` — node env, `src/**/*.{test,spec}.{js,ts}`.
- `browser` — Playwright provider, headless in CI.
- Coverage via v8, reports to `./test-results/coverage`.

## Deployment

- **Cloudflare Pages** (`wrangler.toml`): `pages_build_output_dir = "build"`,
  `compatibility_date = "2025-11-04"`, `upload_source_maps = true`.
- Branch mapping: `main` → production, `next` → preview.
- **CI** (`.github/workflows/ci.yaml`): release_type job
  (`main`→stable, `next`→next, `dev-release` input→dev), calls `test.yaml` and
  `build-and-package.yaml`, release job with attestations.

## Task Runner (mise, `mise.toml`)

Common tasks: `dev`, `dev-open`, `build`, `preview`, `check`, `check-watch`,
`lint`, `lint:check`, `format`, `format:check`, `test`, `test-unit`.

Pinned tools: cocogitto 7.0.0, node 22.20.0, npm:pa11y 9.0.1,
npm:wrangler 4.45.4, pnpm 10.20.0, pre-commit 4.3.0.

## Pre-commit (`.pre-commit-config.yaml`)

- Excludes `dist/`.
- **Blocks commits to `main` and `next`** branches.
- Checks JSON/TOML/XML/YAML, CRLF/tabs, yamllint, detect-secrets
  (baseline `.secrets.baseline`, excludes `pnpm-lock.yaml`), gitleaks,
  texthooks.

## Do / Don't

### Do

- Import components/utils from `$lib` (the barrel), not deep paths.
- Use Svelte 5 runes (`$state`, `$derived`, `$props()`).
- Keep all logic client-side — this is a static site.
- Preserve SPDX headers on every file.
- Use Conventional Commits via Cocogitto (`cog commit`).
- Run `mise run format` and `mise run lint` before committing.
- Add a spec for new components/utils; mirror existing test patterns.

### Don't

- Don't add SSR, server routes, or API endpoints — `prerender = true` is set
  globally in `+layout.ts`.
- Don't use semicolons, double quotes, or trailing commas (Prettier config).
- Don't commit directly to `main` or `next` (pre-commit blocks it).
- Don't use the stale `.github/copilot-instructions.md` as a source of truth —
  it references outdated names (`ApproximationGraph.svelte` vs actual
  `TemperatureGraph.svelte`, `temperature.ts` vs actual
  `Temperature.class.ts`/`TemperatureConverter.class.ts`, Vitest 3.x vs actual
  Vitest 4).
- Don't add new dependencies without checking `package.json` first.

## Notes

- `src/app.css` imports `tailwindcss`, `@skeletonlabs/skeleton`,
  `@skeletonlabs/skeleton-svelte`, `@skeletonlabs/skeleton/themes/cerberus`.
- `src/app.html` sets `data-theme="cerberus"` and
  `data-sveltekit-preload-data="hover"` on `<body>`.
- `src/app.d.ts` has an empty `App` namespace (all interfaces commented out).
- `svelte.config.js` uses `adapter-static` with `fallback: '404.html'` and
  `vitePreprocess()`.
- `package.json` engines: `node >=22`, `pnpm >=10`;
  `packageManager: pnpm@10.20.0`.
